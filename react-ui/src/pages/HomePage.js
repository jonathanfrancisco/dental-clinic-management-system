import React from 'react';
import { Icon, Layout, Menu, Row, Col, Typography, Button, Divider} from 'antd';
import {Link} from 'react-router-dom';
import { Link as ScrollLink, Events, scrollSpy} from 'react-scroll'
import MediaQuery from 'react-responsive';

import RegisterModal from '../components/RegisterModal';
import RegisterDrawer from '../components/RegisterDrawer'; 
import Logo from '../andres-logo.svg';
import DentalFilling from '../dental-filling.svg';
import Cleaning from '../cleaning.svg';
import Whitening from '../whitening.svg';


const { Header, Content, Footer} = Layout;
const {Title, Text} = Typography;

class HomePage extends React.Component {


   componentDidMount() {
      Events.scrollEvent.register('begin', function(to, element) {
         console.log("begin", arguments);
       });
    
       Events.scrollEvent.register('end', function(to, element) {
         console.log("end", arguments);
       });
    
       scrollSpy.update();
   }

   componentWillUnmount() {
      Events.scrollEvent.remove('begin');
      Events.scrollEvent.remove('end');
   }

   render() {
      return (
        <React.Fragment>
             <Layout className="layout">
               <Header style={{background: '#001529'}}>
                  <Row>
                     <Col span={12}>
                        <img style={{height: '100%', maxHeight: '50px'}} src={Logo} />
                        <MediaQuery minWidth={720}>
                           <h1 style={{display: 'inline-block', margin: 0}}>
                              <span style={{color: '#0050b3'}}>Andres</span> 
                              <span style={{color: '#fff'}}> Dental</span>
                              <span style={{color: '#0050b3'}}> Clinic</span>
                           </h1>
                        </MediaQuery>
                     </Col>
                     <Col span={12} align="right">
                     <Menu
                        theme="dark"
                        mode="horizontal"
                        selectable={false}
                        style={{ lineHeight: '64px'}}
                        >
                        <Menu.Item><Link to="/login">Login</Link></Menu.Item>


                        <Menu.Item>
                            <MediaQuery maxWidth={900}>
                              <RegisterModal />
                           </MediaQuery>
                           <MediaQuery minWidth={900}>
                              <RegisterDrawer />
                           </MediaQuery>
                        </Menu.Item>
                        
                  
                     </Menu>
                     </Col>
                  </Row>
               </Header>
               <Content style={{padding: '0px'}}>
                  <div id="header-img">

                     <Row style={{height: '100%'}} align="middle" justify="center" type="flex">
                        <Col style={{textAlign: 'center'}}>
                           <MediaQuery maxWidth={720}>
                              <Title style={{color: '#fff'}} level={1}>
                                 Andres Dental Clinic
                              </Title>
                           </MediaQuery>
                           <MediaQuery minWidth={720}>
                              <Title style={{color: '#fff', fontSize: 65, marginBottom: 0}} level={1}>
                                 Andres Dental Clinic
                              </Title>
                           </MediaQuery>
                           <h2 style={{color: '#fff'}}>Your smile, your passion!</h2>
                           {/* <Button type="primary">My Patient Account</Button>
                           <a href="http://localhost:3000/" target="_blank">Link to System</a> */}
                           <Button style={{borderRadius: 10, marginTop: 16}} ghost>
                              <ScrollLink activeClass="active" to="learnmore" spy={true} smooth={true} offset={50} duration={500}>
                                Learn More
                              </ScrollLink>
                           </Button>
                        
                        </Col>
                     </Row>
                  </div>
                  <div style={{ background: '#fff', padding: '30px 24px'}}>
                     <Row id="learnmore" style={{textAlign: 'center', paddingBottom: '1em'}}>
                           <Col style={{padding: '0px 16px', marginTop: '3em'}} xs={24} md={8}>
                              <img style={{width: '100%', maxWidth: '100px'}} src={DentalFilling}></img>
                              <Title style={{marginTop: 35}} level={4}>Dental Filling</Title>
                              <Text>
                                 A dental restoration to restore the function, integrity, and morphology of missing tooth structure resulting from caries or external trauma.
                           </Text>
                           </Col>
                           <Col style={{padding: '0px 16px', marginTop: '3em'}} xs={24} md={8}>
                              <img style={{width: '100%', maxWidth: '100px'}} src={Cleaning}></img>
                              <Title style={{marginTop: 30}} level={4}>Teeth Cleaning</Title>
                              <Text>
                                 Teeth Cleaning is part of oral hygiene and involves the removal of dental plaque from teeth (dental caries).
                              </Text>
                           </Col>
                           <Col style={{padding: '0px 16px', marginTop: '3em'}} xs={24} md={8}>
                              <img style={{width: '100%', maxWidth: '100px'}} src={Whitening}></img>
                              <Title style={{marginTop: 30}} level={4}>Teeth Whitening</Title>
                              <Text>
                                 Teeth Whitening is among the most popular dental procedures because it can greatly improve how your teeth look.
                              </Text>
                           </Col>
                     </Row>
                  </div>
                  <div id="working-photo-strip"></div>
                  <div style={{ background: '#fff', padding: '30px 24px'}}>
                     <div style={{textAlign: 'center'}}>
                        <Title level={2}>How can we help</Title>
                        <Text strong>We offer wide range of procedures to help you get that perfect smile. Visit us today!</Text>
                     </div>
                     <Row style={{padding: '1.5em 3em'}} gutter={32}>
                        <Col sm={24} md={12}>
                           <Divider orientation="left"><Text strong>ANDRES DENTAL CLINIC</Text></Divider>
                           <Row style={{paddingLeft: '3em'}}>
                              <Col style={{marginBottom: '1em'}}> 
                                 <Text>
                                    <Icon type="home" /> Inside One.O.5ive Department Store J. P. Rizal Street, Laoag City
                                 </Text>
                              </Col>
                              <Col style={{marginBottom: '1em'}}>
                                 <Text>
                                    <Icon type="phone" /> 8888-8888-888
                                 </Text>
                              </Col>

                              <Col style={{marginBottom: '1em'}}>
                                 <Text>
                                    <Icon type="mail" /> andresdentalclinic@gmail.com
                                 </Text>
                              </Col>
                           </Row>
                        </Col>
                        <Col sm={24} md={12}>
                           <Divider orientation="left"><Text strong>OPENING HOURS</Text></Divider>
                           <Row style={{paddingLeft: '3em'}}>
                              <Col style={{marginBottom: '1em'}}> 
                                 <Text>
                                    <Icon type="calendar" /> Monday - Friday: <Text strong>9am-6pm</Text>
                                 </Text>
                              </Col>
                              <Col style={{marginBottom: '1em'}}> 
                                 <Text>
                                    <Icon type="calendar" /> Saturday: <Text strong>10am-4pm</Text>
                                 </Text>
                              </Col>
                              <Col style={{marginBottom: '1em'}}> 
                                 <Text>
                                    <Icon type="calendar" /> Sunday: <Text strong>Not Available</Text>
                                 </Text>
                              </Col>
                            
                           </Row>
                        </Col>
                     </Row>
                  </div>    
               </Content>
               <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
                  Andres Dental Clinic © 2019 Created By DWCL IT Group 3 - Capstone Project
               </Footer>
            </Layout>
        </React.Fragment>
      );
   }
}

export default HomePage;
