import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Row, Col, Card, Tooltip, Menu, Icon, Pagination, Steps, Button, Table} from 'antd';
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
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };
  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
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
    console.log(this.props);
    const {test,loading} = this.props;
    const {  selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [{
      title: 'RealName',
      dataIndex: 'realName',
    }, {
      title: 'ShopFullName',
      dataIndex: 'shopFullName',
    }, {
      title: 'Address',
      dataIndex: 'shopAddress',
    }];
    const data = test.list;
    return (
      <Fragment>
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
          </span>
          </div>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
      </Fragment>
    );
  }
}
