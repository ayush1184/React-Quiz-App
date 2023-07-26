import Options from './Options.js';

function Question({
  questionObj,
  dispatch,
  answer,
  points,
  questionNum,
  maxScore,
}) {
  return (
    <div className=''>
      <h4>{questionObj.question}</h4>

      <Options
        questionObj={questionObj}
        dispatch={dispatch}
        answer={answer}
        points={points}
      />
    </div>
  );
}

export default Question;
