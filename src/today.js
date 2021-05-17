function today() {
    const date = new Date(); // M-D-YYYY
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = year + "-" + (month <= 9 ? "0" + month : month) + "-" + (day <= 9 ? "0" + day : day);
    return currentDate;
}

module.exports = today;