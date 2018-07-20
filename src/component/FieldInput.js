import React, { Component } from 'react';
import { Input } from 'antd';

export default class FieldInput extends Component {

    handleChange(e) {
        this.props.handleChange(e);
    }

    render() {
        return (
            <Input
                style={{ marginBottom: 10, width: 450, display: 'flex', alignContent: 'center', alignItems: 'center' }}
                size="large"
                name={this.props.name}
                value={this.props.value}
                placeholder={this.props.placeholder}
                onChange={(e) => this.handleChange(e)} />
        )
    }
}