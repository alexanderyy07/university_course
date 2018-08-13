import React from 'react';

import * as HomeworkService from './services/HomeworkService';

import DataGrid from './components/DataGrid';
import StudentSearchBox from './StudentSearchBox';

import HomeworkFormWindow from './HomeworkFormWindow';
import SubmitFormWindow from './SubmitFormWindow';

import {Icon, ButtonIcon} from './components/Icons';

export default React.createClass({

    getInitialState() {
        return {homeworks:[]};
    },

    componentWillReceiveProps(props) {
        this.getHomeworks(props.course.code);
    },

    getHomeworks(courseId) {
        if (courseId) {
            HomeworkService.findAll({courseId}).then(homeworks => this.setState({homeworks}));
        }
    },

    homeworkLinkHandler(homework) {
        window.location.hash = "#homework/" + this.props.course.code + "/" + homework.id ;
    },

    actionHandler(data, index, value, label) {
        switch(label) {
            case "View Homework":
                this.homeworkLinkHandler(data);
                break;
            case "Delete":
                HomeworkService.deleteItem(data.id)
                    .then(() => this.getHomeworks(this.props.course.id));
                break;
            case "Submit":
                this.setState({submitting:true, current: data});
                break;
        }
    },
    studentSelectHandler(index, value, label) {
        HomeworkService.createItem({course_id: this.props.course.id, student_id: value})
            .then(() => this.getHomeworks(this.props.course.id))
            .catch((error) => {
                let event = new CustomEvent('notify', {detail:'You already enrolled in this course'});
                document.dispatchEvent(event);
            });

    },

    newHomeworkHandler() {
        this.setState({addingHomework:true});
    },

    newHomeworkCancelHandler() {
        this.setState({addingHomework:false});
    },

    newHomeworkSavedHandler(Homework) {
        this.setState({addingHomework:false});
        this.getHomeworks(this.props.course.code);
    },
    homeworkSubmittedHandler() {
        this.setState({submitting:false});
    },
    homeworkSubmitCancelHandler() {
        this.setState({submitting:false});
    },

    render() {
        return (
            <div className="slds-card">
                <header className="slds-card__header slds-grid">
                    <div className="slds-media slds-media--center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon name="report" size="small"/>
                        </div>
                        <div className="slds-media__body">
                            <h3 className="slds-text-heading--small slds-truncate">Homework</h3>
                        </div>
                    </div>
                    {/* <div className="slds-no-flex">
                        <StudentSearchBox placeholder="Search to enroll..." onSelect={this.studentSelectHandler}/>
                    </div> */}
                    {
                    sessionStorage.pos=="teacher"?
                    <div className="slds-no-flex">
                        <div className="slds-button-group">
                            <button className="slds-button slds-button--neutral slds-button--small" onClick={this.newHomeworkHandler}>New</button>
                            <button className="slds-button slds-button--icon-border-filled">
                                <ButtonIcon name="down"/>
                                <span className="slds-assistive-text">Show More</span>
                            </button>
                        </div>
                    </div>:
                    null
                    }
                </header>

                <section className="slds-card__body">
                    <DataGrid data={this.state.homeworks} keyField="id" actions={sessionStorage.pos=="teacher"?["View Homework", "Delete"]:["Submit"]} onAction={this.actionHandler}>
                        {/* <div header="Homework Id" field="id" sortable={true} onLink={this.homeworkLinkHandler}/> */}
                        <div header="Title" field="title" sortable={true} onLink={this.homeworkLinkHandler}/>
                        {/* <div header="Last Name" field="last_name" sortable={true} onLink={this.homeworkLinkHandler}/> */}
                        <div header="Details" field="details"/>
                    </DataGrid>
                </section>

                {this.state.addingHomework?<HomeworkFormWindow cid={this.props.course.id} ccode={this.props.course.code} onSaved={this.newHomeworkSavedHandler} onCancel={this.newHomeworkCancelHandler}/>:null}
                {this.state.submitting?<SubmitFormWindow homework={this.state.current} course={this.props.course.code} onSaved={this.homeworkSubmittedHandler} onCancel={this.homeworkSubmitCancelHandler}/>:null}
            </div>

        );
    }

});