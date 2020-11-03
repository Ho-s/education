const path=require('path')
const webpack = require('webpack')

module.exports={
    mode: 'development', //실서바스:production
    devtool: 'eval', //hidden-source-map

    resolve:{
        extensions:['.js','.jsx']//entry에서 확장자명을 쓰지 않아도 되도록 설정
    },

    entry:{
        app: ['./client']//,'./wordRelay.jsx'] client.jsx에서 wordRelay를 불러 왔기 때문에 굳이 여기서 안 불러와줘도 된다.
    }, //입력

    module:{
        rules:[{
            test:/\.jsx?$/,
            loader:'babel-loader',
            options:{
                presets:[
                    ['@babel/preset-env',{
                        targets:{
                            browsers:['>2% in KR']
                        }
                    }],
                    '@babel/preset-react'
                ]
            }
        }]
    }, //entry와 output을 연결해주는 거
    plugins:[
        new webpack.LoaderOptionsPlugin({debug:true})
    ],
    output:{
        path:path.join(__dirname,'dist'),
        filename:'app.js'
    }, //출력
}