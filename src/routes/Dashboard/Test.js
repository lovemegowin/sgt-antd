import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Table} from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import { Link } from 'dva/router';
const {Column}=Table;

@connect(({test,loading}) => ({
  test,
  loading:loading.effects['test/getMpInfoList'],
}))
export default class Test extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: true,
  };
  params = {
    page:{
      pageNum:1,
      pageSize:10
    },
    industryTypeId:"",
    merName:"",
    openFlag:""
  };
  start = () => {
    this.props.dispatch({
      type: 'test/getMpInfoList',
      payload: this.params
    });
  };
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'test/getMpInfoList',
      payload: this.params
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
          <Table rowSelection={rowSelection}  dataSource={data} rowKey={record => record.mcMpUserId}>
            <Column title="RealName" dataIndex="realName"
              render={(text,record)=>(
                <Link to={`/dashboard/market-detail/${record.mcMpUserId}`}>{text}</Link>
              )}
            />
            <Column title="ShopFullName" dataIndex="shopFullName" />
            <Column title="Address" dataIndex="shopAddress"/>
          </Table>
        </div>
      </Fragment>
    );
  }
}
