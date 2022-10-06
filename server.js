const express = require('express')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const {Aggregate} = require('mongoose')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/blogtest')

app.use(express.urlencoded({ extended: false }))
app.use('/articles', articleRouter)
app.use('/public', express.static('public'));
app.use(methodOverride('_method'))

app.set('view engine', 'ejs')

app.get('/st0rmadminviewsomerandomsecuitycode', async (req, res) => {
    const articles = await Article.find().sort({
        date: 'desc' })
    res.render('articles/adminview', { articles: articles })
})

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({
        date: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.listen(8080)