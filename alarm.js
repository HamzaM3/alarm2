// Elements
const up_hour = document.querySelector('#up .hours')
const down_hour = document.querySelector('#down .hours')
const up_min = document.querySelector('#up .minutes')
const down_min = document.querySelector('#down .minutes')

const alarm_min  = document.querySelector('#alarm .minutes')
const alarm_hour  = document.querySelector('#alarm .hours')

const toggle = document.querySelector('#toggle-button')
const audio = document.querySelector('audio')

let h = 0;
let m = 0;

let ring = null;
let alarm = null;

let pushed = false;

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


function start_ring() {
    ring = setInterval(() => {audio.currentTime = 0; audio.play()}, 500)
}

function stop_ring() {
    clearInterval(ring)
    ring = null;
}

function setAlarm() {
    let d = new Date(Date.now());
    d.setHours(h);
    d.setMinutes(m);
    d.setSeconds(0);
    d.setMilliseconds(0);
    if (Number(d) < Date.now()) d = new Date(Number(d) + 1000*60*60*24);

    alarm = setTimeout(start_ring,  Number(d) - Date.now())
    pushed = true;

    toggle.classList.add('pushed')
}

function unsetAlarm() {
    clearTimeout(alarm)
    alarm = null;
}

function unpushButton() {
    stop_ring()
    unsetAlarm()
    pushed = false;
    toggle.classList.remove('pushed')
}

toggle.addEventListener("click", () => {
    if (pushed) unpushButton()
    else setAlarm()
})