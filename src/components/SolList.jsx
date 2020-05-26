import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import Sol from './Sol';

const SolList = () => {
    const { sols, loading } = useContext(GlobalContext);
    const [showPreviousWeather, setShowPreviousWeather] = useState(false);


    if (loading) {
        return null;
    }

    function toggleShowPreviousWeather() {        
        setShowPreviousWeather(!showPreviousWeather);
    }

    return (
        <div className={`previous-weather ${showPreviousWeather ? 'show-weather' : ''}`} >
            <button onClick={toggleShowPreviousWeather} className="show-previous-weather">
                <span>&#8593;</span>
                <span className="sr-only">Show previous weather</span>
            </button>

            <h2 className="main-title previous-weather__title">Previous 7 days</h2>

            <div className="previous-days">
                {sols.map((sol, index) => {
                    return (
                        <Sol key={sol.sol} sol={sol} index={index} />
                    )
                })}
            </div>
        </div>
    );
};

export default SolList;
