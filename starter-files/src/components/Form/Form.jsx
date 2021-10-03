import React,{useState} from 'react';
// extracting from input field -> import hook (useState);
import styles from './Form.module.css';

const Form = () => {
    const [location, setLocation] = useState('');
    // location -> initialize the state 
    // setlocation is a function by hook to change the location.
    // this syntax basically return whatever you 
    
    const onSubmit = e =>{
        // prevent reloading the page.  
        e.preventDefault();
        // console.log({location});
        if(!location || location==='') return;
    }
    return (
        <form onSubmit ={onSubmit}>
            <input
                aria-label="location"
                type="text"
                className={`${styles.input} form-control`}
                placeholder="Search for location"
                required
                value = {location}
                onChange ={ e => setLocation(e.target.value)}
            />

            <button type="submit" className={styles.button} onClick={onSubmit}>
                SEARCH
            </button>
        </form>
    );
};

export default Form;
