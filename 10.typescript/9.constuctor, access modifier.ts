class Employee{
    // private은 밖에서 읽을 수도 없다. 또한 private에는 _언더바를 붙여서 비공개임을 나타내준다.
    constructor(private _fullName:string,public age:number,public jobTitle:string,public hourlyRate:number,public workingHoursPerWeek?:number){}

    get fullName(){
        return this._fullName
    }

    set fullName(value:string){
        this._fullName=value
    }

    // 모디파이어가 명시되어 있지 않다면 기본으로 public을 가진다
     printEmployeeDetails = ():void=>{
        console.log(`${this.fullName}의 직업은 ${this.jobTitle}이고 일주일의 수입은 ${this.hourlyRate*this.workingHoursPerWeek}달러이다.`)
    }
}

let employee1=new Employee('민수',28,'주니어웹개발자',40,35)
console.log(employee1.fullName)
employee1.printEmployeeDetails()

let employee2=new Employee('정수',38,'시니어웹개발자',40,35)
employee2.printEmployeeDetails()