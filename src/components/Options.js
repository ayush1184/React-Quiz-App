function Options({ questionObj, dispatch, answer, points }) {
  return (
    <>
      <div className='options'>
        {questionObj.options.map((option, i) => (
          <button
            disabled={answer}
            className={`btn btn-option ${i === answer ? `answer` : ``} ${
              // questionObj.correctOption === i ? `correct` : `wrong`
              answer !== null
                ? questionObj.correctOption === i
                  ? `correct`
                  : `wrong`
                : ``
            }`}
            key={option}
            onClick={e =>
              dispatch({
                type: `answerSelected`,
                payload: i,
              })
            }
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default Options;
