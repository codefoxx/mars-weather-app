import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
    error: null,
    loading: true,
    unit: "cel",
    selectedSolIndex: -1,
    sols: []
}

export const GlobalContext = createContext(initialState);

// provider component

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // actions    
    const setSelectedSolIndex = (index) => {
        dispatch({
            type: "SET_SELECTED_SOL_INDEX",
            payload: index
        });
    };

    const toggleUnit = () => {
        dispatch({
            type: "SET_UNIT",
            payload: {}
        });
    }

    useEffect(() => {
        const fetchData = async (api_key) => {
            try {
                const res = await axios.get(`https://api.nasa.gov/insight_weather/?api_key=${api_key}&feedtype=json&ver=1.0`);

                const {
                    sol_keys,
                    validity_checks,
                    ...solData
                } = res.data;

                const sols = Object.entries(solData).map(([sol, data]) => {
                    return {
                        sol: sol,
                        maxTemp: data.AT.mx,
                        minTemp: data.AT.mn,
                        windSpeed: data.HWS.av,
                        windDirectionInDegrees: data.WD.most_common.compass_degrees,
                        windDirectionCardinal: data.WD.most_common.compass_point,
                        date: new Date(data.First_UTC)
                    }
                });

                dispatch({ type: 'GET_WEATHER_SUCCESS', payload: sols });
            } catch (error) {
                dispatch({ type: 'GET_WEATHER_FAILURE', payload: error });
            }
        };

        const api_key = process.env.API_KEY || "DEMO_KEY";
        fetchData(api_key);
    }, []);

    return (<GlobalContext.Provider value=
        {{
            unit: state.unit,
            sols: state.sols,
            selectedSolIndex: state.selectedSolIndex,
            error: state.error,
            loading: state.loading,
            toggleUnit,
            setSelectedSolIndex
        }}>
        {children}
    </GlobalContext.Provider>);
}