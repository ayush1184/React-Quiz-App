function NextButton({ dispatch, currentQuestionId, answer, questionNum }) {
  if (answer === null) return null;

  const isLast = currentQuestionId === questionNum - 1;
  function nextQues() {
    if (isLast) dispatch({ type: `finishQuiz` });
    else dispatch({ type: `nextQues` });
  }

  return (
    <button className='btn btn-ui' onClick={nextQues}>
      {!isLast ? `Next` : `Finish`}
    </button>
  );
}

export default NextButton;
