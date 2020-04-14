import React from 'react';
import moment from 'moment'

const PostSummary = ({post}) => {
    if (post){
        return (
            <div className="card post-summary">
                <div className="card">
                    <div className="card-content">
                        <span className="card-title">{post.title}</span>
                        <p>{post.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 grey-text">
                        <div>Posted by {post.authorFirstName} {post.authorLastName}</div>
                        <div>{moment(post.createdAt.toDate()).calendar()}</div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="container center">
                <p>loading posts...</p>
            </div>
        )
    }
}

export default PostSummary;