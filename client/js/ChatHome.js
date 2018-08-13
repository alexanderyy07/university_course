import React from 'react';

import * as ChatService from './services/ChatService';
import MessageCard from './MessageCard';
import {RecordHeader, HeaderField} from './components/PageHeader';
import ChatBox from './ChatBox';

export default React.createClass({

    getInitialState() {
        return {msgs: [], msg_len: 0};
    },

    componentDidMount() {
        this.getMessages();
        var intervalId = setInterval(this.getMessages, 3000);
        // store intervalId in the state so it can be accessed later:
        this.setState({intervalId: intervalId});
    },
    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.intervalId);
    },

    componentDidUpdate() {
        if(this.state.msg_len != this.state.msgs.length)
        {
            var objDiv = document.getElementById("cht_box");
            objDiv.scrollTop = objDiv.scrollHeight;
            this.setState({msg_len: this.state.msgs.length});
        }
    },

    getMessages() {
        fetch(window.location.protocol + 'messages')
        .then((response) => {
            return response.json();
        }).then((data) => {this.setState({msgs: data})});
    },

    deleteHandler(msg) {
        ChatService.deleteItem(this.state.msg.id).then(() => window.location.hash = "chat");
    },

    editHandler(msg) {
        window.location.hash = "#chat/" + msg.id + "/edit";
    },

    sendHandler(msg,type)
    {
        ChatService.createItem({user_id: sessionStorage.token, pos: sessionStorage.pos, text: msg, type: type, course_id: this.props.course.id})
        .then(()=>{
            this.getMessages();
        });
    },

    render() {
        let rows = [];
        rows = this.state.msgs.map(item => <MessageCard data={item}/>);
        // for (let i = 0 ; i < this.state.msgs.length; i++) {
        //     rows.push(<MessageCard data={this.state.msgs[i]}/>);
        // }
        return (
            <div  className="slds-card">
                {/* <RecordHeader icon="chat"
                              title="Chat Room"
                              itemCount={this.state.msgs.length}>
                </RecordHeader> */}
                <div className="slds-m-around--medium slds-scrollable--y" id="cht_box">
                    {rows}
                </div>
                <ChatBox onSend={this.sendHandler}/>
            </div>
            
        );
    }
});