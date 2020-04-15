import React, {Component} from 'react';
import moment from 'moment'
import {connect} from 'react-redux'
import {removeMember} from '../../store/actions/postActions'

import firebase from 'firebase'
const CipherJS = require('cipherjs');

class PostSummary extends Component {

    state = {
    title: '',
    content: '',
    group:''
    }

    removeMember = (e) => {
    //this.props.removeMember(this.state)
    
    this.setState(
        {
        groupID: this.props.list.id,
        member: e.target.id

        },
        () => {
        this.props.removeMember(this.state)
        });
        
    }

    render(){
        console.log(this.props)
        var isMember = false;
        var cipherKey='k';
        const email = this.props.email
        console.log('email',email)
        /*
        for(var i =0;i<this.props.groups.length;i++){
            if(this.props.post.group == this.props.groups[i].groupName && this.props.groups[i].members.includes(email)){
                isMember=true;
                cipherKey=this.props.groups[i].groupKey;
            }
        }

        const decipher = CipherJS.Vigenere.decrypt(this.props.post.content,cipherKey);
    */
    console.log(this.props);
        return (
            <div className="card post-summary">
                <div className="card-content">
                    <span className="card-title">{this.props.post.title}</span>
                    <p>{this.props.post.content}</p>
                {/*{isMember ? <p>{decipher}</p> : <p>{this.props.post.content}</p>}*/}
                </div>
                <div className="card-action teal lighten-5 grey-text">
                    <div>Posted by {this.props.post.authorFirstName} {this.props.post.authorLastName}, {this.props.post.group}</div>
                    <div>{moment(this.props.post.createdAt.toDate()).calendar()}</div>
                </div>
            </div>
        )

    }
}

const mapDispatchToProps = (dispatch) => {
    return{
      removeMember: (group) => dispatch(removeMember(group))
    }
  }
  
  export default connect(null, mapDispatchToProps)(PostSummary) 