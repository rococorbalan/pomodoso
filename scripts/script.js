let countdown;
let timeLeft = 10;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');

let time = parseFloat(prompt("Minutes")) * 60;
timeFormat(time);

startButton.addEventListener('click', startTimer);
function startTimer() {
    clearInterval(countdown);
    timeLeft = time;
    timeFormat(timeLeft);

    countdown = setInterval(() => {
        timeLeft--;
        timeFormat(timeLeft)

        if(timeLeft <= 0){
            clearInterval(countdown);
            alert("Time's up!")
        }
    }, 1000);
}

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


