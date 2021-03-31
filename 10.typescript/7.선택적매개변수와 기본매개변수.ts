//선택적 매개변수는 항상 필수 매개변수 뒤에 위치하여야 한다.
//기본 매개변수를 지정해주면 타입추론으로 인하여, 타입을 설정해주지 않아도 된다.
const sendGreeting=(message='hello',userName='there',sth?:string):void=>{
    console.log(`${message}, ${userName}`)
}

sendGreeting()
sendGreeting('good morning')
sendGreeting('good morning','jenny')