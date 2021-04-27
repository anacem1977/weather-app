import './App.css';
import React, { Component } from "react";
import axios from "axios"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: ""
    }
  }

  render() {

    return (
      <div className="App">
        <header>
          <h1>WEATHER APP </h1>

        </header>
        <section>
          <label for="city">Enter City: </label>
          <input type="text" id="city" name="city"></input>
          <br></br>
          <input type="submit" value="Submit"></input>
        </section>
      </div>
    );
  }
}

export default App;
