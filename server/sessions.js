const uuid = require('uuid').v4;
const sessionsData = require('./data/sessionsData');
const userData = require('./data/userData');

const create = function( username, password ) {
  if(!username) {
    return { error: 'username-required' };
  }
  if(!password) {
    return {error: 'password-required'}
  }
  if(!isValidUsername(username)) {
    return { error: 'username-invalid' };
  }
  const sid = uuid();
  sessionsData[sid] = username;
  const userInfo = {};
  userInfo.password = password
  userData[username] = userInfo;
  return {sid};
};

const remove = function(sid) {
    delete sessionsData[sid];
}

const getUsername = function(sid) {
  return sessionsData[sid];
}

const validateSession = function(sid) {
  if(!sid) {
    return {code: 401, error: 'session-required'}
  }
  if(!sessionsData[sid]) {
    return {code: 403, error: 'session-invalid'}
  }
}

const isValidUsername = function( username ) {
  if(!username) {
    return false;
  }
  const dogWord = username.replace(/\W*(dog)\W*/gi, '!');
  const regex = /^[A-Za-z][A-Za-z\d_]*$/i;
  const isValidUsername = regex.test(dogWord);

  
  if(!isValidUsername) {
    return false;
  }
  return true;
};

const sessions = {
  getUsername,
  create,
  remove,
  validateSession: validateSession,
  isValidUsername,
};

module.exports = sessions;
  


