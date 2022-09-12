import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);


  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
function onFormSubmit(event){
  event.preventDefault();
  
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountPromis = Number(amount.value);

  for (let i = 1; i <= amountPromis; i += 1)
  createPromise(i, firstDelay)
  .then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  firstDelay += stepDelay;
}

