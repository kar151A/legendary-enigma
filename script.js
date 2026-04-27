
window.onload = () => {
  const savedCash = localStorage.getItem("cash");
  const savedBurn = localStorage.getItem("burn");

  if (savedCash) document.getElementById("cash").value = savedCash;
  if (savedBurn) document.getElementById("burn").value = savedBurn;
};

function calculateRunway() {
  const cashInput = document.getElementById("cash");
  const burnInput = document.getElementById("burn");
  const resultDiv = document.getElementById("result");
  const progressBar = document.getElementById("progress");

  const cash = parseFloat(cashInput.value);
  const burn = parseFloat(burnInput.value);

  
  if (isNaN(cash) || isNaN(burn) || burn <= 0 || cash < 0) {
    resultDiv.innerHTML = `
      <h2>Invalid Input</h2>
      <p>Enter valid cash & burn values</p>
    `;
    resultDiv.className = "result danger";
    progressBar.style.width = "0%";
    return;
  }

  
  localStorage.setItem("cash", cash);
  localStorage.setItem("burn", burn);

  
  const runway = cash / burn;
  const months = runway.toFixed(1);
  const days = Math.floor(runway * 30);

  let statusText = "";
  let className = "result ";
  let progressColor = "#2563eb";

  
  if (runway >= 6) {
    statusText = " Safe";
    className += "safe";
    progressColor = "#10b981"; 
  } else if (runway >= 3) {
    statusText = " Warning";
    className += "warning";
    progressColor = "#f59e0b"; 
  } else {
    statusText = " Danger";
    className += "danger";
    progressColor = "#ef4444"; 
  }

  
  resultDiv.innerHTML = `
    <h2>${months} Months</h2>
    <p>${statusText}</p>
    <small>≈ ${days} days remaining</small>
  `;

  resultDiv.className = className;

  // Progress bar (max cap at 12 months for visual scale)
  const percent = Math.min((runway / 12) * 100, 100);
  progressBar.style.width = percent + "%";
  progressBar.style.background = progressColor;
}