
//   1) проверка на пустой ввод: если все ячейки пустые запустить таймер на 1 мин и вывести alert(DIV) c сообщением как устанавливать таймер

// если не введен год - то присвоить ему текущий и т.д.

'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const inputDays = document.querySelector('.days'),
        inputHours = document.querySelector('.hours'),
        inputMinutes = document.querySelector('.minutes'),
        inputSeconds = document.querySelector('.seconds'),
        btn = document.querySelector('button');

    btn.addEventListener('click', () => {
        setTimer('.timer', inputDate);
    })

    function getInputDate() {
        const days = +inputDays.value,
        hours = +inputHours.value,
        minutes = +inputMinutes.value,
        seconds = +inputSeconds.value,
        sum = days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000,
        inp = sum ;
        return inputDate;        
    }
    let inputDate = getInputDate();    
    let inputDate = '2020-09-24';

    console.log(inputDate);

    function getTime(inputDate) {
        const t = Date.parse(inputDate) - Date.parse(new Date()),
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
                clearInterval(timeInterval);
                alert('Таймер сработал!');
            }
        }
    }
});