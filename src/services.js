export const checkSession = function() {
    return fetch('/api/session')
    .catch( () => {
      return Promise.reject({ error: 'network-error'} ) 
    })
    .then(convertError);
  };

  export const createSession = (username, password) => {
    return fetch('/api/session',  {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ username, password }),
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then(convertError);
  };

  export const endSession = () => {
    return fetch('/api/session',  {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then(convertError);
  };

  export const getMemo = (date) => {
    return fetch(`/api/memo?date=${date}`,  {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then(convertError);
  };
  

  export const postMemo = (memo) => {
    return fetch('/api/memo',  {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ memo }),
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then(convertError);
  }

  export const deleteMemo = (date, id) => {
    return fetch('/api/memo',  {
      method: 'DELETE',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify({ date, id }),
    })
    .catch( () => Promise.reject({ error: 'network-error'} ) )
    .then(convertError);
  };
  
  

  function convertError(response) {
    if(response.ok) {
      return response.json();
    }
    return response.json().then(error => Promise.reject(error));
  };