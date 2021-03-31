class Employee{
    fullName:string
    age:number
    jobTitle:string
    hourlyRate:number
    workingHoursPerWeek:number

    printEmployeeDetails = ():void=>{
        console.log(`${this.fullName}의 직업은 ${this.jobTitle}이고 일주일의 수입은 ${this.hourlyRate*this.workingHoursPerWeek}달러이다.`)
    }
}

let employee1=new Employee()
employee1.fullName='민수'
employee1.age=28
employee1.jobTitle='주니어 웹 개발자'
employee1.hourlyRate=40
employee1.workingHoursPerWeek=35
employee1.printEmployeeDetails()

let employee2=new Employee()
employee2.fullName='민수'
employee2.age=28
employee2.jobTitle='주니어 웹 개발자'
employee2.hourlyRate=40
employee2.workingHoursPerWeek=35
employee2.printEmployeeDetails()
employee2.printEmployeeDetails()