import React, { Component } from 'react';
import FieldInput from './component/FieldInput';
import { Row, Col, Select, Checkbox, Button, message } from 'antd';
import Service from './Service';
import FieldSelect from './component/FieldSelect';
const Option = Select.Option;

export default class Template extends Component {
    constructor(props) {
        super(props);
        this.state = {
            birtTemplate: '',
            isDefault: false,
            isSystem: false,
            language: '',
            mediaTypeSelect: '',
            metaModel: '',
            name: '',
            templateContext: '',
            target: ''
        }
        this.service = new Service();
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    onSelectChange = (value) => this.setState({ mediaTypeSelect: `${value}` });
    onDefaultChange = (e) => this.setState({ isDefault: `${e.target.checked}` });
    onSystemChange = (e) => this.setState({ isSystem: `${e.target.checked}` });
    handleMetaModel = (value) => this.setState({ metaModel: `${value}` })
    handleTemplateContext = (value) => this.setState({ templateContext: `${value}` })
    handleLanguage = (value) => this.setState({ language: `${value}` })
    handleBirtTemplate = (value) => this.setState({ birtTemplate: `${value}` })
    handleSave() {
        const formPayload = {
            birtTemplate: { id: this.state.birtTemplate },
            isDefault: this.state.isDefault,
            isSystem: this.state.isSystem,
            language: { id: this.state.language },
            mediaTypeSelect: this.state.mediaTypeSelect,
            metaModel: { id: this.state.metaModel },
            name: this.state.name,
            target: this.state.target,
            templateContext: { id: this.state.templateContext },
            subject:'Testing'
        }
        console.log(formPayload)
        if (this.state.name !== '') {
            this.service.add('com.axelor.apps.message.db.Template', formPayload).then(res => {
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
                <h1>Template</h1>
                <br />
                <Row type="flex" justify="center">
                    <Col>
                        <Checkbox onChange={this.onDefaultChange}>Default?</Checkbox>
                        <Checkbox onChange={this.onSystemChange}>System?</Checkbox>
                        <br />
                        <FieldInput
                            name='name'
                            value={this.state.name}
                            placeholder='name'
                            handleChange={(e) => this.onChange(e)} />
                        <FieldInput
                            name='target'
                            value={this.state.target}
                            placeholder='Target receptor'
                            handleChange={(e) => this.onChange(e)} />
                        <label>mediaTypeSelect</label>
                        <br />
                        <Select
                            style={{ width: 450, marginBottom: 10 }}
                            placeholder='mediaTypeSelect'
                            value={this.state.mediaTypeSelect}
                            onChange={this.onSelectChange}>
                            <Option value="1">Mail</Option>
                            <Option value="2">Email</Option>
                            <Option value="3">Chat</Option>
                            <Option value="4">Emailing</Option>
                        </Select>
                        <br />
                        <label style={{ marginTop: 10 }}>metaModel</label>
                        <br />
                        <FieldSelect
                            entity='com.axelor.meta.db.MetaModel'
                            value={this.state.metaModel}
                            valueMember='id'
                            displayMember='name'
                            placeholder='Meta Model'
                            handleChange={(value) => this.handleMetaModel(value)} />
                        <br />
                        <label>TemplateContext</label>
                        <br />
                        <FieldSelect
                            entity='com.axelor.apps.base.db.TemplateContext'
                            value={this.state.templateContext}
                            valueMember='id'
                            displayMember='name'
                            placeholder='Template Context'
                            handleChange={(value) => this.handleTemplateContext(value)} />
                        <br />
                        <label>Language</label>
                        <br />
                        <FieldSelect
                            entity='com.axelor.apps.base.db.Language'
                            value={this.state.language}
                            valueMember='id'
                            displayMember='name'
                            placeholder='Language'
                            handleChange={(value) => this.handleLanguage(value)} />
                        <br />
                        <label style={{ marginTop: 10 }}>BirtTemplate</label>
                        <br />
                        <FieldSelect
                            entity='com.axelor.apps.base.db.BirtTemplate'
                            value={this.state.birtTemplate}
                            valueMember='id'
                            displayMember='name'
                            placeholder='BirtTemplate'
                            handleChange={(value) => this.handleBirtTemplate(value)} />
                        <br />
                        <Button type="primary" onClick={() => this.handleSave()} >Save</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}