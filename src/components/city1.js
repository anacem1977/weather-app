import React, { Component } from "react";
import axios from "axios"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class City1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
        city: props.city,
        results: "",
        loaded: false
    }
  }

  getWeather = async() => {
      const results = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=aaefdf95e0264b77aed05a514db664d0`);
    this.setState ({
        results: results.data,
        loaded: true,
        icon: ""
    })
    if (this.state.results.weather[0].main === "Rain" || this.state.results.weather[0].main === "Mist") {
        this.setState ({
            icon: "cloud-rain"
        }); 
    } else if (this.state.results.weather[0].main === "Clouds") {
      this.setState ({
          icon: "cloud"
      }); 
    } else if (this.state.results.weather[0].main === "Clear") {
        this.setState ({
            icon: "sun"
        }); 
      } 
  } 

  setCity = (event) => {
    event.preventDefault();
    this.setState ({
        city: event.target.innerHTML,
    })
    console.log("city changed")
    this.getWeather();
  }

  componentDidMount = () => {
      this.getWeather();
  }

  render() {
      console.log(this.state.city)
    const allCities = this.props.citiesArray.map((cities) => {
        return (
            <li onClick={this.setCity}>{cities}</li>
        )
    })
    return (
      <div className="city1">
          {this.state.loaded ? 
          <div>
            <header>
                <h1 className="city">{this.state.results.name}</h1>
                <h2>{this.state.results.weather[0].main}</h2>
                <FontAwesomeIcon icon={this.state.icon} size="6x" className="showIcons"></FontAwesomeIcon>
            </header>
            <section>
                <h2 className="currentTemp">{this.state.results.main.temp.toFixed(0)}° C</h2>
                <h2 className="otherTemps">Feels like: {this.state.results.main.feels_like.toFixed(0)}° C</h2>
                <h2 className="otherTemps">Min {this.state.results.main.temp_min.toFixed(0)}° C / Max {this.state.results.main.temp_max.toFixed(0)}° C</h2>
            </section>
            <nav>
                {allCities}
            </nav>
        </div>
        : <space></space>}
        
      </div>
    );
  }
}

export default City1;
