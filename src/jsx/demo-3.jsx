import React from 'react';
import ReactDOM from 'react-dom';

import Welcome, { Welcome1 } from '../components/welcome';

let name = 'Wangchunyang';

const showMyName = Math.random() > 0.5;

function App() {
    if (showMyName) {
        return (
            <div>
                <Welcome name={name}></Welcome>
            </div>
        )
    } else {
        return (
            <div>
                <Welcome1 name='SSS'/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('demo3')
);

setTimeout(() => {
    name = 'ChenQiaoXia';
}, 2000);