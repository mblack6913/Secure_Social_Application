import React, { Component } from 'react'
import {connect} from 'react-redux'
import {acceptRequest, 
        rejectRequest, 
        addMemberRequest} 
    from '../../store/actions/postActions'




class RequestsList extends Component {
  state = {
    title: '',
    content: '',
    group:''
  }

  rejectRequest = (e) => {
    //this.props.removeMember(this.state)
    this.setState({
        groupID:this.props.list.id,
        member: e.target.id
    },() => {
        this.props.rejectRequest(this.state)
    });
  }
  
  acceptRequest = (e) => {
    this.setState({
        groupID:this.props.list.id,
        member: e.target.id
    },() => {
        this.props.acceptRequest(this.state)
        this.props.rejectRequest(this.state)
    });
  
  }
  
  render() {
        const reqs = this.props.list.requests;
        //console.log(this.props);
        return(
            <div>
                { reqs.map(request => { return(
                    <div>
                        <h5>{request}</h5>
                        <div className ="text-green">
                            <a id ={request} onClick={this.acceptRequest}> Accept</a>
                        </div>
                        <div className ="text-red">
                            <a id ={request} onClick={this.rejectRequest}> Reject</a>
                        </div> 
                    </div>
                )})}
            </div>
        )
    }   
}

const mapDispatchToProps = (dispatch) => {
  return{
    acceptRequest: (group) => dispatch(acceptRequest(group)),
    rejectRequest: (group) => dispatch(rejectRequest(group))
  }
}

export default connect(null, mapDispatchToProps)(RequestsList)


            