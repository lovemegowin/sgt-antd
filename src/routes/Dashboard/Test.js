import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Tooltip, Menu, Icon, Pagination, Steps } from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Step = Steps.Step;

@connect(({test,loading}) => ({
  test,
  loading:loading.effects['test/getMpInfoList'],
}))
export default class Test extends Component {
  state = {
    current: 'mail',
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'test/getMpInfoList',
      payload: {
        page:{
          pageNum:1,
          pageSize:10
        },
        industryTypeId:"",
        merName:"",
        openFlag:""}
    });
    console.log('123')
  }

  handleClick = e => {
    this.props.dispatch({
      type: 'test/getMpInfoList',
      payload: {
        page:{
          pageNum:1,
          pageSize:10
        },
        industryTypeId:"",
        merName:"",
        openFlag:""}
    });
  };

  render() {
    const {test,loading} = this.props
    return (
      <Fragment>
        <div>
          <Row>
            <Col span={24}>
              <div>
                <Menu
                  onClick={this.handleClick}
                  selectedKeys={[this.state.current]}
                  mode="horizontal"
                >
                  <Menu.Item key="mail">
                    <Icon type="mail" />Navigation One
                  </Menu.Item>
                  <Menu.Item key="app" disabled>
                    <Icon type="appstore" />Navigation Two
                  </Menu.Item>
                  <SubMenu
                    title={
                      <span>
                        <Icon type="setting" />Navigation Three - Submenu
                      </span>
                    }
                  >
                    <MenuItemGroup title="Item 1">
                      <Menu.Item key="setting:1">Option 1</Menu.Item>
                      <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                      <Menu.Item key="setting:3">Option 3</Menu.Item>
                      <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                  </SubMenu>
                  <Menu.Item key="alipay">
                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                      Navigation Four - Link
                    </a>
                  </Menu.Item>
                </Menu>
              </div>
            </Col>
            <Col span={24}>
              <Pagination defaultCurrent={6} total={500} />
            </Col>
            <Col span={24}>
              <Steps>
                <Step status="finish" title="Login" icon={<Icon type="user" />} />
                <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
                <Step status="process" title="Pay" icon={<Icon type="loading" />} />
                <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
              </Steps>
            </Col>
            <Col span={3}> Col-3</Col>
            <Col span={3}> Col-3</Col>
            <Col span={6}> Col-6</Col>
            <Col span={6}> Col-6</Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
