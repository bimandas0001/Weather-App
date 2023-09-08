import React, { useState, useEffect, useRef } from "react";
import OpacitySharpIcon from '@mui/icons-material/OpacitySharp';
import WbTwilightSharpIcon from '@mui/icons-material/WbTwilightSharp';
import TireRepairOutlinedIcon from '@mui/icons-material/TireRepairOutlined';
import AirSharpIcon from '@mui/icons-material/AirSharp';
import "./Weather.css";
import { Height } from "@mui/icons-material";

const api = {
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric
    base: "https://api.openweathermap.org/data/2.5/weather?",
    key: "e414066d5743a52ecdc9d3bfefbc70ce"
}

function Weather() {
    const [city, setCity] = useState("Barasat");
    const [data, setData] = useState({});
    const [statusCode, setStatusCode] = useState({});
    const [iconCode, setIconCode] = useState("10d");
    const bgDiv = useRef(null);

    
    
    async function findWeather(e){
        if(e.preventDefault !== undefined)   e.preventDefault();

        const url = `${api.base}q=${city}&appid=${api.key}&units=metric`;
        // https://api.openweathermap.org/data/2.5/weather?q=Barasat&appid=e414066d5743a52ecdc9d3bfefbc70ce&units=metric

        try{
            const response = await fetch(url);
            const result = await response.json();

            if(result.cod === 404)   setStatusCode({code: result.cod, message: result.message})
            else    setStatusCode({code: result.code, message: "No Message"});
            modifyUI(result);
            setData(result);
        }
        catch(err){
            console.log("Error : " + err);
        }
    }

    useEffect(() => {
        findWeather({});  // On page refresh. (default city Barasat)
    }, []);

    async function modifyUI(result){
        if(typeof(result.main) != "undefined"){
            // const temp = Math.round(result.main.temp);

            setIconCode(result.weather[0].icon);
        }
    }

    return (
        <div className="bg" ref={bgDiv}>
            <main>
                <div className="search-area">
                    <form onSubmit={findWeather}>
                        <input type="text" className="search-bar" placeholder="City Name" onChange={(e)=> setCity(e.target.value)}></input>
                        <button className="search-button"> Search </button>
                    </form>

                </div>

                {
                    (typeof(data.main) != "undefined") ? (

                        <div className="container">
                            <div className="location">
                               <p> {data.name}, {data.sys.country} </p>
                            </div>

                            <div className="box">
                                <div className="weather-icon">
                                    <img src={"https://openweathermap.org/img/wn/" + iconCode + "@2x.png"}/>
                                </div>
                                <div className="desc1">
                                    <div className="temp">
                                        {data.main.temp}&deg;
                                    </div>
                                    <div className="cond">
                                        {data.weather[0].description}
                                    </div>
                                    <div className="date">
                                        {new Date().toLocaleString() }
                                    </div>
                                </div>
                                <div className="desc2">
                                    <div className="humidity">
                                        <div className="icon">
                                            <OpacitySharpIcon className="weather-parameter-icon-humidity"/>
                                        </div>
                                        <div className="value">
                                            <p> {data.main.humidity} % </p>
                                            <p> Humidity </p>
                                        </div>
                                    </div>
                                    <div className="wind">
                                        <div className="icon">
                                            <AirSharpIcon className="weather-parameter-icon-wind"/>
                                        </div>
                                        <div className="value">
                                        <p> {data.wind.speed} km/h </p>
                                        <p> Wind speed </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                    : ( statusCode === undefined ? (null) : ( <p> {statusCode.message} </p> ) ) 
                }

            </main>
        </div>
    )
}

export default Weather;