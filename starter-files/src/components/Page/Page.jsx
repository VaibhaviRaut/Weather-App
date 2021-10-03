import React, { Fragment } from 'react';

import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';

import useForecast from '../../hooks/useforecast'; 

import styles from './Page.module.css';

const Page = () => {
    // way to use hooks -> 
    const {isError, isLoading, forecast,submitRequest} = useForecast();
    // value is being passed from the form
    const onSubmit = (value) =>{
        // console.log({value});
        submitRequest(value)
    }
    // a hook can never be called in a conditional block 
    return (
        <Fragment>
            <Header />
            {!forecast && (
                 <div className={`${styles.box} position-relative`}>
                    {/* Form */}
                    {/* show form if it's not loading */}
                    {!isLoading && <Form submitSearch={onSubmit} />}
                    {/* Error */}
                    {/* If this Error is true then only display error message */}
                    {isError && <Error message={isError} />}
                    {/* Loader */}
                    {isLoading && <Loader />}
                </div>
            )}
            {/* Forecast */} 
            {forecast && <Forecast />}
           
        </Fragment>
    );
};

export default Page;
