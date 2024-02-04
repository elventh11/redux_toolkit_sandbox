import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { RootState } from '../../app/store';
import { increment, decrement, reset, incrementByAmount } from './counterSlice';

function Counter() {
  const [incrementAmount, setIncrementAmount] = useState(0);
  const count = useSelector<RootState, number>((state) => state.counter.count);
  const dispatch = useDispatch();

  const resetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count.toLocaleString()}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(+e.target.value || 0)}
      />

      <div>
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
          Add Amount
        </button>
        <button onClick={resetAll}>Reset</button>
      </div>
    </section>
  );
}

export default Counter;
