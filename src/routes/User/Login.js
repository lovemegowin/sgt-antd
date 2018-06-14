import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, Card, Button, List, Avatar } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
const { Meta } = Card;

@connect(({ login, loading }) => ({
  login,
  loading: loading.effects['login/loginNew'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'login/loginNew',
    });
  }

  checkScanStatusFuc = () => {
    this.props.dispatch({
      type: 'login/loginNew',
    });
  };

  choseMerchant = token => {
    this.props.dispatch({
      type: 'login/choseMerchant',
      payload: token,
    });
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  render() {
    const { login, loading } = this.props;
    console.log(this.props);
    console.log(this.state);
    const { type } = this.state;
    const MaskLayer = () => (
      <div className="mask">
        <a onClick={() => this.checkScanStatusFuc(login.qrTicket)}>刷新</a>
      </div>
    );
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    return (
      <div className={styles.main}>
        <Card
          loading={loading}
          hoverable
          style={{ width: 368 }}
          cover={login.qrImg && <img src={login.qrImg} />}
        >
          <Meta title="扫描二维码登陆" description="www.siguateng.com" />
        </Card>
        {login.status === '0' && (
          <List
            size="large"
            loading={loading}
            dataSource={login.empList}
            footer={
              <div>
                <b>ant design</b> footer part
              </div>
            }
            renderItem={item => (
              <List.Item key={item.empId}>
                <List.Item.Meta
                  avatar={<Avatar src={item.headImgUrl} />}
                  description={item.mpName}
                />
                <a onClick={() => this.choseMerchant(item.access_token)}>{item.realname}</a>
              </List.Item>
            )}
          />
        )}
        {login.showMask === true && <MaskLayer />}
      </div>
    );
  }
}
