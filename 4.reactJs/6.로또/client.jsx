const React=require('react')
const ReactDOM=require('react-dom')
const {hot}=require('react-hot-loader/root')

const Lottohooks=require('./Lottohooks')
const Hot=hot(Lottohooks)

ReactDOM.render(<Hot/>,document.querySelector('#root'))