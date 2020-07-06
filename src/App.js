import React from 'react';
import Weather from './components/Weather'
import Footer from './components/Footer'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      wx:[], 
      min:0,
      latitude: null,
      longitude: null
    }
    this.onFetch = this.onFetch.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  onFetch(){
    const url = 
      (this.state.latitude === null || this.state.longitude === null || this.state.latitude === "" || this.state.longitude === "") ?
        `https://api.openweathermap.org/data/2.5/onecall?lat=6.5&lon=3.80&exclude=minutely,hourly&appid=ed0f142532771c0eec2f0591a6dc8182` :
        `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.latitude}&lon=${this.state.longitude}&exclude=minutely,hourly&appid=ed0f142532771c0eec2f0591a6dc8182`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            wx:data.daily,
            min:data.daily[0].temp.min,
            tempUnit: "celsius" 
          })
      })
  }

  handleChange(event) {
    const {name, value, type, checked} = event.target;
    type === "checkedbox" ? this.setState({[name]:checked}) : this.setState({[name]:value})
  }

  componentDidMount(){
    this.onFetch()
  }

  onClick(event){
    event.preventDefault();
    this.handleChange(event);
    this.onFetch();
}

  render(){
    const weatherInfo = this.state.wx.map(w => <Weather wxdata = {w} tempUnit = {this.state.tempUnit} icon = {w.weather[0].icon}/>)
    return(
      <div className = "main">
        <div className = "header">
          <h1>Weather Casts</h1>
        </div>
        <div className = "form">
          <form onSubmit={this.onClick}>
            <input 
              className="coordinate"
              type="text"
              name="latitude"
              placeholder="Latitude"
              value={this.state.latitude}
              onChange={this.handleChange}
            />
            <br />
            <input 
              className="coordinate"
              type="text"
              name="longitude"
              placeholder="Longitude"
              value={this.state.longitude}
              onChange={this.handleChange}
            />
            <br />
            <input 
              className="coordinate"
              type="text"
              name="location"
              placeholder="Location"
              value={this.state.location}
              onChange={this.handleChange}
            />
            <br />
            <button>Submit</button>
            <br />
            <label>
            <input 
              type="radio"
              name="tempUnit"
              value="celsius"
              checked={this.state.tempUnit === "celsius"}
              onChange={this.handleChange}
            />Celsius
            </label>
            <label>
            <input 
              type="radio"
              name="tempUnit"
              value="farenheit"
              checked={this.state.tempUnit === "farenheit"}
              onChange={this.handleChange}
            />Farenheit
            </label>
          </form>
        </div>
        <div className = "wx">
          {weatherInfo}
        </div>
        <Footer />
      </div>
    )
  }
}
  
export default App;
