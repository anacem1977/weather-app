import './App.css';
import React, { Component } from "react";
import City1 from "./components/city1"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      captured: false
    }
  }

  handleData = (event) => {
    event.preventDefault();
    this.setState({
        [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      city: this.state.city
    }
    this.setState({
      captured: true
    })
  }

  render() {

    return (
      <div className="App">
        <header>
          <h1>WEATHER APP </h1>
        </header>

        {this.state.captured ? <City1 city={this.state.city}/>
        : <section>
            <label for="city">Enter City: </label>
            <input type="text" id="city" name="city" onChange={this.handleData}></input>
            <br></br>
            <input type="submit" value="Submit" onClick={this.handleSubmit}></input>
          </section>}
      </div>
    );
  }
}

export default App;
