import React from 'react';
import stitch from '../img/stitch.png'

function Contact() {
    return (
        <div className='background'>
            <h1>My Contact</h1>
            <div className='card'>
                <div className='name-background'>
                    <h2 className='name'>Nicole</h2>
                    <img src={stitch} alt="stitch" />
                </div>
                <div className='info'>
                    <p>
                    <a href="https://www.linkedin.com/in/yuxin-nicole-zhang/">LinkedIn</a>
                    <a href="https://github.com/zyxnicole">GitHub</a>
                    </p>
                    
                    <p>zyxnicole8@gmail.com</p>
                </div>
            </div>

        </div>
    )
}

export default Contact;