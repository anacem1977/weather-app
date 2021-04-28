import './App.css';
import React, { Component } from "react";
import City1 from "./components/city1"

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faWind, faCloud, faSun, faCloudSun, faCloudRain, faMoon} from "@fortawesome/free-solid-svg-icons"
library.add(faWind, faCloud, faSun, faCloudSun, faCloudRain, faMoon)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      captured: false,
      citiesArray: [],
      input: "",
    }
  }

  handleData = (event) => {
    event.preventDefault();
    this.setState({
        [event.target.name]: event.target.value,
        input: event.target.value,
        captured: false,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const array = this.state.citiesArray.concat(this.state.city)
    this.setState({
      citiesArray: array,
      captured: true,
      input: ""
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
          <input type="text" id="city" name="city" onChange={this.handleData} value={this.state.input}></input>
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
