# MEMO

## Introduction

The beta version of MEMO helps you to take notes for the current date and review the notes taken from the previous date.

## How to start
Open a terminal
```
$cd ~/{pwd}/final-project
$npm install 
$npm run begin
```

Open Chrome and visit `localhost:5000` 

## How to use

1. Login NOTES with  `{username}` and `{password}`. 
>The password is only used for demonstration in the beta version, not for security
>
		Username requirement: 
		- First digit should be a letter
		- "_" is the only charactor allowed
		-  "dog" is a banned word in username

2. Fill `title` and/or `content`, choose the category and date, then clicking **Add** button to add a note
3. Click the `title` of a note in the note list will show full content of this single note
4. Select a past date from the calendar to show the previously taken notes
5. Click `Logout` button at top right corner to logout

## TODO
1. Add authentication for password check
2. Modify memo after add