import './App.css';
import React, { Component } from "react";
import City1 from "./components/city1"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      captured: false,
      citiesArray: []
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
    const array = this.state.citiesArray.concat(this.state.city)
    this.setState({
      captured: !this.state.captured,
      citiesArray: array
    })
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>WEATHER APP </h1>
        </header>
        <section>
          <label for="city">Enter City: </label>
          <input type="text" id="city" name="city" onChange={this.handleData}></input>
          <input type="submit" value="Submit" onClick={this.handleSubmit}></input>
        </section>

        {this.state.captured ? 
          <City1 city={this.state.city} handleData={this.handleData} handleSubmit={this.handleSubmit} citiesArray={this.state.citiesArray}/>
        : <space></space>}

      </div>
    );
  }
}

export default App;
