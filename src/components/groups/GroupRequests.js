import React, { Component } from 'react'
import RequestsList from './RequestsList'
import '../../index.css'

class GroupRequests extends Component {
    state = {
        title: '',
        content: '',
        group:''
    }
    
    render() {
        return (
            <div className="groups">
                <div className="card requests">
                    <div className="card-content">
                        <span className="card-title">Group Requests</span>
                        { this.props.groups && this.props.groups.map(group => { 
                            return(
                                <div>
                                    { group.requests && group.groupOwner == this.props.email ? 
                                    <RequestsList list={group}></RequestsList> : 
                                    null}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupRequests