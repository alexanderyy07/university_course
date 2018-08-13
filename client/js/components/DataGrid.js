import React from 'react';
import moment from 'moment';

import {ButtonIcon, InputIcon} from "./Icons";
import Dropdown from "./Dropdown";
import {DropdownItem} from "./Dropdown";

import filesize from 'filesize';

export let ActionButton = React.createClass({

    changeHandler(index, value, label) {
        this.setState({value: value, label: label, opened: false});
        this.props.onChange(index, value, label);
    },

    render() {
        return (
            <div className="slds-dropdown-trigger" aria-haspopup="true">
                <button className="slds-button slds-button--icon-border-filled slds-button--icon-border-small">
                    <ButtonIcon name="down" size="small"/>
                    <span className="slds-assistive-text">More</span>
                </button>
                <Dropdown header={this.props.header}
                          valueField={this.props.valueField}
                          labelField={this.props.labelField}
                          data={this.props.actions}
                          onChange={this.changeHandler}/>
            </div>
        );
    }

});

let ColumnHeader = React.createClass({

    getDefaultProps() {
        return {
            textAlign: "left",
            sortable: true
        };
    },

    sortHandler() {
        this.props.onSort(this.props.field);
    },

    render() {
        return (
            <th className={this.props.sortable ? "slds-is-sortable" : ""} scope="col"  style={{textAlign: this.props.textAlign}}>
                <span className="slds-truncate">{this.props.label}</span>
                {this.props.sortable ?
                    <button className="slds-button slds-button--icon-bare slds-button--icon-border-small" onClick={this.sortHandler}>
                        <ButtonIcon name="arrowdown" size="--small"/>
                        <span className="slds-assistive-text">Sort</span>
                    </button> : ""
                }
            </th>
        );
    }

});

let Column = React.createClass({

    linkHandler(event) {
        if (this.props.onLink) {
            if(this.props.action != "Details")
                this.props.onLink(this.props.data);
            else
                this.props.onLink({homeworkId: this.props.field.replace("_score",""), result: this.props.data});
        }
        event.preventDefault();
    },

    render() {
        let value = this.props.data[this.props.field];

        if (this.props.format === "currency") {
            value = parseFloat(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        } else if (this.props.format === "date") {
            value = moment(value).format("YYYY/MM/DD");
        } else if (this.props.format === "datetime") {
            value = moment(value).format("YYYY/MM/DD hh:MM:ss");
        } else if (this.props.format === "size") {
            value = filesize(value);
        } 

        if (this.props.onLink && !this.props.ignoreLinks) {
            if(this.props.action == "Details")
            {
                let path = this.props.data[this.props.field.replace('_score','_hw')];
                value = path?<div>
                        <a href="" onClick={this.linkHandler} className="hw-details">
                            <ButtonIcon name="add"/>
                        </a>
                        <span className={parseFloat(value)>=8.0?"grade-high":(parseFloat(value)>=6.0?"grade-intermediate":"")}>&nbsp;{value}</span>
                        </div>:
                        <div className="hw-none">
                        <ButtonIcon name="ban"/>
                        </div>
            }
            else if(this.props.action == "Delete")
            {
                value = <button className="slds-button slds-button--icon-border-filled" onClick={this.linkHandler}>
                        <ButtonIcon name="dash"/>
                    </button>
            }
            else
                value = <a href="#" onClick={this.linkHandler}>{value}</a>
        } else if(this.props.field.endsWith('_score'))
        {
            value = <span className={parseFloat(value)>=8.0?"grade-high":(parseFloat(value)>=6.0?"grade-intermediate":"")}>{value}</span>
        }

        return (
            <td data-label={this.props.label} style={{textAlign: this.props.textAlign}}>
                <span className="slds-truncate">
                    {value}
                </span>
            </td>
        );
    }

});

let Row = React.createClass({

    actionHandler(index, value, label) {
        this.props.onAction(this.props.data, index, value, label);
    },

    singleActionHandler() {
        this.actionHandler(0,0,this.props.actions[0]);
    },

    clickHandler() {
        if (this.props.onClick) {
            this.props.onClick(this.props.data);
        }
    },

    render() {
        let columns = [];
        for (let i=0; i<this.props.columns.length; i++) {
            let column = this.props.columns[i];
            if (column.props && column.props.field) {
                columns.push(<Column label={column.props.header}
                                     data={this.props.data}
                                     action={column.props.action}
                                     field={column.props.field}
                                     textAlign={column.props.textAlign} format={column.props.format}
                                     ignoreLinks={this.props.ignoreLinks}
                                     onLink={column.props.onLink}/>);
            }
        }

        if (this.props.actions) {
                let actions = this.props.actions.map((action, index) => ({id: index, name: action}));
                columns.push(
                    <td style={{width:"50px"}}>
                        {
                            this.props.actions.length > 1?<ActionButton actions={actions} onChange={this.actionHandler}/>:
                            <button className="slds-button slds-button--neutral slds-button--small" onClick={this.singleActionHandler}>
                                {actions[0].name}
                            </button>
                        }
                    </td>
                );
        }

        return (
            <tr className="slds-hint-parent" onClick={this.clickHandler} style={{backgroundColor: this.props.selected?"#F4F6F9":"transparent"}}>
                {columns}
            </tr>
        );
    }

});

export default React.createClass({

    getInitialState() {
        return {}
    },

    componentWillReceiveProps(props) {
        this.setState({data:props.data, table_id:props.table_id});
    },

    sortHandler(field) {
        let data = this.state.data;
        data.sort((x,y) => {
            if (x[field] < y[field]) {
                return -1;
            } else if (x[field] == y[field]) {
                return 0;
            } else {
                return 1;
            }
        });
        this.setState({data});
    },

    rowClickHandler(data) {
        if (this.props.onRowClick) {
            this.setState({selectedItem: data});
            this.props.onRowClick(data);
        }
    },

    render() {
        let headers = [];
        for (let i=0; i<this.props.children.length; i++) {
            let column = this.props.children[i];
            if (column.props && column.props.field) {
                headers.push(<ColumnHeader field={column.props.field}
                                           label={column.props.header}
                                           sortable={column.props.sortable}
                                           textAlign={column.props.textAlign}
                                           onSort={this.sortHandler}/>);
            }
        }
        let rows;
        if (this.state.data) {
            rows = this.props.data.map(item => <Row data={item}
                                                    key={item[this.props.keyField || "id"]}
                                                    selected={item===this.state.selectedItem}
                                                    columns={this.props.children}
                                                    actions={this.props.actions}
                                                    action={this.props.action}
                                                    ignoreLinks={this.props.ignoreLinks}
                                                    onAction={this.props.onAction}
                                                    onClick={this.rowClickHandler}/>);
        }
        return (
            <table id={this.props.table_id} className="slds-table slds-table--bordered slds-max-medium-table--stacked-horizontal slds-no-row-hover" style={{marginTop:"-1px"}}>
                <thead>
                <tr className="slds-text-heading--label">
                    {headers}
                    {this.props.onAction ?
                    <th></th>
                    :""}
                </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }

});