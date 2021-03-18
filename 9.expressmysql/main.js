const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')
const path = require('path')
const mysql = require('mysql')
const express =require('express')

const template = {
    HTML: function (title, list, body, control) {
        return `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>
      `
    }, 
    list: function (topics) {
        let list = '<ul>'
        let i = 0
        while (i < topics.length) {
            list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`
            i = i + 1
        }
        list = list + '</ul>'
        return list
    },
     authorSelect: function (authors, author_id) {
        let tag = ''
        let i = 0
        while (i < authors.length) {
            let selected = ''
            if (authors[i].id === author_id) {
                selected = ' selected'
            }
            tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`
            i++
        }
        return `
        <select name="author">
          ${tag}
        </select>
      `
    }
}

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '111111',
    database: 'opentutorials'
})
db.connect()

const app = http.createServer(function (request, response) {
    const _url = request.url
    const queryData = url.parse(_url, true).query
    const pathname = url.parse(_url, true).pathname
    if (pathname === '/') {
        if (queryData.id === undefined) {
            db.query(`SELECT * FROM topic`, function (error, topics) {
                const title = 'Welcome'
                const description = 'Hello, Node.js'
                let list = template.list(topics)
                const html = template.HTML(title, list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`
                )
                response.writeHead(200)
                response.end(html)
            })
        } else {
            db.query(`SELECT * FROM topic`, function (error, topics) {
                if (error) {
                    throw error
                }
                db.query(`SELECT * FROM topic LEFT JOIN author ON topic.author_id=author.id WHERE topic.id=?`, [queryData.id], function (error2, topic) {
                    if (error2) {
                        throw error2
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
                        <a href="/update?id=${queryData.id}">update</a>
                        <form action="delete_process" method="post">
                        <input type="hidden" name="id" value="${queryData.id}">
                        <input type="submit" value="delete">
                        </form>
                        `
                    )
                    response.writeHead(200)
                    response.end(html)
                })
            })
        }
    } else if (pathname === '/create') {
        db.query(`SELECT * FROM topic`, function (error, topics) {
            db.query('SELECT * FROM author', function (error2, authors) {
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
                response.writeHead(200)
                response.end(html)
            })
        })
    } else if (pathname === '/create_process') {
        let body = ''
        request.on('data', function (data) {
            body = body + data
        })
        request.on('end', function () {
            const post = qs.parse(body)
            db.query(`
                INSERT INTO topic (title, description, created, author_id) 
                  VALUES(?, ?, NOW(), ?)`,
                [post.title, post.description, post.author],
                function (error, result) {
                    if (error) {
                        throw error
                    }
                    response.writeHead(302, { Location: `/?id=${result.insertId}` })
                    response.end()
                }
            )
        })
    } else if (pathname === '/update') {
        db.query('SELECT * FROM topic', function (error, topics) {
            if (error) {
                throw error
            }
            db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function (error2, topic) {
                if (error2) {
                    throw error2
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
                    response.writeHead(200)
                    response.end(html)
                })

            })
        })
    } else if (pathname === '/update_process') {
        let body = ''
        request.on('data', function (data) {
            body = body + data
        })
        request.on('end', function () {
            const post = qs.parse(body)
            db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?', [post.title, post.description, post.author, post.id], function (error, result) {
                response.writeHead(302, { Location: `/?id=${post.id}` })
                response.end()
            })
        })
    } else if (pathname === '/delete_process') {
        let body = ''
        request.on('data', function (data) {
            body = body + data
        })
        request.on('end', function () {
            const post = qs.parse(body)
            db.query('DELETE FROM topic WHERE id = ?', [post.id], function (error, result) {
                if (error) {
                    throw error
                }
                response.writeHead(302, { Location: `/` })
                response.end()
            })
        })
    } else {
        response.writeHead(404)
        response.end('Not found')
    }
})
app.listen(3000)