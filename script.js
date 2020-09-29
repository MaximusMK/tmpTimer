'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const inputDay = document.querySelector('.days'),
        inputHours = document.querySelector('.hours'),
        inputMinutes = document.querySelector('.minutes'),
        inputSeconds = document.querySelector('.seconds'),
        btnStart = document.querySelector('#start'),
        btnStop = document.querySelector('#stop'),
        soundFinish = document.querySelector('.sound-finish');
    let inputTime,
        startPressed = false,
        stopPressed = false;

    btnStart.addEventListener('click', () => {
        startPressed = true;
        let sum = getMillisecondsInput();
        if (sum <= 0) {
            inputTime = Date.parse(new Date()) + 60 * 1000;
            setTimer('.timer', inputTime);          
        } else {
            inputTime = Date.parse(new Date()) + sum;
            setTimer('.timer', inputTime);
        }
    })

    btnStop.addEventListener('click', () => {
        stopPressed = true;
        console.log('stopPressed=' + stopPressed);
    });

    function getMillisecondsInput() {
        let d = inputDay.value * 24 * 60 * 60 * 1000;
        let h = inputHours.value * 60 * 60 * 1000;
        let m = inputMinutes.value * 60 * 1000;
        let s = inputSeconds.value * 1000;
        let MillisecondsInput = d + h + m + s;
        return MillisecondsInput;
    }

    function getInputCells(MillisecondsInput) {
        const t = MillisecondsInput - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000 % 60));
       
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function setTimer(selector, MillisecondsInput) {
            const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const t = getInputCells(MillisecondsInput);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                playSound();                 
            } else {
                if (stopPressed) {
                    clearInterval(timeInterval);
                    resetTimer();
                } else {
                    if (stopPressed && t.total > 0) {
                        clearInterval(timeInterval);
                        resetTimer();
                    }
                }
            }
        }
    }

    function resetTimer() {
        setTimer('.timer', Date.parse(new Date()));
        startPressed = false,
        stopPressed = false;

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

   function playSound() {
        soundFinish.play();
        soundFinish.volume = 0.5;
    }
});

// 1) alert срабатывает за перед запуском
// 2) alert срабатывает за 1 сек до конца