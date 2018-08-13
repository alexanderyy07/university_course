import React from 'react';
import * as ResultService from './services/ResultService';
import {Icon, ButtonIcon} from './components/Icons';

const assign = Object.assign || require('object.assign');

import FileInput from 'react-fine-uploader/file-input'
import FineUploaderTraditional from 'fine-uploader-wrappers'

const uploader = new FineUploaderTraditional({
    options: {
       request: {
          endpoint: 'upload/'
       },
       autoUpload: false
    },
});

export default React.createClass({
    getInitialState() {
        return {homework: []};
    },

    componentDidMount() {
        uploader.on('complete', (id, name, response) => {
            // handle completed upload
            ResultService.createItem(this.state.homework)
            .then((result) => {
                console.log('submitted');
            })
            .catch((error) => {
                let event = new CustomEvent('notify', {detail:'You already submitted to this homework'});
                document.dispatchEvent(event);
            });
            console.log('upload success!');
        })
        uploader.on('submitted', id => {
            this.setState({homework: assign(this.props.homework,({student_id: sessionStorage.token, path: uploader.methods.getFile(id).name, course_code: this.props.course}))});
        })
    },

    saveHandler() {
        if(this.state.homework)
        {
            uploader.methods.uploadStoredFiles();
            this.props.onSaved();
        }
    },

    render() {
        return (
            <div>
                <div aria-hidden="false" role="dialog" className="slds-modal slds-fade-in-open">
                    <div className="slds-modal__container">
                        <div className="slds-modal__header">
                            <h2 className="slds-text-heading--medium">Submit Homework</h2>
                            <button className="slds-button slds-modal__close">
                                <svg aria-hidden="true" className="slds-button__icon slds-button__icon--inverse slds-button__icon--large">
                                </svg>
                                <span className="slds-assistive-text">Close</span>
                            </button>
                        </div>
                        <div className="slds-modal__content" style={{overflow:"visible"}}>
                            <FileInput accept='.c,.cpp,.java,.js,.txt' uploader={ uploader}>
                                <span class="icon ion-upload">Select File<Icon name="link"/></span>
                            </FileInput>
                            <br/>
                            <br/>
                            <span className="slds-input">
                                {this.state.homework?this.state.homework.path:""}
                            </span>
                        </div>
                        
                        <div className="slds-modal__footer">
                            <button className="slds-button slds-button--neutral" onClick={this.props.onCancel}>Cancel</button>
                            <button className="slds-button slds-button--neutral slds-button--brand" onClick={this.saveHandler}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="slds-modal-backdrop slds-modal-backdrop--open"></div>
            </div>
        );
    }

});