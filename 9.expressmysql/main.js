// const qs = require('querystring')
const path = require('path')
const express = require('express')
const app=express()
const bodyParser=require('body-parser')
const compression = require('compression');
const template = require('./template')
const db = require('./db')
const helmet=require('helmet')

db.connect()

app.use(bodyParser.urlencoded({extended:false}))
app.use(compression())
app.use(helmet())

app.get('/',(req,res)=>{
    if(req.query.id===undefined){
        db.query(`SELECT * FROM topic`, function (error, topics) {
            if(error){
                throw error
            }
            const title = 'Welcome'
            const description = 'Hello, Node.js'
            let list = template.list(topics)
            const html = template.HTML(title, list,
                `<h2>${title}</h2>${description}`,
                `<a href="/create">create</a>`
            )
            res.send(html)
        })
    }else{
        db.query(`SELECT * FROM topic`, function (error, topics) {
            if (error) {
                throw error
            }
            db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`, [req.query.id], function (err, topic) {
                if (err) {
                    throw err
                }
                const title = topic[0].title
                const description = topic[0].description
                let list = template.list(topics)
                const html = template.HTML(title, list,
                    `
                        <h2>${title}</h2>
                        ${description}
                        <p>by ${topic[0].name}</p>
                    `,
                    ` <a href="/create">create</a>
                    <a href="/update?id=${req.query.id}">update</a>
                    <form action="delete_process" method="post">
                    <input type="hidden" name="id" value="${req.query.id}">
                    <input type="submit" value="delete">
                    </form>
                    `
                )
                res.send(html)
            })
        })
    }
})

app.get('/create',(req,res)=>{
    db.query(`SELECT * FROM topic`, function (error, topics) {
        if(error){
            throw error
        }
        db.query('SELECT * FROM author', function (err, authors) {
            if(err){
                throw err
            }
            const title = 'Create'
            let list = template.list(topics)
            const html = template.HTML(title, list,
                `
            <form action="/create_process" method="post">
              <p><input type="text" name="title" placeholder="title"></p>
              <p>
                <textarea name="description" placeholder="description"></textarea>
              </p>
              <p>
                ${template.authorSelect(authors)}
              </p>
              <p>
                <input type="submit">
              </p>
            </form>
            `,
                `<a href="/create">create</a>`
            )
            res.send(html)
        })
    })
})

app.post('/create_process',(req,res)=>{
    // let body = ''
    // req.on('data', function (data) {
    //     body = body + data
    // })
    // req.on('end', function () {

        // const post = qs.parse(body)
        const post=req.body
        db.query(`
            INSERT INTO topic (title, description, created, author_id) 
              VALUES(?, ?, NOW(), ?)`,
            [post.title, post.description, post.author],
            function (error, result) {
                if (error) {
                    throw error
                }
                res.redirect(`/?id=${result.insertId}`);
            }
        )
    // })
})

app.get('/update',(req,res)=>{
    db.query('SELECT * FROM topic', function (error, topics) {
        if (error) {
            throw error
        }
        db.query(`SELECT * FROM topic WHERE id=?`, [req.query.id], function (err, topic) {
            if (err) {
                throw err
            }
            db.query('SELECT * FROM author', function (error2, authors) {
                let list = template.list(topics)
                const html = template.HTML(topic[0].title, list,
                    `
              <form action="/update_process" method="post">
                <input type="hidden" name="id" value="${topic[0].id}">
                <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
                <p>
                  <textarea name="description" placeholder="description">${topic[0].description}</textarea>
                </p>
                <p>
                  ${template.authorSelect(authors, topic[0].author_id)}
                </p>
                <p>
                  <input type="submit">
                </p>
              </form>
              `,
                    `<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
                )
                res.send(html)
            })
        })
    })
})

app.post('/update_process',(req,res)=>{
    // let body = ''
    // req.on('data', function (data) {
    //     body = body + data
    // })
    // req.on('end', function () {
        // const post = qs.parse(body)

        const post=req.body
        db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?', [post.title, post.description, post.author, post.id], function (error, result) {
            if(error){
                throw error
            }
            res.redirect(`/?id=${post.id}`);
        })
    // })
})

app.post('/delete_process',(req,res)=>{
    // let body = ''
    // req.on('data', function (data) {
    //     body = body + data
    // })
    // req.on('end', function () {
        // const post = qs.parse(body)

        const post=req.body
        db.query('DELETE FROM topic WHERE id = ?', [post.id], function (error, result) {
            if (error) {
                throw error
            }
            res.redirect(`/`);
        })
    // })
})

app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})