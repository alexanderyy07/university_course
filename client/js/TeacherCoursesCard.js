import React from 'react';

import * as CourseService from './services/CourseService';

import DataGrid from './components/DataGrid';
import {Icon, ButtonIcon} from './components/Icons';
import CourseFormWindow from './CourseFormWindow';

export default React.createClass({

    getInitialState() {
        return {courses:[]};
    },

    componentWillReceiveProps(props) {
        this.getCourses({teacher_id: props.teacher.id, university_id: props.teacher.university_id});
    },

    viewAllHandler(event) {
        this.getCourses({teacher_id: this.props.teacher.id, university_id: this.props.teacher.university_id});
        event.preventDefault();
    },

    getCourses(teacherId, queryParams) {
        if (teacherId) {
            CourseService.findByTeacher(teacherId, queryParams).then(courses => this.setState({courses}));
        }
    },

    courseLinkHandler(course) {
        window.location.hash = "#course/" + course.code;
    },

    newCourseHandler() {
        this.setState({addingCourse:true});
    },

    newCourseCancelHandler() {
        this.setState({addingCourse:false});
    },

    newCourseSavedHandler(course) {
        this.setState({addingCourse:false});
        this.getCourses({teacher_id: this.props.teacher.id, university_id: this.props.teacher.university_id});
    },

    render() {
        return (
            <div className="slds-card">
                <header className="slds-card__header slds-grid">
                    <div className="slds-media slds-media--center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon name="topic" size="small"/>
                        </div>
                        <div className="slds-media__body">
                            <h3 className="slds-text-heading--small slds-truncate">Courses</h3>
                        </div>
                    </div>
                    <div className="slds-no-flex">
                        <div className="slds-button-group">
                            <button className="slds-button slds-button--neutral slds-button--small" onClick={this.newCourseHandler}>New</button>
                            <button className="slds-button slds-button--icon-border-filled">
                                <ButtonIcon name="down"/>
                                <span className="slds-assistive-text">Show More</span>
                            </button>
                        </div>
                    </div>
                </header>

                <section className="slds-card__body">
                    <DataGrid data={this.state.courses} keyField="id">
                        <div header="Period" field="period_name" sortable={true}/>
                        {/* <div header="ID" field="id" sortable={true} onLink={this.courseLinkHandler}/> */}
                        <div header="Name" field="name" sortable={true} onLink={this.courseLinkHandler}/>
                    </DataGrid>
                </section>

                {this.state.addingCourse?<CourseFormWindow tid={this.props.teacher.id} uid={this.props.teacher.university_id} onSaved={this.newCourseSavedHandler} onCancel={this.newCourseCancelHandler}/>:null}
            </div>
        );
    }

});