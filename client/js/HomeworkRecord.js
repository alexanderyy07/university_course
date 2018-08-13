import React from 'react';
import moment from 'moment';

import * as HomeworkService from './services/HomeworkService';

import {RecordHeader, HeaderField} from './components/PageHeader';

import HomeworkView from './HomeworkView';
// import HomeworkEnrollmentCard from './HomeworkEnrollmentCard';

export default React.createClass({

    getInitialState() {
        return {homework:{}};
    },

    componentDidMount() {
        console.log(params);
        this.getHomework(this.props.params.homeworkId);
    },

    componentWillReceiveProps(props) {
        this.getHomework(props.params.homeworkId);
    },

    getHomework(id) {
        HomeworkService.findById(id).then(homework => this.setState({homework}));
    },

    deleteHandler() {
        HomeworkService.deleteItem(this.state.homework.id).then(() => window.location.hash = "homeworks");
    },

    editHandler() {
        window.location.hash = "#homework/" + this.state.homework.id + "/edit";
    },

    render() {
        return (
            <div>
                <RecordHeader type="Homework"
                              icon="report"
                              title={this.state.homework.title}
                              onEdit={sessionStorage.pos=="teacher"?this.editHandler:null}
                              onDelete={sessionStorage.pos=="teacher"?this.deleteHandler:null}>
                    <HeaderField label="Details" value={this.state.homework.details}/>
                    {/* <HeaderField label="Course" value={this.state.homework.course_name}/> */}
                </RecordHeader>

                {React.cloneElement(this.props.children, {homework: this.state.homework})}

            </div>
        );
    }
});