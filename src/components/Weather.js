import React, { Component } from 'react'

class Weather extends Component{
    render(){
        const iconSource = `http://openweathermap.org/img/wn/${this.props.icon}@2x.png`
        let min = 0, max = 0, unit = "C";
        if(this.props.tempUnit === "celsius") {
            min =  Math.round(this.props.wxdata.temp.min - 273);
            max =  Math.round(this.props.wxdata.temp.max - 273);
            unit = "C";
        }
        if(this.props.tempUnit === "farenheit"){
            min = Math.round((this.props.wxdata.temp.min - 273)*1.8 +32);
            max = Math.round((this.props.wxdata.temp.max - 273)*1.8 +32); 
            unit = "F";
        }
        return(
            <div className="wx-card">
                <div className="date-container">
                    <h5 className="date">{new Date(this.props.wxdata.dt * 1000).toDateString().toLocaleUpperCase()}</h5>    
                </div>
                <img src={iconSource} alt="watherIcon" />
                <div className="temp-container">
                    <div className="min">{min + String.fromCharCode(176) + unit}</div>
                    <div className="max">{max + String.fromCharCode(176) + unit}</div>
                </div>       
            </div>
        )
    }
}

export default Weather;