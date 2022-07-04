// Elements
const up_hour = document.querySelector('#up .hours')
const down_hour = document.querySelector('#down .hours')
const up_min = document.querySelector('#up .minutes')
const down_min = document.querySelector('#down .minutes')

const alarm_hour  = document.querySelector('#alarm .hours')
const alarm_min  = document.querySelector('#alarm .minutes')

const toggle = document.querySelector('#toggle-button')
const audio = document.querySelector('audio')

// "State"

let h = 0;
let m = 0;

let ring = null;
let alarm = null;

let pushed = false;

// Alarm setting

function increment_h(){
    h = (h + 1) % 24;
    alarm_hour.innerHTML = h.toString();
}
function increment_m(){
    m = (m + 1) % 60;
    alarm_min.innerHTML = m.toString().padStart(2, '0');
}
function decrement_h(){
    h = (h - 1 + 24) % 24;
    alarm_hour.innerHTML = h.toString();
}
function decrement_m(){
    m = (m - 1 + 60) % 60;
    alarm_min.innerHTML = m.toString().padStart(2, '0');
}

up_hour.addEventListener('click', () => {if(!pushed) increment_h()})
down_hour.addEventListener('click', () => {if(!pushed) decrement_h()})
up_min.addEventListener('click', () => {if(!pushed) increment_m()})
down_min.addEventListener('click', () => {if(!pushed) decrement_m()})

// Ring fcts

function start_ring() {
    ring = setInterval(() => {audio.currentTime = 0; audio.play()}, 500)
}

function stop_ring() {
    clearInterval(ring)
    ring = null;
}

// Alarm activation fcts

function setAlarm() {
    let d = new Date(Date.now());
    d.setHours(h);
    d.setMinutes(m);
    d.setSeconds(0);
    d.setMilliseconds(0);
    if (Number(d) <= Date.now()) d = new Date(Number(d) + 1000*60*60*24);

    console.log("Alarm set for : ", d)

    alarm = setTimeout(start_ring,  Number(d) - Date.now())
}

function unsetAlarm() {
    clearTimeout(alarm)
    alarm = null;
}

// Big button fcts

function pushButton() {
    setAlarm();
    toggle.classList.add('pushed')
}

function unpushButton() {
    stop_ring()
    unsetAlarm()
    toggle.classList.remove('pushed')
}

// Toggle button wiring

toggle.addEventListener("click", () => {
    if (pushed) unpushButton()
    else pushButton()

    pushed = !pushed;
})