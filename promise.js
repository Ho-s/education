//1.producer
//when new Promis is created, the executor runs automatically.
const promise=new Promise((resolve, reject)=>{
    //doing some heavy work(network, read files)
    setTimeout(()=>{
        resolve('ellie')
        reject(new Error('no network'))
    },2000)
})

//2.consumers: then, chtch, finally
promise
    .then((value)=>{
        console.log(value)
    })
    .catch(error=>{
        console.log(error)
    })
    .finally(()=>{
        console.log('finally')
    }) //성공하든 실패하든 상관없이 무조건 실행

//3.promise chaining
const fetchNumber = new Promise((resolve,reject)=>{
    setTimeout(()=> resolve(1),1000)
})

fetchNumber
    .then(num=>num*2)
    .then(num=>num*3)
    .then(num=>{
        return new Promise((resolve,reject)=>{
            setTimeout(()=>resolve(num-1),1000)
        })
    })
    .then(num=>console.log(num))

//4.error handling
// const getHen =()=>
//     new Promise((resolve,reject)=>{
//         setTimeout(()=>resolve('닭'),1000)
//     })
// const getEgg= hen =>
//     new Promise((resolve,reject)=>{
//         setTimeout(()=>resolve(`${hen}=>달걀`),1000)
//     })
// const cook= egg =>
//     new Promise((resolve,reject)=>{
//         setTimeout(()=>resolve(`${egg}=>후라이`),1000)
//     })
    
// getHen()
//     .then(hen=>getEgg(hen))
//     .then(egg=>cook(egg))
//     .then(meal=>console.log(meal))

const getHen =()=>
    new Promise((resolve,reject)=>{
        setTimeout(()=>resolve('닭'),1000)
    })
const getEgg= hen =>
    new Promise((resolve,reject)=>{
        setTimeout(()=>reject(`error!${hen}=>달걀`),1000)
    })
const cook= egg =>
    new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(`${egg}=>후라이`),1000)
    })
    
getHen()
    .then(hen=>getEgg(hen))
    .catch(error=>{
        return '빵'
    })
    .then(egg=>cook(egg))
    .then(meal=>console.log(meal))