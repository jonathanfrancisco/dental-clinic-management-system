import React from 'react';
import {Row, Col, Card, Divider, Typography} from 'antd';
import LoginForm from '../components/LoginForm';
import Background from '../isometric-bg.jpg';

const {Title} = Typography;

class Login extends React.Component {
   render() {
      return (
         <div style={{minHeight: '100vh', background: `url(${Background})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <Row type="flex" align="middle" style={{minHeight: '100vh'}}>
               <Col md={{span: 8, offset: 8}} sm={{span: 16, offset: 4}} xs={{span: 22, offset: 1}}>
                  <Card bordered={true} style={{boxShadow: '0px 3px 10px -4px #8c8c8c'}}>
                     <Title style={{textAlign: 'center'}} level={4}>
                        Andres Dental Clinic
                        <br /> 
                        Management System
                     </Title>
                     <Divider />
                     <LoginForm handleLogin={this.props.handleLogin} />
                  </Card>          
               </Col>
            </Row>
         </div>
      );
   }
}

export default Login;