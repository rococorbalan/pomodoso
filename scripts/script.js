let countdown;
let timeLeft;
let intervalsLeft;

let bellSound = new Audio('../media/bell.wav');

const pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5"/></svg>'
const playIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/></svg>'

const toggleIcon = document.getElementById('icon');

const timerDisplay = document.getElementById('timer');

const toggleButton = document.getElementById('toggle-button');
const restartButton = document.getElementById('restart-button');
const skipButton = document.getElementById('skip-button');

let borderColor = document.getElementById('container').style.borderColor;
const workColor = '#DA8359';
const breakColor = '#698474';

let time = 1500;
let breakTime = 300;
let longBreakTime = 600;
let intervalsBeforeBreak = 4;
timeFormat(time);


let isWork = true;
let isLongBreak = false;
let isTimerOn = false;

let workInput = document.getElementById('work-input'); 
let breakInput = document.getElementById('break-input');
let longBreakInput = document.getElementById('long-input'); 
let intervalInput = document.getElementById('interval-input');


intervalsLeft = intervalsBeforeBreak;
timeLeft = time;

workInput.addEventListener('input', () => {
    if(workInput.value != ''){
        time = workInput.value*60;
        if (isTimerOn && isWork) {
            timeFormat(time);
            timeLeft = time;
        }else if(!isTimerOn && isWork){
            timeFormat(time);
            timeLeft = time;
        }
    }else{
        time = 1500
        if (isTimerOn) {
            timeFormat(time);
            timeLeft = time;
        }
    }
});

breakInput.addEventListener('input', () => {
    if(breakInput.value != ''){
        breakTime = breakInput.value*60;
        if (isTimerOn && (!isWork && !isLongBreak)) {
            timeFormat(breakTime);
            timeLeft = breakTime;
        }else if(!isTimerOn && !isWork){
            timeFormat(breakTime);
            timeLeft = breakTime;
        }
    }else{
        breakTime = 300;
        if (isTimerOn) {
            timeFormat(breakTime);
            timeLeft = breakTime;
        }
    }
});

longBreakInput.addEventListener('input', () => {
    if(longBreakInput.value != ''){
        longBreakTime = longBreakInput.value*60;
        if (isTimerOn && isLongBreak) {
            timeFormat(longBreakTime);
            timeLeft = longBreakTime;
        }else if(!isTimerOn && isLongBreak){
            timeFormat(longBreakTime);
            timeLeft = longBreakTime;
        }
    }else{
        longBreakTime = 600;
        if (isTimerOn) {
            timeFormat(longBreakTime);
            timeLeft = longBreakTime;
        }
    }
});

intervalInput.addEventListener('input', () => {
    if (intervalInput.value != ''){
        if(intervalInput > 0){
            intervalsBeforeBreak = intervalInput.value
            intervalsLeft = intervalsBeforeBreak ;
        }else{
            intervalsBeforeBreak = 1
            intervalsLeft = intervalsBeforeBreak;
        }
    }
});


toggleButton.addEventListener('click', () => {
    if(isTimerOn){
        pauseTimer();
    }else{
        startTimer();
    } 
});


restartButton.addEventListener('click', () => {
    clearInterval(countdown);
    if (isTimerOn){
        toggleIcon.innerHTML = playIcon;
        isTimerOn = false;
    }

    if(isWork) {
        timeLeft = time;
        timeFormat(timeLeft);
    }else if (!isWork && !isLongBreak){
        timeLeft = breakTime;
        timeFormat(timeLeft);
    }else if (isLongBreak){
        timeLeft = longBreakTime;
        timeFormat(timeLeft)
    }
})


skipButton.addEventListener('click', () => {
    switchWork();
})


function startTimer() {
    toggleIcon.innerHTML = pauseIcon;
    isTimerOn = true;
    clearInterval(countdown);
    timeFormat(timeLeft);

    countdown = setInterval(() => {
        timeLeft--;
        timeFormat(timeLeft)

        if(timeLeft <= 0){
            clearInterval(countdown);
            bellSound.play();
            switchWork();
        }
    }, 1000);
}


function switchWork(){
    if(isWork){
        isWork = false;
        toggleBorderColor();
        isTimerOn = false;
        toggleIcon.innerHTML = playIcon;

        timeFormat(breakTime);
        timeLeft = breakTime;
        clearInterval(countdown);

    }else if (!isWork && !isLongBreak){
        if(intervalsLeft == 0){
            isLongBreak = true;
        }else {
            intervalsLeft--;
            isWork = true;
            toggleBorderColor();
            isTimerOn = false;
            toggleIcon.innerHTML = playIcon;

            timeFormat(time);
            timeLeft = time;
            clearInterval(countdown);
        }

    }if(isLongBreak){
        intervalsLeft = intervalsBeforeBreak;
        isWork = false;
        isLongBreak = false;
        toggleBorderColor();
        isTimerOn = false;
        toggleIcon.innerHTML = playIcon;

        timeFormat(longBreakTime);
        timeLeft = longBreakTime;
        clearInterval(countdown);
    }
}


function pauseTimer(){
    clearInterval(countdown); 
    isTimerOn = false;
    toggleIcon.innerHTML = playIcon;
}


function timeFormat(seconds){
    if(seconds >= 3600){
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        const formattedTime = [
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(secs).padStart(2, '0')
        ].join(':');

        timerDisplay.textContent = formattedTime;
    }else {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        const formattedTime = [
            String(minutes).padStart(2, '0'),
            String(secs).padStart(2, '0')
        ].join(':');

        timerDisplay.textContent = formattedTime;
    }
    
}

function toggleBorderColor() {
    const container = document.getElementById('container');
    if (borderColor === breakColor) {
        container.style.borderColor = workColor;
        container.style.outlineColor = breakColor;
        borderColor = workColor;
    } else {
        container.style.borderColor = breakColor;
        container.style.outlineColor = workColor; 
        borderColor = breakColor;
    }
}


