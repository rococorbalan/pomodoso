let countdown;
let timeLeft;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton')
const statusDisplay = document.getElementById('status');

//let time = parseFloat(prompt("Minutes")) * 60;
let time = 5;
let breakTime = 7;

let isBreak = false;
let isWork = true;

timeFormat(time);

timeLeft = time;
startButton.addEventListener('click', startTimer);
function startTimer() {
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

                timeFormat(breakTime);
                timeLeft = breakTime;
                clearInterval(countdown);

                statusDisplay.textContent = "BREAK";
            }else if (isBreak){
                isWork = true;
                isBreak = false;

                timeFormat(time);
                timeLeft = time;
                clearInterval(countdown);

                statusDisplay.textContent = "WORK";
            }
        }
    }, 1000);
}


pauseButton.addEventListener('click', ()=> {clearInterval(countdown)});


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


