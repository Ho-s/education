//object= {key:value}
//1.literal, property
const obj1={}  //'object literal' syntax
const obj2=new Object() //'object constructor'syntax

function print(person){
    console.log(person.name)
    console.log(person.age)
}

const ellie={
    name:'ellie',
    age:4
}

print(ellie)

ellie.hasJob="teacher"
console.log(ellie.hasJob)

delete ellie.hasJob
console.log(ellie.hasJob)

//2.computed properties
console.log(ellie.name)
console.log(ellie['name']) //must be string
ellie['hasJob']="teacher"
console.log(ellie.hasJob)

//3.property value shorthand
const person1={name:'bob',age:2}
const person2= makePerson('Joo',20)
console.log(person2)
const person3= new Person('Sin',20)
console.log(person3)

function makePerson(name,age){
    return{
        //name:name,
        //age:age
        //똑같으면 바꿀 수 있어
        name,
        age
    }
}

//4.constructor property
function Person(name,age){
    this.name=name
    this.age=age
}

//5.in operator
console.log('name' in ellie)
console.log('random' in ellie)
console.log(ellie.randaom)

//6.for..in vs for..of
console.clear()
//for(key in obj)
for(key in ellie){
    console.log(key)
}

//for(value of iterable)
const array = [1,2,4,5]
for(value of array){
    console.log(value)
}

//7.cloning
const user={
    name:'ellie',
    age:20
}
const user2=user
user2.name='coder'
console.log(user)

const user3={}
Object.assign(user3,user) 

const user4=Object.assign({},user)
