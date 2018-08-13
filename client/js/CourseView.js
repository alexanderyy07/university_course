import React from 'react';

import CourseEnrollmentCard from "./CourseEnrollmentCard";
import CourseHomeworkCard from "./CourseHomeworkCard";
import TeacherPresentationCard from './TeacherPresentationCard'
import ChatHome from './ChatHome';

export default React.createClass({

    render() {
        let course = this.props.course;
        return (
        <div className="slds-m-around--medium slds-grid slds-wrap">
            <div className="slds-col--padded slds-size--4-of-5 slds-medium-size--4-of-5">
            <div className="slds-grid slds-wrap slds-m-bottom--large">
                <div className="slds-col--padded slds-size--1-of-2 slds-medium-size--1-of-2">
                    <dl className="page-header--rec-home__detail-item">
                        <dt>
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Teacher</p>
                        </dt>
                        <dd>
                            <p className="slds-text-body--regular slds-truncate" title="teacher_name">{course.teacher_name}</p>
                        </dd>
                    </dl>
                </div>
            </div>
            {sessionStorage.pos=="teacher"?<CourseEnrollmentCard course={course} editable={true} title="Students" icon="lead"/>:null}
            <CourseHomeworkCard course={course}/>
            <TeacherPresentationCard course={course}/>
            <CourseEnrollmentCard course={course} title="Embedded Excel" icon="metrics"/>
            </div>
            {/* <div className="slds-size--1-of-5 slds-medium-size--1-of-5">
                <ChatHome course={course}/>
            </div> */}
        </div>
        );
    }
});