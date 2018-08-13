import React from 'react';
import DataGrid from './components/DataGrid';

import * as UniversityService from './services/TeacherService';

import {Icon, ButtonIcon} from './components/Icons';

export default React.createClass({

    linkHandler(university) {
        window.location.hash = "#university/" + university.id;
    },

    actionHandler(data, value, label) {
        if (value === 0) {
            this.linkHandler(data);
        } else if (value === 1) {
            this.props.onDelete(data);
        }
    },

    render() {
        return (
            <DataGrid data={this.props.universities} actions={["View", "Delete"]} onAction={this.actionHandler}>
                <div header="Representation Code" field="code" onLink={this.linkHandler}/>
                <div header="University Name" field="name"/>
            </DataGrid>
        );
    }

});