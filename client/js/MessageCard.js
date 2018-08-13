import React from 'react';

import * as CourseService from './services/CourseService';

import DataGrid from './components/DataGrid';
import {Icon, ButtonIcon} from './components/Icons';
import CourseFormWindow from './CourseFormWindow';

export default React.createClass({
    attachLinkHandler(event) {
        var link = document.createElement('a');
        link.download = this.props.data.text;
        link.href = window.location.protocol + '/upload/' + link.download;
        var clickEvent = document.createEvent("MouseEvent");
        clickEvent.initEvent("click", true, true);
        
        link.dispatchEvent(clickEvent);
        event.preventDefault();
        // PresentationService.downFile({filename: present.path}).then(downloaded => {
            
        //     // fileDownload(downloaded, present.path);
        //     // writeFile(present.path, downloaded, function (err) {
        //     //     if (err) return console.log(err)
        //     //     console.log('file is written')
        //     //   })
        //     var link = document.createElement('a');
        //     link.download = present.path;
        //     link.href = 'http://localhost:5000/upload/'+present.path;
        // });
    },
    render() {
        return (
            <div>
                {/* <header className="slds-card__header slds-grid">
                    <div className="slds-media slds-media--center slds-has-flexi-truncate">
                        <div className="slds-media__figure">
                            <Icon name="post" size="small"/>
                        </div>
                        <div className="slds-media__body">
                            <h3 className="slds-text-heading--small slds-truncate">
                                {this.props.data.pos=="teacher"?
                                    'Professor '+this.props.data.user_name:
                                    this.props.data.user_name}
                            </h3>
                        </div>
                        <div className="slds-media__body">
                            <span className="slds-text-body--small slds-truncate slds-text-align--right">{this.props.data.time}</span>
                        </div>
                    </div>
                </header> */}

                <section className="slds-card__body">
                        <div className="slds-media__body ">
                            <small>
                                {this.props.data.pos=="teacher"?
                                    'Professor '+this.props.data.user_name:
                                    null}
                            </small>
                        </div>
                    <span className="slds-input">{!this.props.data.type?this.props.data.text:
                        <a href="#" className="slds-badge" onClick={this.attachLinkHandler}>{this.props.data.text}</a>}
                    </span>
                </section>
            </div>
        );
    }

});