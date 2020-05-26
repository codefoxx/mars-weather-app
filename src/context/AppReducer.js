export default (state, action) => {
    switch (action.type) {
        default:
            return state;
        case "SET_UNIT":
            return {
                ...state,
                unit: state.unit === "cel" ? "fah" : "cel"
            }
        case "GET_WEATHER_SUCCESS":
            return {
                ...state,
                loading: false,
                sols: action.payload,
                selectedSolIndex: action.payload.length - 1
            }

        case "GET_WEATHER_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case "SET_SELECTED_SOL_INDEX":
            return {
                ...state,
                selectedSolIndex: action.payload
            }
    }
};
