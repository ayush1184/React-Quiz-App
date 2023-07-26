import { useEffect } from 'react';

function Timer({ remainingTime, dispatch }) {
  const mins = (Math.floor(remainingTime / 60) + ``).padStart(2, 0);

  const secs = ((remainingTime % 60) + '').padStart(2, 0);

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: `tick-tock` });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );

  return <div className='timer'>{`${mins}:${secs}`}</div>;
}

export default Timer;
