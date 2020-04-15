import React, { Component } from 'react';
import PostList from '../posts/PostList';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Feed extends Component{
    render(){
        //console.log(this.props);
        const { posts, auth } = this.props;
        if(!auth.uid) return <Redirect to="/signin"/>

        return (
            <div className="feed container">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <PostList groups={this.props.groups} posts={posts} email={this.props.email}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        posts: state.firestore.ordered.posts,
        groups: state.firestore.ordered.groups,
        email: state.firebase.auth.email,
        auth: state.firebase.auth
    }
}


export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'posts', orderBy: ['createdAt', 'desc']}
    ])
)(Feed)

//export default compose(firestoreConnect(['projects']),connect(mapStateToProps))(Dashboard)