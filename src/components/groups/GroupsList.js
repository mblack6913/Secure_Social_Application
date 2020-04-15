import React, {Component} from 'react';
import {connect} from 'react-redux'
import {removeMember, 
        addMember, 
        addMemberRequest
    } from '../../store/actions/postActions'

class GroupsList extends Component {
    state = {
        title: '',
        content: '',
        group:''
    }

    memberPressed = (e) => {
    console.log(this.state);
    //this.props.removeMember(this.state)
    this.setState({
        groupID:e.target.id,
        member: this.props.email
        },
        () => {this.props.removeMember(this.state)});
    }
    
    nonMemberPressed = (e) => {
    this.setState(
        {
        groupID:e.target.id,
        member: this.props.email
        },
        () => {this.props.addMemberRequest(this.state)});
    
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
        return (
            <div className="groups-list section">
                <h3 className="grey-text center">Groups</h3>
                <div className="divider"></div>
                {this.props.groups && this.props.groups.map(group =>{ return(
                    <div>
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">{group.groupName}</span>
                                <p className="grey-text lighten-1">Members:</p>
                               
                                { group.members.map(member =>{ return(
                                <p>{member}</p>
                                    
                                )})}
                               
                                {
                                    group.members && group.members.includes(this.props.email) 
                                    ? <a id ={group.id} onClick={this.memberPressed}>Member</a> 
                                    : group.requests && group.requests.includes(this.props.email) 
                                    ? <a id ={group.id} onClick={this.nonMemberPressed}>Requested</a>
                                    :<a id ={group.id} onClick={this.nonMemberPressed}>Not Member</a>
                                }
                            </div>
                            {/*<div className="card-action grey-text">
                                <div>Created by MB | 12th April, 7am</div>
                            </div>*/}
                        </div>
                    </div>
                )})}
            </div>
        )
    }
    
}

const mapDispatchToProps = (dispatch) => {
    return{
      removeMember: (group) => dispatch(removeMember(group)),
      addMemberRequest: (group) => dispatch(addMemberRequest(group))
    }
  }
  
  export default connect(null, mapDispatchToProps)(GroupsList)

        