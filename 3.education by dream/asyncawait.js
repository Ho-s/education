//async & await
//clear style of using promise

//1.async
function fetchUser(){
    return new Promise((resolve,reject)=>{
        //do network request in 10 secs
        resolve('ellie')
    })
}
const user=fetchUser();
user.then(sth=>console.log(sth))

async function fetchUser1(){
    return 'ellie'
}
const user1=fetchUser1();
user1.then(console.log)

//2.await
function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}

async function getApple(){
    await delay(2000)
    return "사과"
}

async function getBanana(){
    await delay(1000)
    return "바나나"
}

async function pickFruits(){
    // return getApple().then(apple=>{
    //     return getBanana().then(banana=>`${apple}+${banana}`)
    // }) 
    //this is only for async

    // const apple= await getApple()
    // const banana=await getBanana()
    // return `${apple}+${banana}`
    //병렬구조가 적용 안된 await, 실행하는 데 2초가 걸린다.

    const applePromise = getApple()
    const bananaPromise = getBanana()
    const apple= await applePromise
    const banana=await bananaPromise
    return `${apple} + ${banana}`
    //서로 동시에 불러와도 될 경우 병렬구조를 적용한다.
}

pickFruits().then(console.log)

//3.useful APIs
function pickAllFruits(){
    return Promise.all([getApple(),getBanana()]).then(fruits=>
        fruits.join(' + ')
    )
}
pickAllFruits().then(console.log)

function pickOnlyOne(){
    return Promise.race([getApple(),getBanana()])
}
pickOnlyOne().then(console.log)