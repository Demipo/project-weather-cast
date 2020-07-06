import React, { Component } from 'react';

class Footer extends Component{
    render(){
        return(
            <div className = "footer"> 
             <footer>Weather Casts</footer>
             <span className= "span">Data sourced from <a href="https://openweathermap.org/">Open Weather Map</a></span>
            </div>
            
        )
    }
}

export default Footer;