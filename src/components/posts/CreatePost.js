import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../store/actions/postActions'
import { Redirect } from 'react-router-dom'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

//import 'bootstrap/dist/css/bootstrap.min.css';


const CipherJS = require('cipherjs');

class CreatePost extends Component {
    state = {
        title: '',
        content: '',
        group:''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
            
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createPost(this.state)
        this.props.history.push('/')
            console.log(this.props.groups.groupName);
       
    }
    /*
        var cipherKey;
        for(var i =0; i<this.props.groups.length;i++){
            if(this.state.group == this.props.groups[i].groupName)
                {cipherKey = this.props.groups[i].groupKey}
        }
        const cipher = CipherJS.Vigenere.encrypt(this.state.content, cipherKey)
        console.log(cipher)
      
        this.setState({
            content: cipher
        },() => {
            console.log(this.state)
            this.props.createPost(this.state)
            this.props.history.push('/');
            });
        }   
    */
    
    render() {
        //route guard
        const { auth } = this.props
        if(!auth.uid) return <Redirect to="/signin"/>

        return (
            <div className="row container ">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">New Post</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Post</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}/>
                    </div>
                    {/*
                    <div className="form-group">
                    <label htmlFor="group">Group</label>
                        <select onChange={this.handleChange} id="group" className="form-control">
                                <option selected>Choose Group</option>
                                
                                { this.props.groups && this.props.groups.map(group =>{ return(
                                
                                group.members && group.members.includes(this.props.email) ? <option>{group.groupName}</option>: null
                                
                                )})}
                                </select>
                        
                        </div> 
                        */}
                    <div className="input-field">
                        <button className="btn">Post</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        groups: state.firestore.ordered.groups
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (post) => dispatch(createPost(post))
    }
}

export default compose(
    firestoreConnect(['posts','groups','users']),
    connect(mapStateToProps, mapDispatchToProps))(CreatePost)
