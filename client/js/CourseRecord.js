import React from 'react';
import moment from 'moment';

import * as CourseService from './services/CourseService';

import {RecordHeader, HeaderField} from './components/PageHeader';
import { browserHistory } from 'react-router';
import CourseView from './CourseView';
import CourseEnrollmentCard from './CourseEnrollmentCard';

export default React.createClass({

    getInitialState() {
        return {course:{}};
    },

    componentDidMount() {
        this.getCourse(this.props.params.courseId);
    },

    componentWillReceiveProps(props) {
        this.getCourse(props.params.courseId);
    },

    getCourse(id) {
        CourseService.findById(id).then(course => this.setState({course}));
    },

    deleteHandler() {
        CourseService.deleteItem(this.state.course.code).then(() => browserHistory.goBack());
    },

    editHandler() {
        window.location.hash = "#course/" + this.state.course.code + "/edit";
    },

    render() {
        return (
            <div>
                <RecordHeader type="Course"
                              icon="orders"
                              title={this.state.course.name}
                              onEdit={sessionStorage.pos=="teacher"?this.editHandler:null}
                              onDelete={sessionStorage.pos=="teacher"?this.deleteHandler:null}>
                    <HeaderField label="Code" value={this.state.course.code}/>
                    <HeaderField label="Period" value={this.state.course.period_name}/>
                </RecordHeader>

                {React.cloneElement(this.props.children, {course: this.state.course})}

            </div>
        );
    }
});