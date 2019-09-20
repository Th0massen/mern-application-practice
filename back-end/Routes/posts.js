const router = require('express').Router();
const Post = require('../models/post.model');

router.route('/').get( (req, res) => {
    Post.find().sort(({_id: -1}))
        .then( post => res.json(post))
        .catch( err => res.status(400).json(`Error: ${ err }`));
})

router.route('/add').post( (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const date = Date.now();
    const post = new Post({username, description, date});
    post.save()
        .then( ()=>{ 
            res.json('Post was published'); 
            console.log('   New post published by ' + req.body.username) 
        })
        .catch( err => { res.status(400).json(`Error: ${ err }`)})
})

router.route('/:id').get( (req, res) => {
    Post.findById( req.params.id )
        .then( post => res.json(post))
        .catch( err => res.status(400).json(`Error: ${ err }`))
})

router.route('/:id').delete( (req, res) => {
    Post.findByIdAndDelete( req.params.id )
        .then( () => res.json('Post has been removed'))
        .catch( err => res.status(400).json(`Error: ${ err }`))
})

router.route('/update/:id').post( (req, res) => {
    Post.findById( req.params.id )
    .then( post => {
        post.username = post.username;
        post.description = req.body.description;
        post.save()
            .then( () => res.json('Post was updated') )
            .catch( err => res.status(400).json(`Error: ${ err }`))
    })
    .catch( err => res.status(400).json(`Error: ${ err }`))
})

module.exports = router;