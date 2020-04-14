import React, { Component } from 'react'
import logo from './secureLogo.png'
import './authStyle.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { signUp } from '../../store/actions/authActions'
import {firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        groupName:''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signUp(this.state)
        //this.props.signUpGroup(this.state)
        this.props.history.push('/');
    }
    render() {
        const {auth, authError } = this.props;
        if(auth.uid) return <Redirect to="/"/>
        return (
            <div className="row container">
                <div className="col s6 pic" >
                    <img src={logo} alt="logo" height="250" width="230"/>
                </div>
                <div className="col s6 ">
                    <form onSubmit={this.handleSubmit} className="white">
                        <h5 className="grey-text text-darken-3">Sign Up</h5>
                        <div className="input-field">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="groupName">Group</label>
                            <input type="text" id="groupName" onChange={this.handleChange}/>
                        </div>
                        <div className="input-field">
                            <button className="btn">Sign Up</button>
                            <div className="red-text center">
                                {authError 
                                    ? <p>{authError}</p> 
                                    : null
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = dispatch => ({
        signUp: (newUser, firebase) => dispatch(signUp(newUser, firebase))
});

export default compose(
    firebaseConnect(),
    connect (mapStateToProps, mapDispatchToProps)
)(SignUp)
