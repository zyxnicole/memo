import './App.css';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Greeting from './components/Greeting';
import Memo from './components/Memo';
import DatePicker from './components/DatePicker';
import CreateArea from "./components/CreateArea";
import Contact from './components/Contact';
import Login from './components/Login';
import Detail from './components/Detail';
import { endSession, checkSession } from './services';
import today from './today';


function App() {



  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: true });
  const [showContact, setShowContact] = useState(false);
  const [date, setDate] = useState(today());
  const [memo, setMemo] = useState([]);
  const [detail, setDetail] = useState({});
  const [showDetail, setShowDetail] = useState(false);


  useEffect(() => {
        checkSession()
          .then( data => {
            setUserState({
              isLoggedIn: true,
              isPending: false,
            });
            setMemo(data)
          })
          .catch( err => {
            setUserState({
              isLoggedIn: false,
              isPending: false,
            });
          })
  }, []);

  const onLogin = function(data) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
    });

    setMemo(data);
    setShowDetail(false);
  };

  const onLogout = function() {
    setUserState({
      ...userState,
      isPending: true,
    });
    endSession()
    .then((res) => {
      setUserState({
        isLoggedIn: false,
        isPending: false,
      });
    })
    .catch(() => {
      setUserState({
        ...userState,
        isPending: false,
      });
    });
  };


  const show = function() {
    setShowContact(!showContact);
  };


  const addNote = function(data) {
    setMemo(data);
    setShowDetail(false);
  }

  const onDateChange = function(memo, date) {

    console.log("change: " + date);
    setDate(date)
    setMemo(memo);
    setShowDetail(false);
  }

  const onShowDetail = function(show, detailData) {
    setShowDetail(show);
    if (detailData) {
      setDetail(detailData);
    }
  }

  if (userState.isPending) {
    return <div></div>;
  }

  return (
    <div>
    
      {!userState.isLoggedIn && <Login onLogin={onLogin}/>}
      {userState.isLoggedIn &&
        <div className="App">
        <div className='container'>
        <Header onLogout={onLogout}/>
        <Greeting/>
        <CreateArea onAdd={addNote} date={date} />
        <DatePicker onDateChange={onDateChange}/>
        <div id='content'>
          {!showDetail && <Memo content={memo} setMemo={setMemo} onShowDetail={onShowDetail} />}
        </div>
        <div>
          {showDetail && <Detail detail={detail} onShowDetail={onShowDetail}/>}
        </div>
        
        <div id='contact'>

          <p className='button-background'>
            <input className='button' type="button" onClick={show} value='- Contact -'/>
          </p>
          {showContact && <Contact/>}
        </div>
        
      </div>
      </div>
      }

    </div>
  );
}

export default App;
