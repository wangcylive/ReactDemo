import React from 'react';
import ReactDOM from 'react-dom';

function tick() {
  const element = (
    <div>
      <h1 className='h1-ele'>Hello, World!!!</h1>
      <div>Time: {Date.now()}</div>
    </div>
  );

  ReactDOM.render(
    element,
    document.getElementById('demo1'),
  );

  // console.log(element);
}

tick();

setInterval(tick, 1000);
