//Object-oriented programming
//class:temlpate 붕어빵 판틀
//object: instance of a class

//1.class declaration
class Person{
    //constructor
    constructor(name, age){
        //fileds
        this.name=name
        this.age=age
    }
    
    //methods
    speak(){
        console.log(`${this.name}:hello!`)
    }
}

const ellie = new Person('ellie',20)
console.log(ellie.name)
console.log(ellie.age)
ellie.speak()

//2.getter and setter
class User{
    constructor(firstName, lastName, age){
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
    }

    get age(){
        return this._age
    }
    
    set age(value){
        if(value<0){
            throw Error('age can not be negative')
        }
        this._age=value
    }
}

const user1= new User('steve','jobs',1)
console.log(user1.age)

//3.Inheritance
//a way for one class to extend another class.
class Shape{
    constructor(width, height, color){
        this.width=width;
        this.height=height;
        this.color=color;
    }
    
    draw(){
        console.log(`drawing ${this.color} color of`)
    }

    getArea(){
        return this.width*this.height
    }
}

class Rectangle extends Shape{}
const rectangle=new Rectangle(20,20,'blue')
rectangle.draw()
console.log(rectangle.getArea())

class Triangle extends Shape{
    draw(){
        super.draw() //부모의 draw는 그대로 가져감
        console.log("emoji")
    }
    getArea(){
        return this.width*this.height/2
    } //overriding
}
const triangle=new Triangle(20,20,'red')
triangle.draw()
console.log(triangle.getArea())

//4.class checking: instanceof
console.log(rectangle instanceof Rectangle)
console.log(triangle instanceof Shape)
console.log(triangle instanceof Object)