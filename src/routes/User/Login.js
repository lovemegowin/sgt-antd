import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {Checkbox, Alert, Icon, Card, Button, List, Avatar} from 'antd';
import Login from 'components/Login';
import styles from './Login.less';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;
const { Meta } = Card;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))

export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    qrImg:'',
    qrTicket:'',
    status:''
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'login/loginNew',
    });
  }

  checkScanStatusFuc =() =>{
    this.props.dispatch({
      type: 'login/loginNew',
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
    const { login, submitting } = this.props;
    const { type } = this.state;
    const IconText = ({ type, text }) => (
      <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
    );

    return (
      <div className={styles.main}>
        <Card
          hoverable
          style={{ width: 368 }}
          cover={<img alt="example" src={login.qrImg} />}
        >
          <Meta
            title="扫描二维码登陆"
            description="www.siguateng.com"
          />
        </Card>
        {login.status==='0'&&
        <List itemLayout="vertical" size="large" pagination={{
                onChange: (page) => {
                  console.log(page);
                },
                pageSize: 3,
              }}
              dataSource = {login.empList}
              footer={<div><b>ant design</b> footer part</div>}
              renderItem={item => (
                <List.Item
                  key={item.empId}
                  actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                  extra={<img width={272} alt="logo" src={item.headImgUrl} />}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.headImgUrl} />}
                    title={<a href={item.access_token}>{item.access_token}</a>}
                    description={item.mpName}
                  />
                  {item.realname}
                </List.Item>
              )}
        />
        }
        <Button type="primary" onClick={() => this.checkScanStatusFuc(login.qrTicket)}>check</Button>
      </div>
    );
  }
}
