const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));


let tweets = [
    {
        id: uuid(),
        username: 'charlie23',
        tweet: 'wow! what is this!'
    },
    {
        id: uuid(),
        username: 'jackl0re',
        tweet: 'crazy night wot wots'
    },
    {
        id: uuid(),
        username: 'franku',
        tweet: 'can i hava pizza plis'
    }
]
app.listen(8080, () => {
    console.log('Listening on port 8080');
})
//R
app.get('/tweets', (req, res) => {
    res.render('tweets/index', { tweets });
})

//C
app.post('/tweets', (req, res) => {
    // console.log(req.body);
    const { username, tweet } = req.body;
    tweets.push({ id: uuid(), username, tweet });
    res.redirect('/tweets');
})

//C
app.get('/tweets/new', (req, res) => {
    res.render('tweets/new');
})

//R
app.get('/tweets/:id', (req, res) => { //an id can be anything so it hits it as /tweets/new
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/details', { tweet });
})

//U
app.patch('/tweets/:id', (req, res) => {
    const { id } = req.params;
    const { tweet } = req.body;
    const oldTweet = tweets.find(t => t.id === id);
    oldTweet.tweet = tweet;
    res.redirect('/tweets');
})
//U
app.get('/tweets/:id/edit', (req, res) => {
    const { id } = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/edit', { tweet });
})

//D
app.delete('/tweets/:id', (req, res) => {
    const { id } = req.params;
    const newTweets = tweets.filter(t => t.id !== id);
    tweets = newTweets;
    // res.redirect('/tweets');
})


