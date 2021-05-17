import logo from '../img/logo.png';

const Logout = function({ onLogout }) {
  return (
    <div id='logout' >
      <div className="navigation">
        <div className="button">
        <img src={logo} alt='logout'/>
        <div className="logout"  onClick={onLogout} >LOGOUT </div>
        </div>
      </div>
    </div>
  )
};

export default Logout;
