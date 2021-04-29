import './App.css';
import React, { Component } from "react";
import City1 from "./components/city1"

import { library } from "@fortawesome/fontawesome-svg-core";
import {faWind, faCloud, faSun, faCloudSun, faCloudRain, faMoon, faCompressAlt, faTint, faSmog} from "@fortawesome/free-solid-svg-icons"
library.add(faWind, faCloud, faSun, faCloudSun, faCloudRain, faMoon, faCompressAlt, faTint, faSmog)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      captured: false,
      citiesArray: ["Monterrey", "London", "Torreon"],
      input: "",
      currentDate: (new Date()).getDay(),
    }
  }

  handleData = (event) => {
    event.preventDefault();
    this.setState({
        [event.target.name]: event.target.value,
        input: event.target.value,
        //temporary solution
        captured: false,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.citiesArray.indexOf(this.state.city) === -1) {
        const array = this.state.citiesArray.concat(this.state.city)
        this.setState({
          citiesArray: array,
          captured: true,
          input: ""
        })
    } else {
        this.setState ({
          captured: true,
          input: ""
        })
    }
  }
  
  render() {
    return (
      <div className="App">
        <header>
          <h1>WEATHER APP ☀️</h1>
        </header>
        <section>
          <label for="city" className="currentCity">Enter City: </label>
          <input type="text" id="city" name="city" onChange={this.handleData} value={this.state.input} ></input>
          <input type="submit" value="Submit" onClick={this.handleSubmit} className="submitButton"></input>
        </section>

        {this.state.captured ? 
          <City1 city={this.state.city} handleData={this.handleData} handleSubmit={this.handleSubmit} citiesArray={this.state.citiesArray} today={this.state.currentDate}/>
        : <space></space>}
      </div>
    );
  }
}

export default App;
