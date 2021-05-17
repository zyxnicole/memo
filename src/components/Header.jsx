import React from 'react';
import Logout from './Logout';


function Header({onLogout}) {

    return (
        <div className='header'>
            <header>
                {/* 
                <h1>Memo</h1>
                 */}
                 <Logout onLogout={onLogout}/>
                 
                <div className="overlay">
                    <h1>MEMO</h1>
		        </div>
                    
            </header>
            
        </div>

    )
}

export default Header