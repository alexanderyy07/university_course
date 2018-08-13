import React from 'react';

import * as CourseService from './services/CourseService';
import * as PeriodService from './services/PeriodService';
import * as TeacherService from './services/TeacherService';
import * as HomeworkService from './services/HomeworkService';

import ComboBox from './components/ComboBox';

export default React.createClass({

    getInitialState() {
        return {homework:{ course_id : this.props.cid, course_code: this.props.ccode}, periods:[], teachers:[]};
    },

    componentWillReceiveProps(props) {
        let homework = props.homework;
        this.setState({homework});
    },

    componentDidMount() {
        PeriodService.findAll().then(periods => this.setState({periods}));
        TeacherService.findAll().then(teachers => this.setState({teachers}));
    },

    titleChangeHandler(event) {
        let homework = this.state.homework;
        homework.title = event.target.value;
        this.setState({homework});
    },

    detailsChangeHandler(event) {
        let homework = this.state.homework;
        homework.details = event.target.value;
        this.setState({homework});
    },

    save() {
        let saveItem = this.state.homework.id ? HomeworkService.updateItem : HomeworkService.createItem;
        saveItem(this.state.homework).then(savedhomework => {
            if (this.props.onSaved) this.props.onSaved(savedhomework);
        });
    },

    render() {
        let homework = this.state.homework;
        return (
            <div className="slds-form--stacked slds-grid slds-wrap">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-1">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Title</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={homework.title} onChange={this.titleChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Details</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={homework.details} onChange={this.detailsChangeHandler}/>
                        </div>
                    </div>
                </div>
                {/* <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Code</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={course.code} onChange={this.codeChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Name</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={course.name} onChange={this.nameChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Teacher</label>
                        <div className="slds-form-element__control">
                            <ComboBox data={this.state.teachers} value={course.teacher_id} onChange={this.teacherChangeHandler}/>
                        </div>
                    </div>
                </div>
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Period</label>
                        <div className="slds-form-element__control">
                            <ComboBox data={this.state.periods} value={course.period_id} onChange={this.periodChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Credits</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={course.credits} onChange={this.creditsChangeHandler}/>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }

});