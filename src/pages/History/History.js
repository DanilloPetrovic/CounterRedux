import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
  const navigate = useNavigate();
  const history = useSelector((state) => state.counter.history);
  console.log(history, 'nesto');
  return (
    <div className="App">
      <div className="header">
        <button className="go-back" onClick={() => navigate('/')}>
          Go Back
        </button>
      </div>

      <div className="container">
        {history &&
          history.map((item) => (
            <div className="his-div" key={item.date}>
              <p className="his-counter">{item.number}</p>
              <p className="his-date">{item.date}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default History;
