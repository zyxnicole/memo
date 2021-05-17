const uuid = require('uuid').v4;
const memosData = require('./data/memosData');

const maybeInit = function(username, date) {
    if (!memosData[username]) {
        memosData[username] = {};
    }
    if (date && !memosData[username][date]) {
        memosData[username][date] = [];
    }
}

const add = function(username, memo) {
    if (!memosData[username][memo.date]) {
        init(username, memo.date);
    }
    memo.id = uuid();
    memosData[username][memo.date].push(memo);
}

const isValidMemo = function(memo) {
    if(!memo.title && !memo.content) {
        return false;
    }
    return true;
}

const getMemosByUserAndDate = function(username, date) {
    maybeInit(username, date);
    return memosData[username][date];
}

const deleteMemosById = function(username, date, id) {
    const memosOfDay = getMemosByUserAndDate(username, date);
    memosData[username][date] = memosOfDay.filter(memo => memo.id != id);
}

const memos = {
    add,  
    getMemosByUserAndDate, 
    deleteMemosById, 
    isValidMemo
}

module.exports = memos;