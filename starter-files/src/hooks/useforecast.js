import { useState } from "react";

const useForecast = () =>{
    //console.log('Hello I am the hook!');
    const[isError, setError] = useState(false);
    const[isLoading, setLoading] = useState(false);
    const[forecast, seForecast] = useState(null);


    // call the api


    // since this is a javascript function we return
    // we can return an object.
    return{
        isError,
        isLoading,
        forecast
    };
}

export default useForecast;