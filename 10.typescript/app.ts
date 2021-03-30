function logName(name:string){
    console.log(name)
}
logName('Jack')
//tsc app.ts -> js파일 생성
//node app.js -> console 확인
//tsc --init -> tsconfig 생성
//tsc -w app.ts ->변경사항 왓칭

let a=5
//a='hello'
//a를 정해주지 않으면 자동으로 number로 할당되기 때문에 a='hello' 이렇게 바꿀 수가 없다.
//타입추론

function sth(lostPoints){
    return 100-lostPoints
}
//자동으로 리턴값을 number로 설정해주는 기능도 타입추론
