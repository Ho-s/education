let studentId: number = 12345
let studentName: string = 'Jenny Kim'
let age: number = 21
let gender: string = 'female'
let subject: string = 'javascript'
let courseCompleted: boolean = false

// 대문자로 시작
// 완성된 인터페이스는 타입으로 사용할 수 있다.
interface Student{
    readonly studentId: number
    studentName: string
    age?: number
    // ?를 붙이면 있어도되고 없어도 되는 것이 된다. (선택적 프로퍼티)
    gender: string
    subject: string
    courseCompleted: boolean
    //메소드란 객체 내에서 정의된 함수(function)이다.
    // addComment(comment:string):string;
    addComment?:(comment:string)=>string
}

const student1={
    studentId: 12345,
    studentName: 'Mark',
    gender: 'male',
    age:30,
    subject: 'Node js',
    courseCompleted: true,
}

function getStudentDetails(studentId: number): Student{

    return {
        studentId: 12345,
        studentName: 'Mark',
        gender: 'male',
        subject: 'Node js',
        courseCompleted: true,
    }
}

function saveStudentDetails(student:Student):void{

}

saveStudentDetails(student1)