const express = require('express');
const cookieParser = require('cookie-parser');
const date = require('../src/today');
const sessions = require('./sessions');
const memos = require('./memos');

const PORT = 5000;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));
const currentDate = date();

app.get('/api/session', (req, res) => { 
  const sid = req.cookies.sid;
  const exception = sessions.validateSession(sid);
  if (exception) {
    res.clearCookie('sid');
    res.status(exception.code).json({error: exception.error});
    return;
  }
  res.json(getResponse(sid, currentDate));
});

app.post('/api/session', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const { sid, error } = sessions.create(username, password);

    if(error) {
      res.status(400).json({error});
      return;
    }

    res.cookie('sid', sid);
    res.json(getResponse(sid, currentDate));
});

app.delete('/api/session', (req, res) => {
  sessions.remove(req.cookies.sid);
  res.clearCookie('sid');
  res.json({status: 'removed' });
});

app.get('/api/memo', (req,res) => {

  const sid = req.cookies.sid;
  const date = req.query.date;


  if(date > currentDate) {
    res.status(401).json({ error: 'date' });
    return false;
  }
  res.json(getResponse(sid, date));
});


app.post('/api/memo', (req, res) => {
  const sid = req.cookies.sid;
  const exception = sessions.validateSession(sid);
  if (exception) {
    res.clearCookie('sid');
    res.status(exception.code).json({error: exception.error});
    return;
  }

  const memo = req.body.memo;

  if(!memos.isValidMemo(memo)) {
    res.status(401).json({error: 'empty-content'});
    return;
  } else {
    memos.add(sessions.getUsername(sid), memo);
    res.json(getResponse(sid, memo.date));
  }
});

app.delete('/api/memo', (req, res) => {
  const sid = req.cookies.sid;
  const date = req.body.date;
  const id = req.body.id;
  
  memos.deleteMemosById(sessions.getUsername(sid), date, id)

  res.json(getResponse(sid, date));
});

const getResponse = function(sid, date) {
  return memos.getMemosByUserAndDate(sessions.getUsername(sid), date);
}

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
