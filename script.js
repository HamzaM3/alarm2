
// Left as an artifact (to remember from where I come)

const button = document.getElementById('button');
const alarm = document.getElementById('show_alarm');
const audio_element = document.getElementById('audio');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function now_ms() {
    return (new Date()).getTime();
}

const color_max = Math.pow(16, 6);

function background_change() {
    let color = getRandomInt(0, color_max).toString(16);
    color = '#' + add_zeros(color, 6);
    document.body.style.backgroundColor = color;
}

function h_min_to_ms(h, minutes){
    return (h * 60 + minutes) * 60 * 1000;
}

function add_zeros(x, n) {
    if (x.length >= n) {
        return x;
    }
    return '0'.repeat(n - x.length) + x;
}

function get_today_with_alarm_time(hour, minutes){
    let res_date = new Date();
    res_date.setHours(hour);
    res_date.setMinutes(minutes); 
    res_date.setSeconds(0);
    res_date.setMilliseconds(0);
    return res_date.getTime();
}

var show_alarm = undefined;
var end_alarm = undefined;
var beep = undefined;

function start_alarm(e) {
    let hour = Number(document.getElementById('hour').value);
    let minutes = Number(document.getElementById('minutes').value);

    let alarm_ms = get_today_with_alarm_time(hour, minutes);

    if (alarm_ms <= now_ms()){
        const ms_of_one_day = 1000 * 60 * 60 * 24;
        alarm_ms =  alarm_ms + ms_of_one_day;
    }

    alarm.innerHTML = "Alarm for " + add_zeros(hour, 2) + ":" + add_zeros(minutes, 2);
 
    end_alarm = setTimeout(() => {
        alarm.innerHTML =  "It's " + add_zeros(hour, 2) + ":" + add_zeros(minutes, 2);
        audio_element.play();
        background_change();
        beep = setInterval(() => {
            audio_element.play();
            background_change();
        }, 1000)
    }, alarm_ms - now_ms());

    
    button.innerHTML = "Stop alarm";
    button.removeEventListener('click', start_alarm);
    button.addEventListener('click', stop_alarm);
}

function stop_alarm(e) {
    clearTimeout(end_alarm);
    clearInterval(beep);

    button.innerHTML = "Start alarm";
    alarm.innerHTML = "";
    document.body.style.backgroundColor = 'white';

    button.removeEventListener('click', stop_alarm);
    button.addEventListener('click', start_alarm);
}

button.addEventListener('click', start_alarm)