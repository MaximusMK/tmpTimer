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
    // console.log('stopPressed=' + stopPressed);

    btnStart.addEventListener('click', () => {
        startPressed = true;
        console.log('startPressed=' + startPressed);
        let sum = getSumInput();

        if (sum <= 0) {
            inputTime = Date.parse(new Date()) + 30 * 1000; //вернуть 60 после отладки
            setTimer('.timer', inputTime);
            console.log('startPressed=' + startPressed);
            // alert('Таймер запущен на 1 минуту.'); // 1) срабатывает перед запуском
        } else {
            inputTime = Date.parse(new Date()) + sum;
            setTimer('.timer', inputTime);
            console.log('startPressed=' + startPressed);
        }
    })

    btnStop.addEventListener('click', () => {
        stopPressed = true;
        console.log('stopPressed=' + stopPressed);
    });

    function getSumInput() {
        let d = inputDay.value * 24 * 60 * 60 * 1000;
        let h = inputHours.value * 60 * 60 * 1000;
        let m = inputMinutes.value * 60 * 1000;
        let s = inputSeconds.value * 1000;
        let sumInput = d + h + m + s;
        return sumInput;
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
                clearInterval(timeInterval);
                // alert('Время истекло'); // 2) срабатывает за 1 секунду до конца
                soundFinish.play();
                soundFinish.volume = 0.8;
            }
        }
    }

    function getTime(inputDate) {
        if (startPressed && !stopPressed) {
            inputDate = Date.parse(new Date());
            const t = inputTime - Date.parse(new Date()),
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
        } else {
            if (startPressed && stopPressed) {
                const t = 0,
                    days = Math.floor(t / (1000 * 60 * 60 * 24)),
                    hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                    minutes = Math.floor((t / (1000 * 60) % 60)),
                    seconds = Math.floor((t / 1000 % 60));
                    startPressed = false;
                    stopPressed = false;

                return {
                    'total': t,
                    'days': days,
                    'hours': hours,
                    'minutes': minutes,
                    'seconds': seconds,
                };
            }

        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function stopTimer() {
        soundFinish.pause();
        //
    }
});

// 1) alert срабатывает за перед запуском
// 2) alert срабатывает за 1 сек до конца