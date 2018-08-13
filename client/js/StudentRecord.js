import React from 'react';
import moment from 'moment';

import * as StudentService from './services/StudentService';

import {RecordHeader, HeaderField} from './components/PageHeader';

export default React.createClass({

    getInitialState() {
        return {student:{}};
    },

    componentDidMount() {
        console.log(this.props.params);
        this.getStudent(this.props.params.studentId);
    },

    componentWillReceiveProps(props) {
        this.getStudent(props.params.studentId);
    },

    getStudent(id) {
        StudentService.findById(id).then(student => this.setState({student}));
    },

    formatDOB(dob) {
        return dob ? moment(dob).format("l") + ' (' + moment(dob).fromNow() +')' : "";
    },

    deleteHandler() {
        StudentService.deleteItem(this.state.params.studentId).then(() => window.location.hash = "students");
    },

    editHandler() {
        window.location.hash = "#student/" + this.params.studentId + "/edit";
    },

    render() {
        return (
            <div>
                <RecordHeader type="Student" icon="lead"
                              title={this.state.student.name}
                              onEdit={sessionStorage.pos=="student"?this.editHandler:null}
                              onDelete={sessionStorage.pos=="student"?this.deleteHandler:null}
                              onClone={sessionStorage.pos=="student"?this.cloneHandler:null}>
                    {/* <HeaderField label="Date of Birth" value={this.state.student.dob} format={this.formatDOB}/> */}
                    <HeaderField label="Student ID" value={this.state.student.id}/>
                </RecordHeader>

                {React.cloneElement(this.props.children, {student: this.props.params.studentId})}

            </div>
        );
    }
});