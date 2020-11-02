const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = []; //아래에서 toDos를 새로 정의할 것이기 때문에 let을 씀

function deltetdToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !==parseInt(li.id); // toDO.id는 숫자고 li.id는 문자이기때문에 li를 숫자로 바꿔줌
    });
    toDos = cleanToDos; //이 fn안에서만 toDos를 새로이 정의
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos)); // 자바스크립트 object를 string으로바꿔주는 stringify
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newId = toDos.length + 1;
    const span = document.createElement("span");
    delBtn.innerText = "X";
    delBtn.addEventListener("click",deltetdToDo);
    span.innerText = text;
    li.appendChild(span); //span을 li안에 넣는다는 뜻
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text:text,
        id:newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handlesubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function sth(toDo){
    paintToDo(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(sth);
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handlesubmit)
}

init();