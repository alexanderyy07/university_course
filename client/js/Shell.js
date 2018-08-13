import React from 'react';

import Spinner from './components/Spinner';
import Toast from './components/Toast';
import {Icon, ButtonIcon} from './components/Icons';
import StudentSearchBox from './StudentSearchBox';
import { browserHistory } from 'react-router';

export default React.createClass({

    selectHandler(index, value, label) {
        window.location.hash = "student/" + value;
    },
    logout() {
        sessionStorage.clear();
        browserHistory.push('#/');
        window.location.reload();
    },

    render() {
        return (
            <div>
                <Spinner/>
                <Toast/>
                <header className="menu" style={{backgroundColor:"#01344E", verticalAlign:"middle"}}>
                    <div className="slds-logout"><a href="" onClick={this.logout}><ButtonIcon name="logout" theme={null}/>Log out</a></div>
                    <ul className="slds-list--horizontal">
                        {/* <li className="slds-list__item"><a href="#students"><Icon name="lead" theme={null}/>Students</a></li>
                        <li className="slds-list__item"><a href="#courses"><Icon name="orders" theme={null}/>Courses</a></li>
                        <li className="slds-list__item slds-m-top--xx-small">
                            <StudentSearchBox onSelect={this.selectHandler}/>
                        </li> */}
                        <li className="slds-list__item"><a href={"#"+sessionStorage.pos+"/"+(sessionStorage.pos=="student"?sessionStorage.university+'_':'' )+ sessionStorage.token}><Icon name="home" theme={null}/>Home</a></li>
                        {
                            sessionStorage.permission == 2?
                            <li className="slds-list__item"><a href="#teachers"><Icon name="user" theme={null}/>Teachers</a></li>
                            :""
                        }
                        {
                            sessionStorage.permission == 2?
                            <li className="slds-list__item"><a href="#universities"><Icon name="social" theme={null}/>Universities</a></li>
                            :""
                        }
                    </ul>
                    
                </header>
                {this.props.children}
            </div>
        );
    }
});