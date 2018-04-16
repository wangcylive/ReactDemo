import React from 'react';
import ReactDOM from 'react-dom';

const names = [ 'Alice', 'Emily', 'Kate' ];

ReactDOM.render(
    <div>
        {
            names.map(name => <div>Hello, { name }</div>)
        }
    </div>,
    document.getElementById('demo2')
);