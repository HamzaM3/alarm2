const hour = document.querySelector("#current-time .hours")
const colons = document.querySelector("#current-time .colons")
const minutes = document.querySelector("#current-time .minutes")

let c = true

setInterval(() => {
    c = !c
}, 1000)

setInterval(() => {
    let d = new Date()
    let h = d.getHours()
    let m = d.getMinutes()
    hour.innerHTML = h.toString();
    colons.innerHTML = c ? ":" : "";
    minutes.innerHTML =  m.toString().padStart(2, '0');
}, 100)