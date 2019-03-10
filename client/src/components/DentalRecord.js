import React from 'react';
import {Link} from 'react-router-dom';
import {Table, Typography, Skeleton, Row, Col, Tag, Card, Divider, Icon, Tabs, message} from 'antd';
import axios from 'axios';
import moment from 'moment';

import DescriptionItem from '../components/DescriptionItem';
import AdultTeethChart from '../components/AdultTeethChart';
import ChildTeethChart from '../components/ChildTeethChart';

import UpdatePersonalInfoModal from './UpdatePersonalInfoModal';

const {TabPane} = Tabs;
const {Title, Text} = Typography;


class DentalRecord extends React.Component {

   state = {
      loading: true,
      patient: {},
      treatments: []
   };

   componentDidMount() {
      this.getRecord(this.props.code);
   }

   getRecord(code) {
      this.setState({loading: true});
      axios.get(`/api/patients/${code}`)
      .then((response) => {
         if(response.status === 200)
            this.setState({patient: response.data.patient});
      })
      .then(() => {
         setTimeout(() => {
            this.setState({loading: false});
         },800)
      })
      .catch((err) => {
         console.error(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   handleUpdate = (code, values) => {
      const hide = message.loading('Updating Personal Info...', 0);
      values.birthday = values.birthday.format('YYYY-MM-DD');
      axios.patch(`/api/patients/${code}/update`, values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('Personal Info Updated Successfully');
            this.getRecord(code);
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Something went wrong! Please, try again.');
      });
   }

   render() {
     
      const lastVisit = moment(this.state.patient.last_visit).format('YYYY-MM-DD HH:MM:SS') === '1000-01-01 00:01:00' 
      ? <Tag color="geekblue">New Record</Tag> : moment(this.state.patient.last_visit).format('MMMM, DD YYYY');
      const birthday = moment(this.state.patient.birthday).format('MMMM DD, YYYY');
      return (
         <React.Fragment>
            <div style={{marginBottom: 8}}>
               <a>
                  <Link to="/dentalrecords"> <Icon type="arrow-left" /> Back to dental records</Link>
               </a>
            </div>
               {this.state.loading ? (<Skeleton loading={this.state.loading} paragraph={{rows: 14}} active />) : (
                   <Card>
                   <Tabs defaultActiveKey="1">
                      <TabPane tab="Personal Info" key="1">
                      <Divider orientation="left">Personal Info <UpdatePersonalInfoModal patient={this.state.patient} onUpdate={this.handleUpdate} /></Divider>
                         <Row>
                            <Col span={8}><DescriptionItem title="Code" content={this.state.patient.code}/></Col>
                            <Col span={8}><DescriptionItem title="Name" content={this.state.patient.name} /></Col>
                            <Col span={8}><DescriptionItem title="Last Visit" content={lastVisit}/></Col>
                            <Col span={8}><DescriptionItem title="Birthday" content={birthday} /></Col>
                            <Col span={8}><DescriptionItem title="Occupation" content={this.state.patient.occupation} /></Col>
                            <Col span={8}><DescriptionItem title="Civil Status" content={this.state.patient.civil_status} /></Col>
                            <Col span={12}><DescriptionItem title="Address" content={this.state.patient.address} /></Col>
                            <Col span={12}><DescriptionItem title="Contact Number" content={this.state.patient.contact_number} /></Col>
                         </Row>
                      </TabPane>
                      <TabPane tab="Treatments and/or Procedures" key="2">
                        <Divider orientation="left">Treatments and/or Procedures taken <a><Icon type="plus" /> Add</a></Divider>
                      </TabPane>
                      <TabPane tab="Dental Chart" key="3">
                         <Divider orientation="left">Child Teeth (LEFT) and Adult Teeth (RIGHT)</Divider>
                         
                         <Row>
                           <Col align="center" span={24}>
                           <Text strong>Legend: </Text>
                           <br />
                           <Tag color="#ffc53d">Decayed</Tag>
                           <Tag color="#ff4d4f">Missing</Tag>
                           <Tag color="#40a9ff">Filled Teeth</Tag>
                           </Col>
                           <Col align="center" md={{span:12}} sm={{span: 24}}>
                              <ChildTeethChart patientId={this.state.patient.id}/>
                           </Col>
                           <Col align="center" md={{span: 12}} sm={{span: 24}}>
                               <AdultTeethChart patientId={this.state.patient.id}/>
                           </Col>
                         </Row>
                      </TabPane>
                   </Tabs>
                   
                </Card> 
               )}
         </React.Fragment>
      );
   }
}

export default DentalRecord;