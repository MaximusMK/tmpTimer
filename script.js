'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const inputDay = document.querySelector('.days'),
        inputHours = document.querySelector('.hours'),
        inputMinutes = document.querySelector('.minutes'),
        inputSeconds = document.querySelector('.seconds'),
        btn = document.querySelector('button'),
        btnStop = document.querySelector('button-stop'), //stop button
        soundFinish = document.querySelector('.sound-finish');

    btn.addEventListener('click', () => {
        let sum = GetSumInput();
        let inputDate = Date.parse(new Date()) + sum;
        if (sum < 1000) {
            inputDate = Date.parse(new Date()) + 1000 * 60;
            setTimer('.timer', inputDate);
            setTimeout(alert('Таймер запущен на 1 минуту.'), 1000);
        } else {
            setTimer('.timer', inputDate);
        }
    })

    let stopTimer =  function() {//stop button

    }

    let GetSumInput = function () {
        let d = inputDay.value * 24 * 60 * 60 * 1000;
        let h = inputHours.value * 60 * 60 * 1000;
        let m = inputMinutes.value * 60 * 1000;
        let s = inputSeconds.value * 1000;
        let sumInput = d + h + m + s;
        return sumInput;
    }

    function getTime(inputDate) {
        const t = inputDate - Date.parse(new Date()),
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

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTimer(selector, inputDate) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateTimer, 1000);

        updateTimer();

        function updateTimer() {
            const t = getTime(inputDate);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                console.log(t.total);
                clearInterval(timeInterval);
                // alert('Время истекло');
                soundFinish.play();
                soundFinish.volume = 0.15;

            }
        }
    }
});