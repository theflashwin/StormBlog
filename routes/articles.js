const express = require('express')
const Article = require('./../models/article')
const router = express.Router()


router.get('/new', async (req, res) => {
    res.render('articles/new', {article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})

router.get('/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) res.redirect('/st0rmadminviewsomerandomsecuitycode')
    res.render('articles/show', {article: article})
})

router.get('/admin/:slug', async (req, res) => {
    const article = await Article.findOne({slug: req.params.slug})
    if(article == null) res.redirect('/st0rmadminviewsomerandomsecuitycode')
    res.render('articles/showadmin', {article: article})
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

// delete
router.post('/:id', async (req, res) => {
    const articleID = req.params.id.toString().trim();
    await Article.findByIdAndDelete(articleID)
    res.redirect('/st0rmadminviewsomerandomsecuitycode')
})

router.post('/edit/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title,
        article.date = Date.now(),
        article.description = req.body.description,
        article.markdown = req.body.markdown,
        article.image = req.body.image

    try {
    article = await article.save()
    res.redirect(`/articles/st0rmadminviewsomerandomsecuitycode`)
    } catch (e) {
        res.render(`articles/${path}`, {article: article})
    }
    }
}

module.exports = router