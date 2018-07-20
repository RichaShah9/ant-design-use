import React, { Component } from 'react';
import FieldInput from './component/FieldInput';
import { Button, Row, Col, message } from 'antd';
import Service from './Service';

export default class CampaignTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.service = new Service();
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSave() {
    const data = {
      name: this.state.name,
    }
    if (this.state.name !== '') {
      this.service.add('com.axelor.apps.marketing.db.CampaignType', data).then(res => {
        console.log(res)
        if (res.status === 200) {
          message.success('Campaign type is added');
        } else {
          message.error('Something going Wrong');
        }
      });
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: 30, marginLeft: 50, marginRight: 50 }}>
        <h1>Campaign Types</h1>
        <br />
        <Row type="flex" justify="center">
          <Col>
            <FieldInput
              name='name'
              placeholder='Add Campaign Type'
              value={this.state.name}
              handleChange={(e) => this.onChange(e)} />
            <Button type="primary" onClick={() => this.handleSave()}>Save</Button>
          </Col>
        </Row>
      </div>
    )
  }
}