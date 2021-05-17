

const setTitle = function(currentTime) {
    let greeting = "";
    if (currentTime < 12) {
        greeting = "Good Morning :)";
    } else if (currentTime < 18) {
        greeting = "Good Afternoon :)";
    } else {
        greeting = "Good Evening :)";
    }
    return greeting;
}

const setColor = function(currentTime) {
    let headColor = "";
    if (currentTime < 12) {
        headColor = "morning";
    } else if (currentTime < 18) {
        headColor = "afternoon";
    } else {
        headColor = "night";
    }
    return headColor;
}

const greeting = {
    setTitle,
    setColor
}

export default greeting;