import React from 'react';

const CreatePost = (props) => {
    return(
        <div className="CreatePost">
            <form onSubmit={ props.onSubmit }>
                <input className="post-field" type="text" placeholder="Write a new post" value={ props.value } onChange={ props.onChange } />
                <input className="post-btn" type="submit" value="Publish"/>
            </form>
        </div>
    )
}

export default CreatePost;