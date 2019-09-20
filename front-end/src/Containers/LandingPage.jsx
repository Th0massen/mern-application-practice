import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import CreatePost from '../Components/CreatePost';
import Post from '../Components/PostComponent';

const LandingPage = (props) => {
    const [ user, setUser ] = useState('');
    const [ posts, setPosts ] = useState([]);
    const [ newPostValue, setNewPostValue ] = useState('');
 
    useEffect( ()=>{
        if( localStorage.getItem('auth-token') ){
            const decodedJWT = jwt_decode(localStorage.getItem('auth-token'));
            if( decodedJWT._id === localStorage.getItem('id') ){
                setUser( decodedJWT.username );
                loadContent();
            } else{
                return props.history.push('/login'); 
            }
        } else{
            return props.history.push('/login');        
        }
        // eslint-disable-next-line
    }, []);

    const loadContent = () => {
        const options = {
            headers: { 'auth-token': localStorage.getItem('auth-token') }
        };
        axios.get('http://localhost:7600/posts', options)
            .then( res => {
                setPosts( res.data );
            })
            .catch( err => console.log( err ) )
    }

    const renderContent = () => {
        return posts.map( post => {
            return <Post key={ post._id } post = { post } />
        })
    }

    const onPostChange = (event) => {
        setNewPostValue( event.target.value );
    }

    const onPostSubmit = (event) => {
        event.preventDefault();
        if( newPostValue !== '' ){
            const newPost = { username: user, description: newPostValue };
            const option = {
                headers: { 'auth-token': localStorage.getItem('auth-token') }
            }
            axios.post('http://localhost:7600/posts/add', newPost, option)
                .then( () => {
                    console.log('New post published');
                    loadContent();
                    setNewPostValue('');
                })
                .catch( err => console.log(err) )
        }
    }

    return(
        <div className="LandingPage">
            <p>Landing Page</p>
            <h1>Welcome { user }</h1>
            <CreatePost onSubmit = { onPostSubmit } value = { newPostValue } onChange={ onPostChange }/>
            <div className="Content">
                <p>Posts: </p>
                { renderContent() }
            </div>
        </div>
    )
}

export default LandingPage;