import React from 'react';

import * as TeacherService from './services/TeacherService';

import {HomeHeader} from './components/PageHeader';
import TeacherList from './TeacherList';
import TeacherFormWindow from './TeacherFormWindow';

export default React.createClass({

    getInitialState() {
        return {teachers: []};
    },

    componentDidMount() {
        TeacherService.findAll().then(teachers => this.setState({teachers}));
    },

    newHandler() {
        this.setState({addingTeacher:true});
    },

    savedHandler(teacher) {
        this.setState({addingTeacher: false});
        window.location.hash = "#teacher/" + teacher.id;
    },

    cancelHandler() {
        this.setState({addingTeacher: false});
    },

    approveHandler(data) {
        data.allowed = 1;
        TeacherService.updateItem(data);
        TeacherService.findAll().then(teachers => this.setState({teachers}));
    },

    deleteHandler(data)
    {
        TeacherService.deleteItem(data.id);
        TeacherService.findAll().then(teachers => this.setState({teachers}));
    },

    render() {
        return (
            <div>
                <HomeHeader type="Teachers"
                            title="Recent Teachers"
                            newLabel="New Teacher"
                            actions={[{value:"new", label:"New Teacher"}]}
                            itemCount={this.state.teachers.length}
                            views={[{id:1, name:"Recent Teachers"}]}
                            viewId="1"
                            onNew={this.newHandler}/>
                <TeacherList teachers={this.state.teachers} onApprove={this.approveHandler} onDelete={this.deleteHandler}/>
                {this.state.addingTeacher?<TeacherFormWindow onSaved={this.savedHandler} onCancel={this.cancelHandler}/>:null}
            </div>
        );
    }

});