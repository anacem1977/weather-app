import React, { Component } from "react";
import axios from "axios"

import styled, { keyframes } from "styled-components";
import { pulse } from 'react-animations';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

class City1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
        city: props.city,
        results: "",
        forecast: "",
        loadedWeather: false,
        loadedForecast: false,
        icon: "",
        weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        day1: "",
        day2: "",
        day3: "",
        day4: "",
    }
  }

  getWeather = async() => {
      const results = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&units=metric&appid=aaefdf95e0264b77aed05a514db664d0`);
    this.setState ({
        results: results.data,
        loadedWeather: true,
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
    } else if (this.state.results.weather[0].main === "Wind" || this.state.results.weather[0].main === "Dust") {
        this.setState ({
            icon: "wind"
        }); 
    } else if (this.state.results.weather[0].main === "Fog") {
        this.setState ({
            icon: "smog"
        }); 
    } 
  }

  getForecast = async() => {
    const forecast = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&units=metric&appid=aaefdf95e0264b77aed05a514db664d0`);
    this.setState ({
      forecast: forecast.data,
      loadedForecast: true
    })
  } 

  setDate = () => {
    if (this.props.today <= 2) {
        this.setState ({
            day1: this.state.weekdays[this.props.today+1],
            day2: this.state.weekdays[this.props.today+2],
            day3: this.state.weekdays[this.props.today+3],
            day4: this.state.weekdays[this.props.today+4],
        })
    } else if (this.props.today === 3) {
        this.setState ({
            day1: this.state.weekdays[this.props.today+1],
            day2: this.state.weekdays[this.props.today+2],
            day3: this.state.weekdays[this.props.today+3],
            day4: this.state.weekdays[this.props.today-3],
        })
    } else if (this.props.today === 4) {
        this.setState ({
            day1: this.state.weekdays[this.props.today+1],
            day2: this.state.weekdays[this.props.today+2],
            day3: this.state.weekdays[this.props.today-4],
            day4: this.state.weekdays[this.props.today-3],
        })
    } else if (this.props.today === 5) {
        this.setState ({
            day1: this.state.weekdays[this.props.today+1],
            day2: this.state.weekdays[this.props.today-5],
            day3: this.state.weekdays[this.props.today-4],
            day4: this.state.weekdays[this.props.today-3],
        })
    } else if (this.props.today === 6) {
        this.setState ({
            day1: this.state.weekdays[this.props.today-6],
            day2: this.state.weekdays[this.props.today-5],
            day3: this.state.weekdays[this.props.today-4],
            day4: this.state.weekdays[this.props.today-3],
        })
    }
  }

  setCity = (event) => {
    event.preventDefault();
    this.setState ({
        city: event.target.innerHTML,
    })
    this.getWeather();
    this.getForecast();
  }

  componentDidMount = () => {
      this.getWeather();
      this.getForecast();
      this.setDate();
  }

  render() {
    const allCities = this.props.citiesArray.map((cities) => {
        return (
            <li onMouseDown={this.setCity} onMouseUp={this.getWeather} onClick={this.getForecast}>{cities}</li>
        )
    })

    const pulseAnimation = keyframes`${pulse}`;

    const MyStyle = styled.p`
        animation: 1s infinite ${pulseAnimation};
        margin-top: 0.5rem;
        &:hover {
            text-shadow: 1px 1px #7961a3;
        }
    `
    return (
      <div className="city1">
        {this.state.loadedWeather ? 
            <div>
                <header>
                    <h1 className="city">{this.state.results.name}</h1>
                    <FontAwesomeIcon icon={this.state.icon} size="6x"></FontAwesomeIcon>
                    <MyStyle>{this.state.results.weather[0].main}</MyStyle>
                </header>
                <section>
                    <h2 className="currentTemp">{this.state.results.main.temp.toFixed(0)}?? C</h2>
                    <h2>Feels like: {this.state.results.main.feels_like.toFixed(0)}?? C</h2>
                    <h2>Min {this.state.results.main.temp_min.toFixed(0)}?? C / Max {this.state.results.main.temp_max.toFixed(0)}?? C</h2>
                </section>
                <h3 className="subtitle">Current Conditions:</h3>
                <section className="currentCond">
                    <p className="currentIcon"><FontAwesomeIcon icon="wind" size="2x"/> Wind</p>
                    <p>{this.state.results.wind.speed} mts/sec</p>
                    <p className="currentIcon"><FontAwesomeIcon icon="tint" size="2x"/> Humidity</p>
                    <p>{this.state.results.main.humidity}%</p>
                    <p className="currentIcon"><FontAwesomeIcon icon="compress-alt" size="2x"/> Pressure</p>
                    <p>{this.state.results.main.pressure} hPa</p>
                    <p className="currentIcon"><FontAwesomeIcon icon="cloud" size="2x"/> Clouds</p>
                    <p>{this.state.results.clouds.all}%</p>
                </section>
            </div>
        : <space></space>}
        {this.state.loadedForecast ?
            <div>
                <h3 className="subtitle">Forecast:</h3>
                <div className="forecast">
                    <section className="forecastDays">
                        <p>{this.state.day1}</p>
                        <p>{this.state.day2}</p>
                        <p>{this.state.day3}</p>
                        <p>{this.state.day4}</p>
                    </section>
                    <section className="forecastTemp">
                        <p>{this.state.forecast.list[8].main.temp.toFixed(0)} ??C</p>
                        <p>{this.state.forecast.list[17].main.temp.toFixed(0)} ??C</p>
                        <p>{this.state.forecast.list[26].main.temp.toFixed(0)} ??C</p>
                        <p>{this.state.forecast.list[35].main.temp.toFixed(0)} ??C</p>
                    </section>
                </div>
                <div>
                    <h3 className="subtitle">Saved Locations:</h3>
                    <nav>{allCities}</nav>
                </div>
            </div>
        : <space></space>}
        
      </div>
    );
  }
}

export default City1;
