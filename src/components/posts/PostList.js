import React from 'react';
import PostSummary from './PostSummary';

const PostList = ({posts, groups, email}) => {
    return (
        <div className="post-list section">
            {groups && posts && posts.map(post =>{
                return (
                    <PostSummary groups= {groups} post={post} email = {email} key={post.id} />
                )
            })}
        </div>
    )
}

export default PostList;