import React, { Component } from "react";
import axios from "axios"

class City1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
        city: props.city,
        results: "",
        loaded: false
    }
  }

  componentDidMount = async() => {
      const results = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=aaefdf95e0264b77aed05a514db664d0`);
    this.setState ({
        results: results.data,
        loaded: true
    })
    
    } 

  render() {
    console.log(this.state.results)
    return (
      <div className="city1">
          {this.state.loaded ? 
            <header>
                <h1>City</h1>
                <h1>{this.state.results.name}</h1>
                <h2>icon: {this.state.results.weather[0].main}</h2>
                <h2>Current Temperature: {this.state.results.main.temp}° C</h2>
                <h2>Feels like: {this.state.results.main.feels_like}° C</h2>
                <h3>Min {this.state.results.main.temp_min}° C / Max {this.state.results.main.temp_max}° C</h3>
                <h3>Latitude: {this.state.results.coord.lat}</h3>
                <h3>Longitude: {this.state.results.coord.lon}</h3>
        </header>
        : <space></space>}
        
      </div>
    );
  }
}

export default City1;
