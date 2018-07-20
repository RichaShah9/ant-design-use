import React, { Component } from 'react'
import Service from './../Service'
import { Select } from 'antd';
const Option = Select.Option;

export default class FieldSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: [],
        }
    }

    fetchRecords() {
        const service = new Service();
        service.getData(this.props.entity).then((body) => {
            body.json().then(result => {
                const { data } = result;
                this.setState({
                    children: data,
                });
            });
        })
    }

    handleChange(value) {
        console.log(value);
        this.props.handleChange(value);
    }

    getValue(r, text) {
        let objValue = r;
        const fields = text.split('.');
        for (let i = 0; i < fields.length; i++) {
            const field = fields[i];
            objValue = objValue[field];
        }
        return objValue;
    }

    render() {
        return (
            this.state.children &&
            <Select
                style={{ width: 450, marginBottom: 10 }}
                onFocus={() => this.fetchRecords()}
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={(value) => this.handleChange(value)}>
                {
                    this.state.children.map((r, index) => (
                        <Option key={index} value={r[this.props.valueMember].toString()}>{this.getValue(r, this.props.displayMember)}</Option>
                    ))
                }
            </Select>
        );
    }
}