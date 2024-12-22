require('dotenv').config()
const express = require('express')
const config = require('./src/config/config')



const app = express()
// const PORT = process.env.PORT

config(app)

app.get('/blog', async (req, res) => {
    const blogs = await fetch('http://localhost:8080/api/blogs').then(res => res.json())
    res.render('home', { blogs })
})

app.get('/blog/create-blog', async (req, res) => {
    res.render('create.blog.ejs')
})


app.get('/blog/:id', async (req, res) => {
    const blog = await fetch('http://localhost:8080/api/blogs/' + req.params.id).then(res => res.json())
    res.render('detail.blog.ejs', { blog })
})

app.get('/blog/:id/edit', async (req, res) => {
    const blog = await fetch('http://localhost:8080/api/blogs/' + req.params.id).then(res => res.json())
    res.render('edit.blog.ejs', { blog })
})



app.delete('/blog/:id/delete', async (req, res) => {
    const response = await fetch('http://localhost:8080/api/blogs/' + req.params.id, {
        method: 'DELETE',
    });

    if (response.ok) {
        res.json({ success: true });
    } else {
        res.status(500).json({ success: false, message: 'Failed to delete blog' });
    }
});



app.listen(8080, () => {
    console.log(`Example app listening on port 8080`)
})

