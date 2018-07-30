import React from 'react';
import ReactDOM from 'react-dom';

const names = [ 'Alice', 'Emily', 'Kate' ];

function showIndex(index, context) {
    console.log(index, context)
}

ReactDOM.render(
    <div>
        {
            names.map((name, index) => <div key={ index } onClick={(e) => showIndex(index, this)}>Hello, { name }{ index }</div>)
        }
    </div>,
    document.getElementById('demo2')
);