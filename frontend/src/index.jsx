import React from 'react';
import ReactDOM from 'react-dom';

import Titles from "./Component/Titles";
import GoogleMap from "../src/Component/google_map";
import Chart from '../src/Component/chart';
import LoadModal from '../src/Component/load_modal';
import Form from './Component/Form';
import WeatherList from "./Component/WeatherList";

const API_KEY = 'b533b7267d4b094f1270dcffaedf0bca';
const baseURL = "http://api.openweathermap.org/data/2.5";

class Weather extends React.Component {
  //define the initial empty state of the class  
  constructor(props) {
    super(props);
    this.state = {
      temperature: undefined,
      city: undefined,
      country: undefined,
      time: undefined,
      humidity: undefined,
      description: undefined,
      latitude: undefined,
      longitude: undefined,
      error: undefined,
      icon: "",
      celsius: "",
      percent: "",
      chartData: {
        labels: ["1", "2", "3", "4"],
        datasets: [{
          label: '',
          data: [
            50,
            40,
            30,
            0
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
        ]
      },
      show_map: false,
      executed: 0,
      loading: false
    }
  }
  // Make function to call and navigate the current position of the geolocation
  // executed to make sure it run once
  askLocation() {
    if (navigator.geolocation && this.state.executed == 0) {
      this.setState({
        loading: true
      });
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          executed: 1,
          loading: false
        });
        return this.getWeather(null, position);
      });
    }
  }
// Make sure that function only execute when the class is rendered on the UI
  componentDidMount() {
    this.askLocation();
  }
  // async function always returns a promise, and await makes JS wait until that promise settles and returns its result
  async commonCall(apiToCall) {
    try {
      console.log(apiToCall);
      const api_call = await fetch(apiToCall);
      const data = await api_call.json();
      //const icon_name = data.weather[0].icon;
      const time_call = data.list.slice(0, 4);
      let time_array_get = Array();
      let temp_array_get = Array();
      time_call.map(function (item, index) {
        let t = item.dt_txt.split(" ");
        time_array_get.push(t[1]);
        temp_array_get.push(item.main.temp);
      });

      let x = this.state.chartData;
      x.labels = time_array_get;
      x.datasets[0].data = temp_array_get;

      this.setState({
        temperature: data.list[0].main.temp,
        city: data.city.name,
        country: data.city.country,
        time: data.list[0].clouds.dt_txt,
        humidity: data.list[0].main.humidity,
        description: data.list[0].weather[0].description,
        latitude: data.city.coord.lat,
        longitude: data.city.coord.lon,
        error: "",
        icon: data.list[0].weather[0].icon,
        celsius: "˚C",
        percent: "%",
        show_map: true
      });
    } catch (err) {
      alert("The is some errors. Please reload the page or try later");
    }
  }

  async getWeather(e, position) {
    let city = "";
    let country = "";
    let api_call = "";

    if (!position) {
      e.preventDefault();
      city = e.target.elements.city.value;
      country = e.target.elements.country.value;
      api_call = `${baseURL}/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`;
    } else {
      let ask_lat = position.coords.latitude;
      let ask_lon = position.coords.longitude;
      api_call = `${baseURL}/forecast?lat=${ask_lat}&lon=${ask_lon}&appid=${API_KEY}&units=metric`;
    }

    if (city && country || position) {
      this.commonCall(api_call);
      this.setState({
        loading: false
      });
    } else {
      error: "Please enter the values."
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <div className="main">
            <div className="row">

              <div className="col-lg-6 col-md-12 col-xs-5 title-container">
                <div className="col-sm-12">
                  <Titles passVal={this.state.icon} />
                </div>

                <div className="col-sm-12">
                  {this.state.loading ? <LoadModal /> : null}
                </div>

                <div className="col-sm-12">
                  {this.state.show_map ? <Chart chartData={this.state.chartData} location={this.state.city} units={this.state.celsius} /> : null}
                </div>

                <div className="col-sm-12">
                  <GoogleMap passLong={this.state.longitude} passLat={this.state.latitude} />
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-xs-5 form-container">
                <Form getWeather={this.getWeather.bind(this)} />
                <WeatherList
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
