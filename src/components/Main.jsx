import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import ToggleUnit from './ToggleUnit';
import * as format from '../utils/format';

const Main = () => {

    const { unit, loading, sols, selectedSolIndex, error } = useContext(GlobalContext);
    const [direction, setDirection] = useState({ "--direction": "0deg" });
    const sol = sols[selectedSolIndex];
    const windSpeedFormatter = unit === "cel" ? format.KilometerPerHourFormatter : format.MilesPerHourFormatter;
    const temperaturFormatter = unit === "cel" ? format.CelsiusFormatter : format.FahrenheitFormatter;


    useEffect(() => {
        if (selectedSolIndex < 0 || sol == null) return;
        setDirection({ "--direction": `${sol.windDirectionInDegrees}deg` });
    }, [selectedSolIndex]); // eslint-disable-line react-hooks/exhaustive-deps


    if (loading) {
        return (
        <div className="mars-current-weather">
            <h1 className="main-title">Loading...</h1>
        </div>)
    }

    if(error) {
        return (
            <div className="mars-current-weather">
                <h1 className="main-title">{error.message}</h1>
            </div>)
    }

    return (
        <div className="mars-current-weather">
            <h1 className="main-title">Latest weather at Elysium Plantitia</h1>

            <div className="date">
                <h2 className="section-title section-title--date">Sol {sol.sol}</h2>
                <p className="date__day">{format.formatUnit(sol.date, format.DateFormatter)}</p>
            </div>

            <div className="temp">
                <h2 className="section-title">Temperature</h2>
                <p className="reading">High: {format.formatUnit(sol.maxTemp, temperaturFormatter)}</p>
                <p className="reading">Low: {format.formatUnit(sol.minTemp, temperaturFormatter)}</p>
            </div>

            <div className="wind">
                <h2 className="section-title">Wind</h2>
                <p className="reading">{format.formatUnit(sol.windSpeed, windSpeedFormatter)}</p>

                <div className="wind__direction">
                    <p className="sr-only">{sol.windDirectionCardinal}</p>

                    <div className="wind__arrow" style={direction}></div>
                </div>
            </div>

            <div className="info">
                <p>InSight is taking daily weather measurements (temperature, wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator.</p>
                <p>This is only a part of InSight’s mission.
                <a href="https://mars.nasa.gov/insight/mission/overview/">Click here</a> to find out more.
            </p>
            </div>

            <ToggleUnit />
        </div>
    );
};

export default Main;