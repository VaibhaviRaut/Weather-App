// HOOK

import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from 'axios';

// import helper functions from helper folder
import getCurrentDayForecast from "../helpers/getCurrentDayForecast";
import getCurrentDayDetailedForecast from "../helpers/getCurrentDayDetailedForecast";
import getUpcomingDaysForecast from "../helpers/getUpcomingDaysForecast";

// global URL variables
const BASE_URL = 'https://www.metaweather.com/api/location';

// cross domain issues -> means that api and our program are not on the same domain
// example:  weather api on metaweather.com domain and our program on localhost domain
// heroku -> solution
const CROSS_DOMAIN = 'https://the-ultimate-api-challenge.herokuapp.com';
// to the above cross-domain url
const REQUEST_URL = `${CROSS_DOMAIN}/${BASE_URL}`;


const useForecast = () =>{
    //console.log('Hello I am the hook!');
    const[isError, setError] = useState(false);
    const[isLoading, setLoading] = useState(false);
    const[forecast, seForecast] = useState(null);


    // call the api

    const getWoeid = async (location) =>{
        const {data} = await axios(`${REQUEST_URL}/search`,{params:{query:location}});

        // 2. get weather
        // console.log({data});
        // checking if the location exists or not, if not then this error message
        if (!data || data.length ===0){
            setError('There is no such Location!');
            setLoading(false);
            return;
        }
        return data;
    };

    const getForecastData = async (woeid) => {
        const {data} = await axios(`${REQUEST_URL}/${ woeid}`);

        if (!data || data.length === 0){
            setError('Something went wrong!');
            setLoading(false);
            return;
        }
        return data[0];
    };

    // gether the deatils from data / helper function files
    const gatherForecastData = data =>{
        const currentDay = getCurrentDayForecast(data.consolidated_weather[0],data.title);
        const currentDayDetails = getCurrentDayDetailedForecast(data.consolidated_weather[0]);
        const upcomingDays = getUpcomingDaysForecast(data.consolidated_weather);

        seForecast({currentDay,currentDayDetails,upcomingDays});
        setLoading(false);
    };

    // location value from Form is passed to the page and then in useforecast
    const submitRequest = async location => {
        // set a loader -> True
        setLoading(true);
        setError(false);

        // console.log({location});
        // 1. get woeid: where on earth id
        const response = await getWoeid(location);
        // when we want it to wait for a functionality to complete use await with async as shown
        if(!response?.woeid) return;
        const data = getForecastData(response.woeid);
        
        if(!data) return;
        // console.log({data});
        gatherForecastData();

    };


    // since this is a javascript function we return
    // we can return an object.
    return{
        isError,
        isLoading,
        forecast,
        submitRequest,
    };
};

export default useForecast;

// The least logic you have in the components the better it is!
