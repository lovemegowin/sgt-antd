import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Card, Table, Avatar } from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';
import { Link } from 'dva/router';
const { Column } = Table;

@connect(({ test, loading }) => ({
  test,
  loading: loading.effects['test/getMpInfoList'],
}))
export default class Test extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: true,
  };
  params = {
    page: {
      pageNum: 1,
      pageSize: 10,
    },
    industryTypeId: '',
    merName: '',
    openFlag: '',
  };
  getMpInfoList = () => {
    this.props.dispatch({
      type: 'test/getMpInfoList',
      payload: this.params,
    });
  };
  start = () => {
    this.getMpInfoList();
  };
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  componentDidMount() {
    this.getMpInfoList();
  }

  handleClick = e => {
    this.getMpInfoList();
  };
  onPageChange = pageNum => {
    this.params.page.pageNum = pageNum;
    this.getMpInfoList();
  };

  render() {
    const { test, loading } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const columns = [
      {
        title: 'RealName',
        dataIndex: 'realName',
      },
      {
        title: 'ShopFullName',
        dataIndex: 'shopFullName',
      },
      {
        title: 'Address',
        dataIndex: 'shopAddress',
      },
    ];
    const data = test.list;
    const pagination = {
      current: test.pageNum,
      defaultPageSize: 10,
      total: test.total,
      onChange: this.onPageChange,
    };
    return (
      <Fragment>
        <div>
          <div style={{ marginBottom: 16 }}>
            <Button type="primary" onClick={this.handleClick} loading={loading}>
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
            </span>
          </div>
          <Card>
            <Table
              rowSelection={rowSelection}
              dataSource={data}
              rowKey={record => record.mcMpUserId}
              pagination={pagination}
              loading={loading}
            >
              <Column
                title="头像"
                dataIndex="headImgUrl"
                render={text => <Avatar src={`${text}@!sgt300`} />}
              />
              <Column
                title="负责人"
                dataIndex="realName"
                render={(text, record) => (
                  <Link to={`/dashboard/market-detail/${record.mcMpUserId}`}>{text}</Link>
                )}
              />
              <Column title="店铺名称" dataIndex="shopFullName" />
              <Column title="店铺地址" dataIndex="shopAddress" />
            </Table>
          </Card>
        </div>
      </Fragment>
    );
  }
}
