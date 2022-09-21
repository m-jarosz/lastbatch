(() => {
const inputFlow = document.querySelector(".js-flow");
const inputCurrentBatch = document.querySelector(".js-currentBatch");
const inputCurrentBatchTime = document.querySelector(".js-currentBatchTime");
const inputStopCookingTime = document.querySelector(".js-stopCookingTime");
const form = document.querySelector(".js-form");
const content = document.querySelector(".js-contentBox");


const calculateFlow = () => inputFlow.value/60;

const calculateTimeBeetwenBatches = () => Math.floor(460/calculateFlow());

const calculateAmountOfBatches = () => {
    const currentBatchTime = new Date(inputCurrentBatchTime.value);
    const stopCookingTime = new Date(inputStopCookingTime.value);
    if (currentBatchTime < stopCookingTime) {
        const difference = ((stopCookingTime - currentBatchTime)/1000)/60;
        return (difference / calculateTimeBeetwenBatches()) - (1170/460);
    } 
}

// const calculateLastDrop = () => {
//     const stopCookingTime = new Date(inputStopCookingTime.value);
//     const minutesOfHoldongTank = 1170 / calculateFlow();
//     return new Date(stopCookingTime - (minutesOfHoldongTank * 60) * 1000);
// }
const calculateNumberOfLasBatch = () => {
    const flow = calculateFlow();
    const timeBeetwenBatches = calculateTimeBeetwenBatches();
    const amountOfBatches = calculateAmountOfBatches();
    // const timeLastDrop = calculateLastDrop();
    // const timeLastBatch = new Date(timeLastDrop - ((flow * 60) * 1000));
    const lastBatch = parseInt(inputCurrentBatch.value) + amountOfBatches;
    const answer = document.querySelector("div .js-answer");
    if (amountOfBatches) {
        answer.textContent = lastBatch; // tymczasowe usunięcie zaokrąglenia Math.round()
    } else {
        answer.textContent = "Nieprawidłowe wartości czasu";
        answer.style.fontSize = "40px";
    }   
    content.classList.add("active");
} 

const hideContentBox = () => {
    content.classList.remove("active");
    inputFlow.value = "";
    inputCurrentBatch.value = "";
    inputCurrentBatchTime.value = "";
    inputStopCookingTime.value = "";
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateNumberOfLasBatch();
});

content.addEventListener("click", hideContentBox);
})();






