import React from 'react';
import { Card, Layout, Menu, Row, Col, Typography, Button, Anchor} from 'antd';
import {Link} from 'react-router-dom';
import RegisterDrawer from '../components/RegisterDrawer'; 

import Logo from '../andres-logo.svg';


const { Header, Content, Footer} = Layout;
const {Title} = Typography;

class HomePage extends React.Component {
   render() {
      return (
        <React.Fragment>
             <Layout className="layout">
               <Header style={{background: '#001529'}}>
                  <Row>
                     <Col span={12}>
                        <img height="50" src={Logo} />
                        <h1 style={{display: 'inline-block', margin: 0}}>
                           <span style={{color: '#0050b3'}}>Andres</span> 
                           <span style={{color: '#fff'}}> Dental</span>
                           <span style={{color: '#0050b3'}}> Clinic</span>
                        </h1>
                     </Col>
                     <Col span={12} align="right">
                     <Menu
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        style={{ lineHeight: '64px'}}
                        >
                        <Menu.Item><Link to="/login">Login</Link></Menu.Item>
                        <Menu.Item><RegisterDrawer /></Menu.Item>
                  
                     </Menu>
                     </Col>
                  </Row>
               </Header>
               <Content style={{padding: '0px'}}>
                  <div id="header-img">

                     <Row style={{height: '100%'}} align="middle" justify="center" type="flex">
                        <Col style={{textAlign: 'center'}}>
                           <Title style={{color: '#fff', fontSize: 65, marginBottom: 0}} level={1}>
                           Andres Dental Clinic
                           </Title>
                           <h2 style={{color: '#fff'}}>Your smile, your passion!</h2>
                           {/* <Button type="primary">My Patient Account</Button>
                           <a href="http://localhost:3000/" target="_blank">Link to System</a> */}
                           <Button style={{borderRadius: 10}} ghost>
                              Learn More
                           </Button>
                        
                        </Col>
                     </Row>
                  </div>
                  <div style={{ background: '#fff', padding: 24, marginTop: 12}}>
                     <Row>
                           <Col span={24}>
                              <Card
                                 title="Default size card"
                                 extra={<a href="#">More</a>}
                              >
                                 <p>Card content</p>
                                 <p>Card content</p>
                                 <p>Card content</p>
                              </Card>
                           </Col>
                           <Col span={24}>
                              <Card
                                 title="Default size card"
                                 extra={<a href="#">More</a>}
                              >
                                 <p>Card content</p>
                                 <p>Card content</p>
                                 <p>Card content</p>
                              </Card>
                           </Col>
                           <Col span={24}>
                              <Card
                                 title="Default size card"
                                 extra={<a href="#">More</a>}
                              >
                                 <p>Card content</p>
                                 <p>Card content</p>
                                 <p>Card content</p>
                              </Card>
                           </Col>
                           <Col span={24}>
                              <Card
                                 title="Default size card"
                                 extra={<a href="#">More</a>}
                              >
                                 <p>Card content</p>
                                 <p>Card content</p>
                                 <p>Card content</p>
                              </Card>
                           </Col>
                     </Row>
                  
                     
                  </div>

                           
               </Content>
               <Footer style={{ textAlign: 'center' }}>
                  Andres Dental Clinic © 2019 Created By DWCL IT Group 3 - Capstone Project
               </Footer>
            </Layout>
        </React.Fragment>
      );
   }
}

export default HomePage;
