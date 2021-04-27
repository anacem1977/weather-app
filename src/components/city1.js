import './App.css';
import React, { Component } from "react";
import axios from "axios"

class City1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
        city: props,
        results: "",
    }
  }

  componentDidMount = async() => {
      const results = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=Torreon&units=metric&appid=aaefdf95e0264b77aed05a514db664d0");
    console.log(results.data)
    this.setState ({
        results: results.data,
    })
    } 

  render() {

    return (
      <div className="city1">
        <header>
          <h1>{this.state.results.name}</h1>
          <h2>icon</h2>
          <h2>{this.state.results.data.main.temp}° C</h2>
          <h3>{this.state.results.data.main.temp_min}° C / {this.state.results.data.main.temp_max}° C</h3>
          <h3>Latitude: {this.state.lat}</h3>
          <h3>Longitude: {this.state.lon}</h3>

        </header>
      </div>
    );
  }
}

export default City1;
