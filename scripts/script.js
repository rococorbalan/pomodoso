let countdown;
let timeLeft;

const timerDisplay = document.getElementById('timer');

const toggleButton = document.getElementById('toggle-button');
const restartButton = document.getElementById('restart-button');
const skipButton = document.getElementById('skip-button');

const statusDisplay = document.getElementById('status');

let time = 1500;
let breakTime = 300;
timeFormat(time);


let isWork = true;
let isTimerOn = false;

let workInput = document.getElementById('work-input'); 
let breakInput = document.getElementById('break-input')

timeLeft = time;

workInput.addEventListener('input', () => {
    if(workInput.value != ''){
        time = workInput.value;
        if (isTimerOn) {
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
        breakTime = breakInput.value;
        if (isTimerOn) {
            timeFormat(breakTime);
            timeLeft = breakTime;
        }
    }else{
        breakTime = 300
        if (isTimerOn) {
            timeFormat(breakTime);
            timeLeft = breakTime;
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
        toggleButton.textContent = "Start Timer"
        isTimerOn = false;
    }

    if(isWork) {
        timeLeft = time;
        timeFormat(timeLeft);
    }else{
        timeLeft = breakTime;
        timeFormat(timeLeft);
    }
})


skipButton.addEventListener('click', () => {
    switchWork();
})


function startTimer() {
    toggleButton.textContent = "Pause Timer"
    isTimerOn = true;
    clearInterval(countdown);
    timeFormat(timeLeft);

    countdown = setInterval(() => {
        timeLeft--;
        timeFormat(timeLeft)

        if(timeLeft <= 0){
            clearInterval(countdown);
            alert("Time's up!")
            switchWork();
        }
    }, 1000);
}


function switchWork(){
    if(isWork){
        isWork = false;
        isTimerOn = false;
        toggleButton.textContent = "Start Timer"

        timeFormat(breakTime);
        timeLeft = breakTime;
        clearInterval(countdown);

        statusDisplay.textContent = "BREAK";
    }else if (!isWork){
        isWork = true;
        isTimerOn = false;
        toggleButton.textContent = "Start Timer"

        timeFormat(time);
        timeLeft = time;
        clearInterval(countdown);

        statusDisplay.textContent = "WORK";
    }
}


function pauseTimer(){
    clearInterval(countdown); 
    isTimerOn = false;
    toggleButton.textContent = "Start Timer"
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


