import React, { Component } from 'react';
import GroupsList from './GroupsList';
import {firestoreConnect} from 'react-redux-firebase'
import {connect} from 'react-redux'
import {compose} from 'redux'
import GroupRequests from './GroupRequests';

class GroupsPage extends Component{
    render(){
        return (
            <div className="GroupsPage container">
                <div className="row">
                    <div className="col s5">
                        <GroupRequests 
                            groups ={this.props.groups} 
                            email={this.props.email}>   
                        </GroupRequests>
                    </div>
                    <div className="col s6 offset-s1">
                        <GroupsList 
                            groups= {this.props.groups} 
                            email={this.props.email}>
                        </GroupsList>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    console.log(state);
    return{
      posts: state.firestore.ordered.posts,
      groups: state.firestore.ordered.groups,
      users: state.firestore.ordered.users,
      email: state.firebase.auth.email
    }
  } 
  export default compose(firestoreConnect(['posts','groups','users']),connect(mapStateToProps))(GroupsPage)