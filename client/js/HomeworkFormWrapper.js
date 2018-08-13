import React from 'react';

import HomeworkForm from './HomeworkForm';

export default React.createClass({

    saveHandler() {
        this.refs.form.save();
    },

    savedHandler() {
        window.location.hash = "#homework/" + this.props.homework.id;
    },

    render() {
        return (
            <div className="slds-m-around--medium">
                <HomeworkForm ref="form" homework={this.props.homework} onSaved={this.savedHandler}/>
                <button className="slds-button slds-button--neutral slds-button--brand slds-m-around--small" onClick={this.saveHandler}>Save</button>
            </div>
        );
    }

});