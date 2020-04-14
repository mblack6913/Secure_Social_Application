import React, { Component } from 'react';
import GroupsList from './GroupsList';
import CreateGroup from './CreateGroup';

class GroupsPage extends Component{
    render(){
        return (
            <div className="GroupsPage container">
                <div className="row">
                <div className="col s6">
                        <CreateGroup/>
                    </div>
                    <div className="col s6">
                        <GroupsList/>
                    </div>
                </div>
            </div>
        )
    }
}

export default GroupsPage;