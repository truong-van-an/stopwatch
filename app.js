const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var boxtime = $(".time")
var boxMinute = document.createElement("span");
var boxSecond = document.createElement("span");
var boxHour = document.createElement("span");
var boxMili = document.createElement("span");
boxMinute.classList.add("minute");
boxSecond.classList.add("second");
boxHour.classList.add("hour");
boxMili.classList.add("milisecond");
boxMinute.innerText = "00:"
boxSecond.innerText = "00:"
boxHour.innerText = "00:"
boxMili.innerText = "00"
boxtime.appendChild(boxHour);
boxtime.appendChild(boxMinute);
boxtime.appendChild(boxSecond);
boxtime.appendChild(boxMili);
var second = 0;
var minute = 0;
var hour = 0;
var milisecond = 0
let x;
function startTime(){
    milisecond++
    if(milisecond>99){
        milisecond=0
        second++
    }
    if(second>60){
        second=0
        minute++
    }
    if(minute>60){
        minute=0
        hour++
    }
    second<10? $(".second").innerHTML = `0${second}:`: $(".second").innerHTML = `${second}:`;
    milisecond<10? $(".milisecond").innerHTML = `0${milisecond}`: $(".milisecond").innerHTML = `${milisecond}`;
    minute<10? $(".minute").innerHTML = `0${minute}:`: $(".minute").innerHTML =`${minute}:`;
    hour<10? $(".hour").innerHTML = `0${hour}:`: $(".hour").innerHTML = `${hour}:`;
}
    $(".pause").addEventListener("click",()=>{
        clearInterval(x)
        $(".boxPause").style.display = 'none';
        $(".boxContinue").style.display = 'block';
    })
$(".play").addEventListener("click",()=>{
    clearInterval(x)
    x = setInterval(startTime,10);
    $(".play").style.display = 'none';
    $(".boxPause").style.display = "block";
})
var array = [];
function reset(){
    $(".reset").addEventListener("click",()=>{
        var boxDate = new Date();
        var getTime = new Date(boxDate).toLocaleTimeString()
        var getDate = new Date(boxDate).toLocaleDateString()
        second = second<10? $(".second").innerHTML = `0${second}:`: $(".second").innerHTML = `${second}:`;
        milisecond = milisecond<10? $(".milisecond").innerHTML = `0${milisecond}`: $(".milisecond").innerHTML = `${milisecond}`;
        minute = minute<10? $(".minute").innerHTML = `0${minute}:`: $(".minute").innerHTML =`${minute}:`;
        hour = hour<10? $(".hour").innerHTML = `0${hour}:`: $(".hour").innerHTML = `${hour}:`;
        var timeAll = `${hour}${minute}${second}${milisecond}`
        var date = `${getTime},${getDate}`
        var boxTimeDateOj = timeDateOj(timeAll,date);
        array.push(boxTimeDateOj);
        var json = JSON.stringify(array);
        localStorage.setItem('time',json)
        second = 00;
        minute = 00;
        hour = 00;
        milisecond = 00;
        $(".hour").innerHTML = `0${hour}:`;
        $(".minute").innerHTML = `0${minute}:`;
        $(".second").innerHTML = `0${second}:`;
        $(".milisecond").innerHTML =`0${milisecond}`;
        $(".boxContinue").style.display = "none";
        $(".block").style.display = "block"
        $(".play").style.display = "block";
        showTime();
    })
}
function showTime(){
    let jsonArray = localStorage.getItem('time');
    if(jsonArray == null){
        array = [];
    }
    else{
        array = JSON.parse(jsonArray);
    }
    let html = ''
    array.forEach((item,index)=>{
        html += `
                    <tr>
                        <th scope="row" class="row">${index+1}</th>
                        <td>${item.timeAll}</td>
                        <td>${item.date}</td>
                    </tr>
                    `;
    })
    $("tbody").innerHTML = html;
    $(".block").style.display = "block"
}
function timeDateOj(timeAll,date){
    var timeDate = new Object();
    timeDate.timeAll = timeAll;
    timeDate.date = date;
    return timeDate;
}

$(".continue").addEventListener("click",()=>{
    x= setInterval(startTime,10)
    $(".boxContinue").style.display = 'none';
    $(".boxPause").style.display = "block";
})
$(".delete").addEventListener("click",()=>{
    array = [];
    localStorage.setItem('time',JSON.stringify(array));
    second = 00;
    minute = 00;
    hour = 00;
    milisecond = 00;
    $(".hour").innerHTML = `0${hour}:`;
    $(".minute").innerHTML = `0${minute}:`;
    $(".second").innerHTML = `0${second}:`;
    $(".milisecond").innerHTML =`0${milisecond}`;
    showTime();
    $(".boxContinue").style.display = "none";
    $(".block").style.display = "none";
    $(".play").style.display = "block";
})
reset();
showTime();
console.log(array);


