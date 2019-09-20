import React from 'react';

const Post = (props) => {
    return (
        <div className="Post">
            <p className="text">{ props.post.description }</p>
            <hr/>
            <p className="user" data={ props.post.username }>
                Post created by: { props.post.username }
                <br/> 
                Published: {props.post.date}
            </p>
        </div>
    )
}

export default Post;