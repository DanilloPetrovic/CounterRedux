import React from 'react';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { counterSlice } from '../../store/counterSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const counter = useSelector((state) => state.counter.counter);
  const history = useSelector((state) => state.counter.history);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');

  console.log(history);

  const add = () => {
    dispatch(counterSlice.actions.add());
  };

  const reset = () => {
    dispatch(counterSlice.actions.reset());
  };

  const saveFn = () => {
    dispatch(counterSlice.actions.save());
  };

  return (
    <div className="App">
      <div className="header">
        <button className="to-register" onClick={() => navigate('/register')}>
          Register
        </button>
        <button className="to-login" onClick={() => navigate('/login')}>
          Log In
        </button>
        <button className="to-history" onClick={() => navigate('/history')}>
          History
        </button>
      </div>

      <div className="counter">
        <div className="display">
          <p className="number">{counter}</p>
        </div>
        <div className="btns">
          <button className="add" onClick={add}>
            +
          </button>
          <button className="reset" onClick={reset}>
            Reset
          </button>

          {token && (
            <button className="save" onClick={saveFn}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
