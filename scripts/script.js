let countdown;
let timeLeft;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button')
const statusDisplay = document.getElementById('status');

let time = 1500;
let breakTime = 300;
timeFormat(time);

let isBreak = false;
let isWork = true;
let isTimerOn = false;

let workInput = document.getElementById('work-input'); 
let breakInput = document.getElementById('break-input')

timeLeft = time;

workInput.addEventListener('input', () => {
    if(workInput.value != ''){
        workTime = workInput.value;
        if (isTimerOn) {
            timeFormat(workTime);
            timeLeft = workTime;
        }
    }else{
        workTime = 300
        if (isTimerOn) {
            timeFormat(workTime);
            timeLeft = workTime;
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

//let time = parseFloat(prompt("Minutes")) * 60;

startButton.addEventListener('click', startTimer);
function startTimer() {
    isTimerOn = true;
    clearInterval(countdown);
    timeFormat(timeLeft);

    countdown = setInterval(() => {
        timeLeft--;
        timeFormat(timeLeft)

        if(timeLeft <= 0){
            clearInterval(countdown);
            alert("Time's up!")
            if(isWork){
                isWork = false;
                isBreak = true;
                isTimerOn = false;

                timeFormat(breakTime);
                timeLeft = breakTime;
                clearInterval(countdown);

                statusDisplay.textContent = "BREAK";
            }else if (isBreak){
                isWork = true;
                isBreak = false;
                isTimerOn = false;

                timeFormat(time);
                timeLeft = time;
                clearInterval(countdown);

                statusDisplay.textContent = "WORK";
            }
        }
    }, 1000);
}


pauseButton.addEventListener('click', ()=> {clearInterval(countdown); isTimerOn = false;});


function timeFormat(seconds){
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const formattedTime = [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(secs).padStart(2, '0')
    ].join(':');

    timerDisplay.textContent = formattedTime;
}


