enum genderType{
    Male= 'male',
    Female='female',
    GenderNeutral='genderNeutral'
}

interface Student{
    readonly studentId: number
    studentName: string
    age?: number
    // gender: genderType 
    // 위에것이 enum 아래 것은 리터럴타입
    gender:'male' | 'female' | 'genderNeutral',
    subject: string
    courseCompleted: boolean
    addComment?:(comment:string)=>string
}

const student1={
    studentId: 12345,
    studentName: 'Mark',
    // gender: genderType.Female,
    gender:'male',
    age:30,
    subject: 'Node js',
    courseCompleted: true,
}

function getStudentDetails(studentId: number): Student{

    return {
        studentId: 12345,
        studentName: 'Mark',
        // gender: genderType.Male,
        gender:'female',
        subject: 'Node js',
        courseCompleted: true,
    }
}

function saveStudentDetails(student:Student):void{

}

saveStudentDetails(student1)