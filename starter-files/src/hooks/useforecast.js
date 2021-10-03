import { useState } from "react";
import { ListGroup } from "react-bootstrap";

const useForecast = () =>{
    //console.log('Hello I am the hook!');
    const[isError, setError] = useState(false);
    const[isLoading, setLoading] = useState(false);
    const[forecast, seForecast] = useState(null);


    // call the api
    // location value from Form is passed to the page and then in useforecast
    const submitRequest = (location) =>{
        console.log({location});
    }


    // since this is a javascript function we return
    // we can return an object.
    return{
        isError,
        isLoading,
        forecast,
        submitRequest
    };
}

export default useForecast;