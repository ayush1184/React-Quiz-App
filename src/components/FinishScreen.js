function FinishScreen({ points, maxScore, highScore, dispatch }) {
  const percentage = (points / maxScore) * 100;

  let emoji;

  // if (percentage < 33) performanceEmoji = `😰`;
  // if (percentage < 33) performanceEmoji = ``;
  if (percentage === 100) emoji = '🥇';
  if (percentage >= 80 && percentage < 100) emoji = `🎉`;
  if (percentage >= 50 && percentage < 80) emoji = `😕`;
  if (percentage >= 0 && percentage < 50) emoji = '🤨';
  if (percentage === 0) emoji = '🤦‍♂️';

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You have scored {points} out of {maxScore}
        <strong>{` (${Math.ceil(percentage)}%) `}</strong>
      </p>
      <p className='highscore'>{`Highscore: ${highScore} points`}</p>
      <button
        className='btn-ui btn'
        onClick={() => dispatch({ type: `restartQuiz` })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
