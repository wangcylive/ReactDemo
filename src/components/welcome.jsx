import React from 'react';

export default function (props) {
    return <h3>Hello, { props.name }.</h3>
}

export class Welcome1 extends React.Component {
    render() {
        return <h4>Hello, { this.props.name }</h4>
    }
}