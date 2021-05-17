import React from "react";
import greeting from '../setGreeting';


const Greeting = () => {
    const date = new Date();
    const currentTime = date.getHours();
    
    let head = greeting.setTitle(currentTime);
    let headColor = greeting.setColor(currentTime);

    return (
        <div className='greeting'>
            <h1 className={headColor} >
                {head}
            </h1>
        </div>
    )

} 

export default Greeting;