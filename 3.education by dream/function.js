//3.default para
function showMessage(message, from = 'unknown'){
    console.log(`${message} by ${from}`)
}
showMessage('hi!')

//4.rest parameter 배열의 형태로 저장이 돼
function printAll(...args){
    for(let i=0; i<args.length;i++){
        console.log(args[i])
    }

//    for(const arg of args){
//        console.log(arg)
//    }

//    args.forEach((arg)=>console.group(arg))
}
printAll('dream','coding','ellie')

//7. Early return, early exit
//if문안에나 중괄호로 묶인 곳에 본론을 쓰는 것은 가독성이 떨어지므로 리턴으로 빨리
//내보내고 그 이후에 본론을 쓰는 것이 현업에서 좋다.
//bad
function sth(user){
    if(user.point>10){
        //~~~
    }
}

//good
function sth(user){
    if(user.point<=10){
        return false
    }
}

//8.Function expression
const print= function(){
    console.log('print')
}

print()
const printAgain = print;
printAgain()

//9.callback function
function randomQuiz(answer,printYes,printNo){
    if(answer==='love you'){
        printYes()
    }else{
        printNo()
    }
}
//anonymous function
const printYes=function(){
    console.log('yes')
}
//named function
//자기자신을 불러오거나 할 때 쓰인다
const printNo=function print(){
    console.log('no')
    //print()
}

randomQuiz('wrong',printYes,printNo)
randomQuiz('love you',printYes,printNo)


//arrow function
const add1=function(a,b){
    return a+b
}

const add=(a,b)=> a+b
//중괄호가 필요한 곳은 return이 필요하다.
const add2=(a,b)=>{
    return a+b
}

//10.IIFE: Immediately Invoked Function Expression
//따로 함수 선언 필요 없이 바로 ㄲ
(function hello(){
    console.log("IIFE")
})();