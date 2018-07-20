import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Campaign from './Campaigns';
import CampaignTypes from './CampaignTypes';
import Template from './Template';
import TargetList from './Targetlist';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const array = [<Campaign />, <TargetList />, <CampaignTypes />, <Template />];

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      current: '',
      component: array[0],
    }
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    }, function () {
      if (this.state.current === '1') {
        const component = array[0];
        this.setState({ component })
      }
      else if (this.state.current === '2') {
        const component = array[1];
        this.setState({ component })
      }
      else if (this.state.current === '3') {
        const component = array[2];
        this.setState({ component })
      }
      else if (this.state.current === '4') {
        const component = array[3];
        this.setState({ component })
      }
    }
    );
  }

  render() {
    return (
      <div>
        <Layout style={{ fontWeight: 'bold' }}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0" >
            <Menu
              theme='dark'
              onClick={this.handleClick}
              mode="inline" >
              <SubMenu key="sub1" title={<span><Icon type="notification" /><span>Marketing</span></span>}>
                <Menu.Item key="1">Campaigns</Menu.Item>
                <Menu.Item key="2">Target List</Menu.Item>
                <SubMenu key="sub2" title="Configuration">
                  <Menu.Item key="3">Campaign Types</Menu.Item>
                  <Menu.Item key="4">Template</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#154360', color: '#FDFEFE', padding: 0, textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }} >Ant Design Demo</Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 715 }}>
                {this.state.component}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Created by Axelor Technologies
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}