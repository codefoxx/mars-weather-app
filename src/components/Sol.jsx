import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import * as format from '../utils/format';

const Sol = ({ sol, index }) => {

    const { unit, selectedSolIndex, setSelectedSolIndex } = useContext(GlobalContext);
            
    const setSolIndex = (event, index) => {
        event.preventDefault();
        if (selectedSolIndex === index) return;
        setSelectedSolIndex(index);
    };
    const temperaturFormatter = unit === "cel" ? format.CelsiusFormatter: format.FahrenheitFormatter;

    return (
        <div className="previous-day">
            <h3 className="previous-day__sol"> Sol {sol.sol}</h3>
            <p className="previous-day__date">{format.formatUnit(sol.date, format.DateFormatter)}</p>
            <p className="previous-day__temp">High: {format.formatUnit(sol.maxTemp, temperaturFormatter)}</p>
            <p className="previous-day__temp">Low: {format.formatUnit(sol.minTemp, temperaturFormatter)}</p>
            <button className="previous-day__more-info" onClick={(event) => setSolIndex(event, index)}>more info</button>
        </div>
    );
};

export default Sol;