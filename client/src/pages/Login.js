import React from 'react';
import {Row, Col, Card, Divider, Typography} from 'antd';
import LoginForm from '../components/LoginForm';

const {Title} = Typography;

class Login extends React.Component {
   render() {
      return (
         <Row type="flex" align="middle" style={{minHeight: '100vh', background: '#0c162e'}}>
            <Col md={{span: 8, offset: 8}} sm={{span: 16, offset: 4}} xs={{span: 22, offset: 1}}>
               <Card bordered={true}>
                  <Title style={{textAlign: 'center'}} level={2}>
                     Andres Dental Clinic
                     <br /> 
                     Management System
                  </Title>
                  <Divider />
                  <LoginForm handleLogin={this.props.handleLogin} />
               </Card>          
            </Col>
         </Row>
      );
   }
}

export default Login;