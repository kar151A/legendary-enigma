window.onload = function () {
  const c = localStorage.getItem("cash");
  const b = localStorage.getItem("burn");

  if (c) document.getElementById("cash").value = c;
  if (b) document.getElementById("burn").value = b;
};

function calculateRunway() {
  const cash = parseFloat(document.getElementById("cash").value);
  const burn = parseFloat(document.getElementById("burn").value);
  const result = document.getElementById("result");
  const bar = document.getElementById("progress");

  if (!cash || !burn || burn <= 0) {
    result.innerHTML = "<h2>Invalid Input</h2><p>Enter valid values</p>";
    result.className = "result danger";
    bar.style.width = "0%";
    return;
  }

  localStorage.setItem("cash", cash);
  localStorage.setItem("burn", burn);

  const runway = cash / burn;
  const months = runway.toFixed(1);
  const days = Math.floor(runway * 30);

  let status = "";
  let cls = "result ";
  let color = "#2563eb";

  if (runway >= 6) {


    status = "🟢 Safe";
    cls += "safe";
    color = "#10b981";

  } else if (runway >= 3) {

    status = "🟡 Warning";
    cls += "warning";
    color = "#f59e0b";
  } else {
    status = "🔴 Danger";
    cls += "danger";
    color = "#ef4444";
    
  }

  result.innerHTML = `<h2>${months} Months</h2><p>${status}</p><small>${days} days left</small>`;
  result.className = cls;

  const percent = Math.min((runway / 12) * 100, 100);
  bar.style.width = percent + "%";
  bar.style.background = color;
}