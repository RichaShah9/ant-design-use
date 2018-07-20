import React, { Component } from 'react';
import { Collapse, Checkbox, Button, Modal, DatePicker, Tooltip, Input, Radio, message, Table } from 'antd';
import FieldInput from './component/FieldInput';
import FieldSelect from './component/FieldSelect';
import { Tabs } from 'antd';
import moment from 'moment';
import Service from './Service';
import { TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;
const RadioGroup = Radio.Group;
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

export default class Campaigns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            subject: '',
            campaignType: '',
            emailing: false,
            visible: false,
            generateEventPerTarget: false,
            startDateTime: '',
            duration: '001.00',
            endDateTime: '',
            user: '',
            team: '',
            disponibilitySelect: '1',
            visibilitySelect: '',
            description: '',
            items: [],
            key: 1,
            value: undefined,
            leadVisible: false,
            leads: [],
            selectedLeads: [],
            selectedRows: []
        }
        this.service = new Service();
    }

    componentDidMount() {
        this.service.getData('com.axelor.apps.crm.db.Lead').then(res =>
            res.json().then(result => {
                const { data } = result;
                this.setState((prevState) => {
                    return { leads: data };
                });
            })
        );
    }

    openLeadForm = () => this.setState({ leadVisible: true });
    openPlanForm = () => this.setState({ visible: true });
    handleCancel = (e) => this.setState({ visible: false });
    handleLeadCancel = (e) => this.setState({ leadVisible: false });
    handleType = (value) => this.setState({ campaignType: `${value}` })
    onEmailing = (e) => this.setState({ emailing: `${e.target.checked}` });
    onGenerateEventPerTarget = (e) => this.setState({ generateEventPerTarget: `${e.target.checked}` });
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    handleUser = (value) => this.setState({ user: `${value}` })
    handleTeam = (value) => this.setState({ team: `${value}` })
    onDisponibilitySelect = (e) => this.setState({ disponibilitySelect: e.target.value });
    onVisibilitySelect = (e) => this.setState({ visibilitySelect: e.target.value });
    onTree = (value) => this.setState({ value });
    handleLeadOk = (e) => {
        this.setState({ selectedLeads: this.state.selectedRows })
        this.handleLeadCancel();
    }
    onDateChange = (date, dateString) => {
        // var expires = moment(dateString, 'YYYY-MM-DDTHH:mm:ss.SSS').toDate();
        // console.log('exp: ', expires);
        this.setState({ startDateTime: dateString })
    }
    handleSubmit = (e) => {
        const formPayload = {
            name: this.state.name,
            campaignType: { id: this.state.campaignType },
            emailing: this.state.emailing,
            generateEventPerTarget: this.state.generateEventPerTarget,
        }
        if (this.state.name !== '') {
            this.service.add('com.axelor.apps.marketing.db.Campaign', formPayload).then(res => {
                console.log(res)
                if (res.status === 200) {
                    message.success('Event is added');
                } else {
                    message.error('Something going Wrong');
                }
            });
        }
        else {
            message.error('name is required')
        }
    };
    handleSave(e) {
        const formPayload = {
            key: this.state.key,
            description: this.state.description,
            disponibilitySelect: this.state.disponibilitySelect,
            duration: this.state.duration,
            endDateTime: this.state.endDateTime,
            startDateTime: this.state.startDateTime,
            subject: this.state.subject,
            visibilitySelect: this.state.visibilitySelect,
            user: { id: this.state.user },
            team: { id: this.state.team }
        }
        const { items } = this.state;
        items.push({ ...formPayload });
        this.setState((prevState, props) => {
            return { items, key: prevState.key + 1 };
        })
        // console.log('items: ', JSON.stringify(this.state.items.formPayload));
        // if (this.state.subject !== '') {
        //     this.service.add('com.axelor.apps.crm.db.Event', formPayload).then(res => {
        //         console.log(res) 
        //         if (res.status === 200) {
        //             message.success('Event is added');
        //         } else {
        //             message.error('Something going Wrong');
        //         }
        //     });
        // }
        this.handleClear();
    }
    handleClear() {
        this.setState({
            description: '',
            disponibilitySelect: '',
            duration: '',
            endDateTime: '',
            startDateTime: '',
            subject: '',
            visibilitySelect: '',
            user: '',
            team: ''
        })
    }
    onEndDateChange = (date, dateString) => {
        this.setState({ endDateTime: dateString },
            function () {
                this.setState({ duration: moment(this.state.endDateTime).diff(this.state.startDateTime, 'hours') })
            });
    }

    render() {
        const columns = [{
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'StartDate',
            dataIndex: 'startDateTime',
            key: 'startDateTime',
        },
        {
            title: 'EndDate',
            dataIndex: 'endDateTime',
            key: 'endDateTime',
        },
        {
            title: 'Duration(Hours)',
            dataIndex: 'duration',
            key: 'duratiom',
        },];

        const leadColumns = [{
            title: 'Last Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Enterprise',
            dataIndex: 'enterpriseName',
            key: 'enterpriseName',
        },
        {
            title: 'Fixed Phone',
            dataIndex: 'fixedPhone',
            key: 'fixedPhone',
        },
        {
            title: 'Contact date',
            dataIndex: 'contactDate',
            key: 'contactDate',
        },
        {
            title: 'Assigned to',
            dataIndex: 'user.fullName',
            key: 'user.fullName',
        },
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRows: selectedRows })
            },
        };

        return (
            <div style={{ marginTop: 30, marginLeft: 50, marginRight: 50, fontWeight: 'bold', fontSize:15 }}>
                <h1>Campaign</h1>
                <br />
                <Collapse defaultActiveKey={['2', '3', '4']}>
                
                    <Panel header="Info" key='2'>
                        <Tooltip title="Required field">
                            <FieldInput
                                name='name'
                                value={this.state.name}
                                placeholder='name'
                                handleChange={(e) => this.onChange(e)} />
                            <label>Campaign Type</label>
                            <br />
                        </Tooltip>
                        <FieldSelect
                            entity='com.axelor.apps.marketing.db.CampaignType'
                            value={this.state.campaignType}
                            valueMember='id'
                            displayMember='name'
                            placeholder='campaignType'
                            handleChange={(value) => this.handleType(value)} />
                        <br />
                        <Checkbox onChange={this.onEmailing}>Emailing</Checkbox>
                        <Checkbox onChange={this.onGenerateEventPerTarget}>Generate event per target</Checkbox>
                    </Panel>
                    
                    <Panel header='Tab' key='3'>
                        <Tabs defaultActiveKey="12">
                            <TabPane tab="Target List" key="11">Target List</TabPane>
                            <TabPane tab="Attendees" key="12">
                                <Button type="primary" icon="search" onClick={() => this.openLeadForm()}>Search</Button>
                                <Modal
                                    width='70%'
                                    title="Leads"
                                    visible={this.state.leadVisible}
                                    onOk={this.handleLeadOk}
                                    onCancel={this.handleLeadCancel}>
                                    <Table 
                                        rowSelection={rowSelection}
                                        scroll={{ y: 300 }}
                                        columns={leadColumns}
                                        dataSource={this.state.leads}
                                        rowKey="id" />
                                </Modal>
                                {
                                    Object.keys(this.state.selectedLeads).length > 0 &&
                                    <Table bordered
                                        columns={leadColumns}
                                        dataSource={this.state.selectedLeads}
                                        rowKey="id"
                                        style={{ marginTop: 10 }} />
                                }
                            </TabPane>
                            <TabPane tab="Targets to Contact" key="13">
                                <Button type="primary" onClick={() => this.openPlanForm()} >Create Planned events</Button>
                                <Modal
                                    title="Events"
                                    visible={this.state.visible}
                                    onOk={(e) => this.handleSave(e)}
                                    onCancel={this.handleCancel}>
                                    <FieldInput
                                        name='subject'
                                        value={this.state.subject}
                                        placeholder='Subject'
                                        handleChange={(e) => this.onChange(e)} />

                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder='select startdate'
                                        onChange={this.onDateChange} />

                                    <DatePicker
                                        showTime
                                        placeholder='select enddate'
                                        format="YYYY-MM-DD HH:mm:ss"
                                        onChange={this.onEndDateChange} />

                                    <Input
                                        style={{ marginBottom: 10, marginTop: 10, width: 450, display: 'flex', alignContent: 'center', alignItems: 'center' }}
                                        name='duration'
                                        value={this.state.duration}
                                        disabled />
                                    <label>Assigned to</label>
                                    <br />
                                    <FieldSelect
                                        entity='com.axelor.auth.db.User'
                                        value={this.state.user}
                                        valueMember='id'
                                        displayMember='name'
                                        placeholder='User'
                                        handleChange={(value) => this.handleUser(value)} />
                                    <br />

                                    <label>Team</label>
                                    <br />
                                    <FieldSelect
                                        entity='com.axelor.team.db.Team'
                                        value={this.state.team}
                                        valueMember='id'
                                        displayMember='name'
                                        placeholder='Team'
                                        handleChange={(value) => this.handleTeam(value)} />
                                    <br />

                                    <label>Availability</label>
                                    <br />
                                    <RadioGroup onChange={this.onDisponibilitySelect} value={this.state.disponibilitySelect}>
                                        <Radio value={1}>Busy</Radio>
                                        <Radio value={2}>Available</Radio>
                                    </RadioGroup>
                                    <br />
                                    <label style={{ marginTop: 10 }}>Visibility</label>
                                    <br />
                                    <RadioGroup onChange={this.onVisibilitySelect} value={this.state.visibilitySelect}>
                                        <Radio value={1}>Public</Radio>
                                        <Radio value={2}>Private</Radio>
                                    </RadioGroup>
                                    <br />
                                    <TextArea rows={4} placeholder='description' value={this.state.description} name='description'
                                        onChange={(e) => this.onChange(e)} />
                                    <Button type="primary" onClick={() => this.handleClear()} >Clear</Button>
                                </Modal>
                                {
                                    Object.keys(this.state.items).length > 0 &&
                                    <Table dataSource={this.state.items} columns={columns} bordered style={{ marginTop: 10 }} />
                                }
                            </TabPane>
                        </Tabs>
                    </Panel>

                    <Panel header='Operation' key='4'>
                        <TreeSelect
                            showSearch
                            style={{ width: 300, marginBottom: 10 }}
                            value={this.state.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={this.onTree} >
                            <TreeNode value="parent 1" title="parent 1" key="0-1">
                                <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                                    <TreeNode value="leaf1" title="my leaf" key="random" />
                                    <TreeNode value="leaf2" title="your leaf" key="random1" />
                                </TreeNode>
                                <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                                    <TreeNode value="sss" title={<b style={{ color: '#08c' }}>hello</b>} key="random3" />
                                </TreeNode>
                            </TreeNode>
                        </TreeSelect>
                        <br />
                        <Button type="primary" onClick={() => this.handleSubmit()} >Save</Button>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}