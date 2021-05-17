import React, { useState } from "react";
import { getMemo } from '../services';
import {errorMessages} from '../error-messages';
import ErrorMessage from './ErrorMessage';
import today from '../today';

function DatePicker({onDateChange}) {
    const [status, setStatus] = useState("");

    function handleChange(event) {
      const { value } = event.target;

      getMemo(value)
      .then(memo => {
        setStatus('')
        onDateChange(memo, value);
      })
      .catch( err => {
        setStatus(errorMessages[err.error]);
      });
    }

    return(
        <div className='date'>
             <input onChange={handleChange} type="date" name="date" id="date" defaultValue={today()}/>
             <br/>
             {status && <ErrorMessage onChange={status}/>}
        </div>
       
    )
}

export default DatePicker;