import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Row, Col, Card, Tooltip, Menu, Icon, Pagination, Steps, Button, Table} from 'antd';
import { Pie, WaterWave, Gauge, TagCloud } from 'components/Charts';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Step = Steps.Step;

@connect(({marketDetail,loading}) => ({
  marketDetail,
  loading:loading.effects['marketDetail/getMpInfoDetail'],
}))
export default class MarketDetail extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: true,
  };
  params = {
    mcMpUserId: this.props.match.params.id
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'marketDetail/getMpInfoDetail',
      payload: this.params
    });
  }

  handleClick = e => {
    this.props.dispatch({
      type: 'marketDetail/getMpInfoDetail',
      payload: this.params
    })
  };

  render() {
console.log(this.props)
    return (
      <Fragment>
        <div>
          <p>123</p>
        </div>
      </Fragment>
    );
  }
}
