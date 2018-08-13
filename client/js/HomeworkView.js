import React from 'react';

import HomeworkResultCard from "./HomeworkResultCard";

export default React.createClass({

    render() {
        let homework = this.props.homework;
        return (
        <div className="slds-m-around--medium">
            <div className="slds-grid slds-wrap slds-m-bottom--large">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2 slds-m-top--medium">
                    <dl className="page-header--rec-home__detail-item">
                        <dt>
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Course</p>
                        </dt>
                        <dd>
                            <p className="slds-text-body--regular slds-truncate" title="course_name">{homework.course_name}</p>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        );
    }
});