import React from 'react';
import DataGrid from './components/DataGrid';

import * as TeacherService from './services/TeacherService';

import {Icon, ButtonIcon} from './components/Icons';

export default React.createClass({

    linkHandler(teacher) {
        window.location.hash = "#teacher/" + teacher.id;
    },

    actionHandler(data, value, label) {
        if (value === 0) {
            this.props.onApprove(data);
        } else if (value === 1) {
            this.props.onDelete(data);
        }
    },

    render() {
        return (
            <DataGrid data={this.props.teachers} actions={["Approve", "Delete"]} onAction={this.actionHandler}>
                <div header="Name" field="name" onLink={this.linkHandler}/>
                <div header="Email Address" field="email"/>
                <div header="Approved" field="approved"/>
            </DataGrid>
        );
    }

});