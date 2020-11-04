const { createRef } = require('react');
const React=require('react');
const{ PureComponent }=React;
const Try=require('./Try')

getNumbers=()=>{
    let shuffle=[]
    const candidate=[0,1,2,3,4,5,6,7,8,9]
    for(let i=0;i<10;i++){
        const index=Math.floor(Math.random()*(10-i))
        shuffle.push(candidate[index])
        candidate.splice(index,1)
    }
    let answer=shuffle.slice(0,4)
    return answer
}

class NumberBaseball extends PureComponent{

    state={
        result:'',
        value:'',
        answer:getNumbers(),
        tries:[] //react 배열에 push쓰면 안돼
    }

    onChange=(e)=>{
        this.setState({value:e.target.value})
    }

    onSubmit = (e) => {
        const { value, tries, answer } = this.state;
        e.preventDefault();
        this.inputRef.current.focus();
        if (value === answer.join('')) {
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: value, result: '홈런!' }],
                }
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
        } else { // 답 틀렸으면
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if (tries.length >= 9) { // 10번 이상 틀렸을 때
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            });
            } else {
            for (let i = 0; i < 4; i += 1) {
                if (answerArray[i] === answer[i]) {
                    strike += 1;
                } else if (answer.includes(answerArray[i])) {
                    ball += 1;
                }
            }
            this.setState((prevState) => {
                return {
                    tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                    value: '',
                };
            });
            }
        }
    };

    inputRef= createRef() //ref 초기화하는 데 쓰임

    render(){
        return(
            <>
                <h1>{this.state.result}</h1>
                <form type='submit' onSubmit={this.onSubmit}>
                    <input ref={this.inputRef} maxLength={4} value={this.state.value} onChange={this.onChange}></input>
                    <button type='submit'>입력</button>
                </form>
                <div>시도:{this.state.tries.length}</div>
                <ul>
                    {/* {[['bitch','stg'],['ass','stg'],['sth','stg'],['sole','stg'],['like','stg']].map((v)=>{
                        return(
                            <li key={v[0]+v[1]}>{v[0]}-{v[1]}</li> //key는 고유하게 설정 거기에 i를 쓰지마라 성능 최적화 할 때 문제가 돼 i는 위치
                        )
                    })}  */}
                    {this.state.tries.map((v,i)=>{
                        return(
                            <Try key={i} tryInfo={v}></Try> //value={v} 이런 걸 props라고 한다 html에서는 이걸 attribute라고 하고,
                        )}
                    )}
                </ul>
            </>
        )
    }
}

module.exports=NumberBaseball