import React from 'react';
import {Layout, Row,Tabs, Col, Typography, message} from 'antd';
import DescriptionItem from '../components/DescriptionItem';
import axios from 'axios';
import moment from 'moment';

const {TabPane} = Tabs;
const {Title} = Typography;
const {Content} = Layout;

class PatientHomePage extends React.Component {

   state = {
      dentalRecord: {},
      balances: [],
      myAppointments: [],
      dentistAppointments: []
   };


   componentDidMount() {
      this.getDentalRecord(this.props.user.patient_id);
   }

   getDentalRecord = (patientId) => {
      axios.post(`/api/patients/${patientId}`)
      .then((response) => {
         if(response.status === 200)
            this.setState({dentalRecord: response.data.patient});
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   render() {
      const lastVisit = moment(this.state.dentalRecord.last_visit).format('MMMM DD, YYYY');
      const birthday = moment(this.state.dentalRecord.birthday).format('MMMM DD, YYYY');
      const age = moment().diff(this.state.dentalRecord.birthday, 'years');
      return (
         <React.Fragment>
         <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
            <Tabs tabPosition="top">
               <TabPane tab="My Dental Record Info" key="1">
                  <Row type="flex">
                     <Col span={8}><DescriptionItem title="Code" content={this.state.dentalRecord.code} /></Col>
                     <Col span={8}><DescriptionItem title="Name" content={this.state.dentalRecord.name} /></Col>
                     <Col span={8}><DescriptionItem title="Last Visit" content={lastVisit} /></Col>
                     <Col span={8}><DescriptionItem title="Birthday" content={birthday} /></Col>
                     <Col span={8}><DescriptionItem title="Age" content={age} /></Col>
                     <Col span={8}><DescriptionItem title="Address" content={this.state.dentalRecord.address} /></Col>
                     <Col span={8}><DescriptionItem title="Occupation" content={this.state.dentalRecord.occupation}/></Col>
                     <Col span={8}><DescriptionItem title="Civil Status" content={this.state.dentalRecord.civil_status} /></Col>
                     <Col span={8}><DescriptionItem title="Contact Number" content={this.state.dentalRecord.contact_number} /></Col>
                  </Row>
               </TabPane>
               <TabPane tab="My Balances" key="2">
               
               </TabPane>
               <TabPane tab="My Appointments" key="3">
               
               </TabPane>
            </Tabs>
   
         </Content> 
         </React.Fragment>
      );
   }
}

export default PatientHomePage;