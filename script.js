const hitpoint = document.getElementById("hitpoint");
const comboCounter = document.getElementById("combo");
const missesCounter = document.getElementById("misses");
const timer = document.getElementById("timer");
const accuracyMath = document.getElementById("accuracy");

let combo = 0;
let misses = 0;
let timeLeft = 20;
const maxMisses = 3;
const comboSpike = 5;
let increasedSpeed = false;

const endGame = () => location.reload();

//prevent default/text select/ copying

document.addEventListener("mousedown", function (event) {
    event.preventDefault();
});

//randomize hitpoint location

const randomizeHitpointLocation = () => {


    const containerWidth = 1000; 
    const containerHeight = 850; 

    const hitpointWidth =100; 
    const hitpointHeight = 100; 

    const maxX = containerWidth - hitpointWidth;
    const maxY = containerHeight - hitpointHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    hitpoint.style.left = randomX + "px";
    hitpoint.style.top = randomY + "px";

    // console.log("Random X:", randomX);
    // console.log("Random Y:", randomY);
    
};


// combo gain and difficulty spike :>
function increaseSpeed() {
    setInterval(randomizeHitpointLocation, 1600);
}

hitpoint.addEventListener("click", () => {
    combo++;
    comboCounter.innerHTML = combo;
    randomizeHitpointLocation();
    updateAccuracy();

    if (combo >= comboSpike && !increasedSpeed) {
        increaseSpeed();
        increasedSpeed = true;
    }
});

//misses

document.addEventListener("click", event => {
    if (event.target !== hitpoint) {
        misses++;
        missesCounter.innerHTML = misses;
        if (misses >= maxMisses) {
            alert("Your final score is Combo: " + combo + " - Accuracy: " + accuracyMath.innerHTML);
            endGame();
            updateAccuracy();
        }
    }
});

//timer

const startTimer = () => {

    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            alert("Your final score is Combo: " + combo + " - Accuracy: " + accuracyMath.innerHTML);
            location.reload();
        }
        updateTimer();
        updateAccuracy();
        timeLeft--;
    }, 1000);
};

// accuracy in percentage

const updateTimer = () => timer.innerHTML = timeLeft;
const updateAccuracy = () => {
    const totalAttempts = combo + misses;
    accuracyMath.innerHTML = totalAttempts === 0 ? '100%' : (Math.floor((combo / totalAttempts) * 10000) / 100) + '%';
};

randomizeHitpointLocation();
updateTimer();
startTimer();

//default speed

setInterval(randomizeHitpointLocation, 2000);
