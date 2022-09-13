import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('button[data-start]');

const inputEl = document.querySelector('#datetime-picker');
const dateValue = document.querySelector('[data-days]');
const hourValue = document.querySelector('[data-hours]');
const minuteValue = document.querySelector('[data-minutes]');
const secondValue = document.querySelector('[data-seconds]');


startBtn.setAttribute('disabled', true);
let selectDate = 0;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = new Date(selectedDates[0]).getTime();
    checkDate(selectDate);
  },
};

flatpickr(inputEl, options);

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);

    timerId = setInterval(() => {
      const currentDateValue = currentDate();
      let finishTime = selectDate - currentDateValue;
      const { days, hours, minutes, seconds } = convertMs(finishTime);
      dateValue.textContent = pad(`${days}`);
      hourValue.textContent = pad(`${hours}`);
      minuteValue.textContent = pad(`${minutes}`);
      secondValue.textContent = pad(`${seconds}`);
      if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
        clearInterval(timerId);
      }
    }, 1000);
   

 });
 function currentDate() {
  return new Date().getTime();
}



function checkDate(valueDate) {
  const currentDateValue = currentDate();
  const pastTime = currentDateValue > valueDate;
  const futureTime = currentDateValue < valueDate;
  if (pastTime) {
    Notify.failure('Please choose a date in the future');
    startBtn.style.backgroundColor = 'red';
    startBtn.setAttribute('disabled', true);
    return;}
  if (futureTime) {
    Notify.success('Timer can be started');
    startBtn.removeAttribute('disabled');
    startBtn.style.backgroundColor = '#AEF850';
    startBtn.style.borderColor = 'green';
    inputEl.style.color = 'green';
    return;
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
  function pad(value) {
    return String(value).padStart(2, '0');
  }

