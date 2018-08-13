import React from 'react';

import * as StudentService from './services/StudentService';
import {Icon, ButtonIcon} from './components/Icons';

import SearchBox from './components/SearchBox';
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
        return {searchKey: ""}
    },
    handleKeyPress(target) {
        if(target.charCode==13){
            if(this.state.searchKey != "")
            {
                this.props.onSend(this.state.searchKey, 0);
                this.setState({searchKey: ""}); 
            }
            if(this.state.attachment)
            {
                uploader.methods.uploadStoredFiles();
            }
        }
    },
    changeHandler: function(event) {
        let inputKey = event.target.value;
        this.setState({searchKey: inputKey});
    },
    componentDidMount() {
        uploader.on('complete', (id, name, response) => {
            // handle completed upload
            this.props.onSend(this.state.attachment, 1);
            this.setState({attachment: ""}); 
        })
        uploader.on('submitted', id => {
           this.setState({attachment: uploader.methods.getFile(id).name});
        })
    },
    render() {
        return (
                <div className="slds-form-element">
                    <div className="slds-form-element__control">
                        <input className="slds-input" type="text"
                               placeholder={this.props.placeholder || 'Enter your message...'}
                               value={this.state.searchKey}
                               style={{minWidth:"200px",marginTop:"1px"}}
                               onChange={this.changeHandler}
                               onKeyPress={this.handleKeyPress}/>
                        <FileInput accept='*' uploader={ uploader}>
                            <span class="icon ion-upload"><Icon name="link"/></span>
                        </FileInput>
                        &nbsp;
                        <span className="slds-badge">
                            {this.state.attachment?this.state.attachment:""}
                        </span>
                    </div>
                </div>
        );
    }

});