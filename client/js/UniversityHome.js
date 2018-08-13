import React from 'react';

import * as UniversityService from './services/UniversityService';

import {HomeHeader} from './components/PageHeader';
import UniversityList from './UniversityList';
import UniversityFormWindow from './UniversityFormWindow';

export default React.createClass({

    getInitialState() {
        return {universities: []};
    },

    componentDidMount() {
        UniversityService.findAll().then(universities => this.setState({universities}));
    },

    newHandler() {
        this.setState({addingUniversity:true});
    },

    savedHandler(university) {
        this.setState({addingUniversity: false});
        UniversityService.findAll().then(universities => this.setState({universities}));
    },

    cancelHandler() {
        this.setState({addingUniversity: false});
    },

    approveHandler(data) {
        data.allowed = 1;
        UniversityService.updateItem(data);
        UniversityService.findAll().then(universities => this.setState({universities}));
    },

    deleteHandler(data)
    {
        UniversityService.deleteItem(data.code);
        UniversityService.findAll().then(universities => this.setState({universities}));
    },

    render() {
        return (
            <div>
                <HomeHeader type="Universities"
                            title="Recent Universities"
                            newLabel="New University"
                            actions={[{value:"new", label:"New University"}]}
                            itemCount={this.state.universities.length}
                            views={[{id:1, name:"Recent Universities"}]}
                            viewId="1"
                            onNew={this.newHandler}/>
                <UniversityList universities={this.state.universities} onDelete={this.deleteHandler}/>
                {this.state.addingUniversity?<UniversityFormWindow onSaved={this.savedHandler} onCancel={this.cancelHandler}/>:null}
            </div>
        );
    }

});