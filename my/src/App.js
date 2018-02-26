import React, { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      blocks: [],
      length: 0
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:3000/chain")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            blocks: result.chain,
            length: result.length
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.index}>
              {item.index} {item.timestamp}
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;
