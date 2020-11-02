const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const gretting = document.querySelector(".js-gretting");

const USER_LS = "currentUser";
const SHOWING_CN ="showing";

function saveName(text){
    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGretting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit)
}

function paintGretting(text){
    form.classList.remove(SHOWING_CN);
    gretting.classList.add(SHOWING_CN);
    gretting.innerText = `Hello ${text}`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){   
        askForName();
    }
    else {
        paintGretting(currentUser);  //어플리케이션안의 값에 커렌트유저가 있으면 커렌트 유저를 색칠하고 위에 hello를 띄운다
    }
}

function init(){
    loadName();
}
init()