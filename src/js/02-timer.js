import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');

const inputEl = document.querySelector('#datetime-picker');
const dateValue = document.querySelector('[data-days]');
const hourValue = document.querySelector('[data-hours]');
const minuteValue = document.querySelector('[data-minutes]');
const secondValue = document.querySelector('[data-seconds]');



let timerId = null;
startBtn.disabled = true;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const finishDate = selectedDates[0].getTime();
      onDate(finishDate);
    
    },
  };

  flatpickr('#datetime-picker', options);

    function onDate(finishDate){
        const currentDate = Date.now();
        const pastTime = finishDate < currentDate;
        const futureTime = finishDate > currentDate;
        
        console.log(convertMs(finishDate));
        if(futureTime){
            startBtn.disabled = false;
     
            startBtn.style.backgroundColor = '#AEF850';
            startBtn.style.borderColor = 'green';
            inputEl.style.color = 'green';
          
        }
         if(pastTime){
            Notify.failure('Please choose a date in the future');
            startBtn.style.backgroundColor = 'red';
         }

         startBtn.addEventListener('click', () =>{
            startBtn.disabled = true;
            
        
        timerId =  setInterval(() => {
            const currentDateValue = new Date().getTime();
            let leftTime = finishDate - currentDateValue;
            const { days, hours, minutes, seconds} = convertMs(leftTime);
                dateValue.textContent = `${days}`;
                hourValue.textContent = `${hours}`;
                minuteValue.textContent = `${minutes}`;
                secondValue.textContent = `${seconds}`;

                if (seconds === 0 && minutes === 0 && hours === 0 && days === 0){
                    clearInterval(timerId);
                }
           }, 1000);
           
         });
       
         
    }

   function convertMs(ms){
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
  
      const days = pad(Math.floor(ms / day));
      const hours = pad(Math.floor((ms % day) / hour));
      const minutes = pad(Math.floor(((ms % day) % hour) / minute));
      const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  
      return { days, hours, minutes, seconds };
    }
  
  function pad(value) {
    return String(value).padStart(2, '0');
  }

