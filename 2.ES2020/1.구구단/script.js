function init(){
    document.querySelector("#click").addEventListener("click", ()=> {
        const a=document.querySelector("#first").value;
        const b=document.querySelector("#second").value;
        const r=document.querySelector("#result");
        if(a){ //a의 값이 있으면 이라는 뜻//
            if(b){
                r.textContent= a*b;
            }else{
                r.textContent= "두 번째 값을 입력해주세요.";
            }
        }else{
            r.textContent= "첫 번째 값을 입력해주세요.";
        }
    })
}

init();