let someValue:any=5;
//아무타입이나 가능
someValue='hello'
someValue=true
type StrOrNum=number|string
//유니언타입을 타입앨리어시스로 묶어준 것

let price:StrOrNum=5
price='free'

let itemPrice:number
const setItemPrice=(price:StrOrNum):void{
    if(typeof price==='string'){
        itemPrice=0
    }else{
        itemPrice=price
    //타입 가드
    //number으로 지정된 itemprice에 price가 무엇이 올지 모르기 때문에 typeof를 사용해주어 에러를 방지해준다
    }
}
