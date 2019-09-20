const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { validateRegister, validateLogin } = require('../validation');

router.route('/register').post( async (req, res ) => {
    const { error } = validateRegister(req.body);
    if( error ){
        return res.status(400).json(`Error: ${ error }`);
    }
    const username_taken = await User.findOne({ username: req.body.username });
    if( username_taken ){
        return res.status(400).json('Username is taken.');
    }
    const email_taken = await User.findOne({ email: req.body.email });
    if( email_taken ){
        return res.status(400).json(`Error: Email already in use.`);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({ 
        username:req.body.username, 
        email: req.body.email,
        password : hashedPassword
    })
    user.save()
        .then( () => res.json(`New user added: ${ user.username }`))
        .catch( err => res.status(400).json(`Error: ${ err }`) )            
})

router.route('/login').post( async (req, res) => {
    const { error } = validateLogin(req.body);
    if( error ){
        return res.status(400).json(`${ error }`);
    } 
    const user = await User.findOne({ username: req.body.username });
    if( !user ){
        return res.status(418).json('Username or Password is Incorrect.');
    }
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if( !validPass){
        return res.status(418).json('Username or Password is Incorrect');
    }
    const token = jwt.sign({ _id: user._id, username: user.username }, process.env.TOKEN_SECRET );
    try{
        console.log(`   User: ${user.username}, connected successfully:`,"\x1b[32m",`Access Granted`,"\x1b[37m");
        res.header('auth-token', token).send(token);
    }
    catch(err){
        res.status(400).send(`Error: ${ err }`);
    }
})

module.exports = router;