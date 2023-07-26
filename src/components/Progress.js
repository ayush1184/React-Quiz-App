function Progress({
  points,
  questionNum,
  currentQuestionId,
  maxScore,
  answer,
}) {
  return (
    <div className='progress'>
      <progress
        // value={answer === null ? currentQuestionId : currentQuestionId + 1}
        value={currentQuestionId + (answer !== null)}
        max={questionNum}
      />

      <p>
        Question <strong>{currentQuestionId + 1}</strong> / {questionNum}
      </p>
      <p>
        <strong>{points}</strong> / {maxScore} points
      </p>
    </div>
  );
}

export default Progress;
