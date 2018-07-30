import React from 'react';

export default function (props) {
    return <h3>Hello, { props.name }.</h3>
}

function tick() {
    console.log('外部 tick')
}

export class Welcome1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            gender: 'Male',
            user: ''
        }
        // this.tick = this.tick.bind(this)
    }

    componentDidMount() {
        console.log(this)
    }

    componentWillUnmount() {

    }

    render() {
        return <div>
            <h4>Hello, { this.props.name }</h4>
            <h3>Hello1, { this.state.date.toLocaleTimeString() }</h3>
            <h5>This is { this.user }</h5>
            <button onClick={this.tick}>Update Date</button>
        </div>
    }

    tick = () => {
        this.setState({
            date: new Date()
        })
    }

    updateUser() {
        this.setState((prevState, props) => ({
            user: props.name + prevState.gender
        }))
    }
}