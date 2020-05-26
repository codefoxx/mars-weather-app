import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const ToggleUnit = () => {

    const {unit, toggleUnit} = useContext(GlobalContext);

    return (

        <div className="unit">
            <label htmlFor="del">°C</label>            
            <input type="radio" name="unit" id="cel" readOnly checked={unit === "cel"}/>
            <button className="unit__toggle" onClick={toggleUnit}></button>
            <label htmlFor="fah">°F</label>
            <input type="radio" name="unit" id="fah" readOnly checked={unit === "fah"}/>
        </div>
    );
}

export default ToggleUnit;