import React, { useState } from "react";
import { postMemo } from '../services';
import date from '../date';
import {errorMessages} from '../error-messages';
import ErrorMessgafe from './ErrorMessage';

function CreateArea({onAdd, date}) {
  const currentDate = date;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState('');

  const [note, setNote] = useState({
    title: "",
    type: "other",
    content: "",
    date:""
  });


function handleChange(event) {
    const { name, value } = event.target;
    setStatus('');
    setIsDisabled(!event.target.value);
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value,
        date: currentDate,
      };
    });
  }

  function handleClick(event) {
    setStatus('');
    const { name, value } = event.target;
    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }


  function submitNote(event) {
    setIsDisabled(true);

    postMemo(note)
    .then(data => {
      setStatus('');
      setIsPending(false);
      onAdd(data);
      setNote({
        title: "",
        type: "other",
        content: "",
        date: ""
      });
    })
    .catch( err => {
      setStatus(errorMessages[err.error]);
      setIsPending(false);
    });

    event.preventDefault();
  }


  return (
    <div id='new'>
      <form>
        <div className='input'>
          <input className={note.type + "-title"}
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        </div>
        
          <p className='options'> 

          <input className='work' 
            name="type"
            type="button" 
            value='work'
            onClick={handleClick}
            />
            
            <input className='person'
            name="type"
            type="button" 
            value='person'
            onClick={handleClick}
            />


            <input className='home' 
            name="type"
            type="button" 
            value='home'
            onClick={handleClick}
            />

            <input className='other' 
            name="type"
            type="button" 
            value='other'
            onClick={handleClick}
            />
          </p>

        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="5"
        />
        <button onClick={submitNote} disabled={isPending}>Add</button>
      </form>
      { status && <ErrorMessgafe className="status" onChange={status}/>}

      
    </div>
  );

}

export default CreateArea;
