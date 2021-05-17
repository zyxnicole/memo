import React, { useState } from 'react';
import { deleteMemo } from '../services';
import {errorMessages} from '../error-messages';


function Memo({content, setMemo, onShowDetail}) {
    const [status, setStatus] = useState('');

    function handleDelete(event) {
        const {id} = event.target;
        const {date} = event.target.dataset;

        deleteMemo(date, id)
        .then(data => {
          setStatus('')
          setMemo(data);
        })
        .catch( err => {
          setStatus(errorMessages[err.error]);
        });
    }

    const handleDetail = function(event) {
        onShowDetail(true, event.target.dataset)
    }

    return (
        <div>
            <div>
            {content.map((item) => 
            <ul key={item.id} className='memo' >
            <li className='li' >
                <p className='date'>{item.date}</p>

                <h1 className={item.type} 
                onClick={handleDetail}
                data-date={item.date}
                data-title = {item.title}
                data-content = {item.content}
                data-type = {item.type}
                >
                {item.title}
                </h1>
                <p className='content'>{item.content}</p>
                { status && <div className="status">{status}</div>}
            </li>

            <p className='button'>
                <input onClick={handleDelete} type="button" value='X' id={item.id} data-date={item.date}/>
            </p>
            </ul>
            ).reverse()}     
            </div>        
        </div>

       


    )
}

export default Memo;