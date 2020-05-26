export const formatUnit = (value, formatter) => {

    return isFunction(formatter) 
    ? formatter().toString(value)
    : formatter.toString(value)
}

export const DateFormatter = (value) => {
    return {
        toString: (value) => {
            return value && value instanceof Date
                ? value.toLocaleDateString(undefined, { day: 'numeric', month: 'long' }) 
                : value;
        }
    }
}

export const CelsiusFormatter = (value) => {
    return {
        toString: (value) => {
            let celsius = Math.round(value);
            return `${celsius}°C`;
        }
    }
};

export const FahrenheitFormatter = (value) => {
    return {
        toString: (value) => {
            let fahrenheit = value ? (Math.round(value) * 9 / 5) + 32 : "NaN";
            return `${fahrenheit}°F`;
        }
    }
};

export const KilometerPerHourFormatter = (value) => {
    return {
        toString: (value) => {
            let kmh = value ? Math.round(value) : "NaN";
            return `${kmh} kmh`;
        }
    }
};

export const MilesPerHourFormatter = (value) => {
    return {
        toString: (value) => {
            let mph = value ? Math.round(0.6214 * value) : "NaN";
            return `${mph} mph`;
        }
    }
};

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
   }