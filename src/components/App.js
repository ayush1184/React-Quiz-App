import { useEffect, useReducer } from 'react';
import Main from './Main';
import Header from './Header';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import Progress from './Progress.js';
import NextButton from './NextButton.js';
import Timer from './Timer.js';
import FinishScreen from './FinishScreen.js';
import Footer from './Footer.js';

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case `startLoading`:
      return { ...state, status: `loading` };

    case `stopLoading`:
      return { ...state, status: `ready` };

    case `dataRecieved`:
      return { ...state, questions: action.payload, status: `ready` };

    case `errorRecieved`:
      return { ...state, status: `error` };
    // StarterScreen Component

    case `startQuiz`:
      return {
        ...state,
        currentQuestionId: 0,
        status: `active`,
        remainingTime: state.questions.length * SECS_PER_QUESTION,
      };
    // NextButton Component

    case `nextQues`:
      return {
        ...state,
        answer: null,
        currentQuestionId:
          state.currentQuestionId < state.questions.length - 1
            ? state.currentQuestionId + 1
            : state.currentQuestionId,
      };

    // Options
    case `answerSelected`:
      const question = state.questions[state.currentQuestionId];

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };

    case `finishQuiz`:
      return {
        ...state,
        answer: null,
        status: `finished`,
        currentQuestionId: null,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case `restartQuiz`:
      return {
        ...state,
        status: `ready`,
        points: 0,
        remainingTime: initialState.remainingTime,
        currentQuestionId: 0,
      };

    case `tick-tock`:
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? `finished` : state.status,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    default:
      throw new Error(`Invalid action`);
  }
}

const initialState = {
  // `loading`,`error`,`ready`,`active`,`finished`
  status: `loading`,
  currentQuestionId: null,
  questions: [],
  answer: null,
  points: 0,
  highScore: 0,
  remainingTime: null,
};

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [
    {
      status,
      questions,
      currentQuestionId,
      answer,
      points,
      highScore,
      remainingTime,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const questionNum = questions.length;
  const maxScore = questions.reduce((curr, ques) => ques.points + curr, 0);

  useEffect(function () {
    async function getData() {
      try {
        dispatch({ type: `startLoading` });

        const res = await fetch(`http://localhost:8000/questions`);
        const data = await res.json();

        // setTimeout(
        //   () => dispatch({ type: `dataRecieved`, payload: data }),
        //   3000
        // );

        dispatch({ type: `dataRecieved`, payload: data });
      } catch (err) {
        dispatch({ type: `errorRecieved` });
      }
    }

    getData();
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === `error` ? <Error /> : ``}

        {status === `loading` && <Loader />}

        {status === `ready` && (
          <StartScreen questionNum={questionNum} dispatch={dispatch} />
        )}

        {status === `active` && (
          <>
            <Progress
              questionNum={questionNum}
              currentQuestionId={currentQuestionId}
              points={points}
              maxScore={maxScore}
              answer={answer}
            />

            <Question
              questionObj={questions[currentQuestionId]}
              dispatch={dispatch}
              answer={answer}
              points={points}
              questionNum={questionNum}
              maxScore={maxScore}
            />

            <Footer>
              <Timer remainingTime={remainingTime} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentQuestionId={currentQuestionId}
                questionNum={questionNum}
              />
            </Footer>
          </>
        )}

        {status === `finished` && (
          <FinishScreen
            points={points}
            maxScore={maxScore}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
