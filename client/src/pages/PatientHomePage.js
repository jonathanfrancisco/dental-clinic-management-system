import React from 'react';
import {Alert, Button, Icon, Badge, Layout, Row,Tabs, Col, notification, Typography, Table, Tag, message, Popconfirm} from 'antd';
import DescriptionItem from '../components/DescriptionItem';
import axios from 'axios';
import moment from 'moment';
import PatientCreateAppointmentModal from '../components/PatientCreateAppointmentModal';

const {TabPane} = Tabs;
const {Text, Title} = Typography;
const {Content} = Layout;

class PatientHomePage extends React.Component {

   state = {
      dentalRecord: {},
      balances: [],
      myAppointments: [],
      myAppointmentsLoading: false,
      dentistAppointments: []
   };


   componentDidMount() {
      this.getDentalRecord(this.props.user.patient_id);
      this.getMyBalances(this.props.user.patient_id);
      this.getMyAppointments(this.props.user.patient_id);
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

   getMyBalances = (patientId) => {
      axios.get(`/api/patients/${patientId}/myBalances`)
      .then((response) => {
         if(response.status === 200)
            this.setState({balances: response.data.balances});
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   getMyAppointments = (patientId) => {
      this.setState({myAppointmentsLoading: true});
      axios.get(`/api/patients/${patientId}/myAppointments`)
      .then((response) => {
         if(response.status === 200) {
            this.setState({myAppointments: response.data.appointments});
            setTimeout(() => {
               this.setState({myAppointmentsLoading: false});
            }, 800);
         }
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }
   
   handleCreateAppointment = (values) => {
      values.date_time = values.date_time.format('YYYY-MM-DD HH:mm');
      axios.post('/api/appointments/create/online', values)
      .then((response) => {
         if(response.status === 200) {
            this.getMyAppointments(this.props.user.patient_id);
            notification['info']({
               message: 'Appointment Successfully Created',
               description: 'You will be notified through SMS once your appointment is confirmed.',
            });
         }
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
      
   }

   handleCancelAppointment = (appointmentId) => {
      axios.post(`/api/patients/${appointmentId}/cancelAppointment`)
      .then((response) => {
         if(response.status === 200)
            this.getMyAppointments(this.props.user.patient_id)
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   render() {

      const balancesColumns = [
         {
            title: <Text strong>Date Treated</Text>,
            dataIndex: 'date_treated',
            render: (text, record) => {
               return moment(record.date_treated).format('MMMM DD, YYYY');
            }
         },
         {
            title: <Text strong>Description</Text>,
            dataIndex: 'description',
            render: (text, record) => {
               return record.description;
            }
         }, 
         {
            title: <Text strong>Balance</Text>,
            dataIndex: 'balance',
            render: (text, record) => {
               return <Tag color="red">{'₱'+record.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Tag>;
            }
         }
      ];

      const appointmentsColumns = [
         {
            title: <Text strong>Date and Time</Text>,
            dataIndex: 'date_time',
            render: (text, record) => {
               return moment(record.date_time).format('MMMM DD, YYYY h:mm A');
            }
         },
         {
            title: <Text strong>Reason</Text>,
            dataIndex: 'reason',
            render: (text, record) => {
               return record.reason;
            }
         },
         {
            title: <Text strong>Status</Text>,
            dataIndex: 'status',
            render: (text, record) => {
               return record.status === 'confirmed' ? (<Badge status="success" text={<Text style={{color: '#73d13d'}}>Confirmed</Text>}/>) 
               : record.status === 'pending' ? (    
                  <Badge status="processing" text={<Text style={{color: '#108ee9'}}>Pending</Text>}/>
               ) 
               : record.status === 'declined' ? (
                  (<Badge status="error" text={<Text style={{color: '#ff7875'}}>Declined</Text>}/>)
               )
               : (<Badge status="error" text={<Text style={{color: '#ff7875'}}>Cancelled</Text>}/>) 
            }
         },
         {
            title: <Text strong>Action(s)</Text>,
            dataIndex: 'actions',
            render: (text, record) => {
               const isAppointmentPast = moment(record.date_time).format('X') < moment(Date.now()).format('X');
               const disabled = (record.status === 'cancelled'
                                    || record.status === 'declined'
                                    || (record.status === 'pending' && isAppointmentPast)
                                    || (record.status === 'confirmed' && isAppointmentPast)
               ) ?  true : false;
              
               const cancelDeclineButton = record.status === 'pending' ? (
                  <Popconfirm title="Are you sure?" okText="Yes" cancelText="No" onConfirm={() => this.handleCancelAppointment(record.id)}>
                     <Button disabled={disabled}  okText="Yes" cancelText="No" type="danger">
                        Cancel Appointment Request
                     </Button>
                  </Popconfirm>
   
               ) : (
                  <Popconfirm title="Are you sure?" onConfirm={() => this.handleCancelAppointment(record.id)}>
                  <Button disabled={disabled} type="danger">
                     Cancel Appointment
                  </Button>
               </Popconfirm>
               );

               if(record.status === 'declined' || record.status === 'cancelled')
                  return null;
             
               return cancelDeclineButton;
            }
         }
      ];
      const lastVisit = moment(this.state.dentalRecord.last_visit).format('MMMM DD, YYYY');
      const birthday = moment(this.state.dentalRecord.birthday).format('MMMM DD, YYYY');
      const age = moment().diff(this.state.dentalRecord.birthday, 'years');
      return (
         <React.Fragment>
         <Content style={{margin: '24px 24px 24px 36px', padding: 24, background: '#fff'}}>
            <Title level={4}>HOME</Title>
            <Tabs tabPosition="top">
               <TabPane tab="My Dental Record Info" key="1">
                  <Alert style={{marginBottom: 11}} showIcon message="Note: You cannot edit or update any information on your Dental Record here except your contact number. In case of inaccurate information kindly contact us or visit us."/>
                  {!this.state.dentalRecord.contact_number ? (
                       <Alert style={{marginBottom: 11}} showIcon closable message="You have no provided contact number. Please, kindly provide one to be able to receive sms notifications (appointment reminder, promos, etc.)" type="warning" /> 
                  ) : null} 
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
                  <Table
                     locale={{emptyText: 'No Balances'}}
                     dataSource={this.state.balances}
                     size="medium"
                     columns={balancesColumns}
                     rowKey={(record) => record.id}
                     pagination={
                        {
                           position: 'bottom',
                           showSizeChanger: true,
                           showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} balances`,
                           defaultCurrent: 1,
                           pageSize: 8,
                           onChange: (page, pageSize) => {
                           
                           }
                        }
                     }
                  />
               </TabPane>
               <TabPane tab="My Appointments" key="3">
                  {!this.state.dentalRecord.contact_number ? (
                       <Alert style={{marginBottom: 11}} showIcon closable message="You have no provided contact number on your Dental Record. Please, kindly provide one to be able to receive sms notifications (appointment confirmation, cancellation, reminder, etc.)" type="warning" /> 
                  ) : null} 
                  <Row style={{marginBottom: 12}}>
                     <Col align="right">
                        <PatientCreateAppointmentModal onCreate={this.handleCreateAppointment} patientId={this.props.user.patient_id} />
                     </Col>
                  </Row>
                  <Table
                     locale={{emptyText: 'No Appointments'}}
                     loading={this.state.myAppointmentsLoading}
                     dataSource={this.state.myAppointments}
                     size="medium"
                     columns={appointmentsColumns}
                     rowKey={(record) => record.id}
                     pagination={
                        {
                           position: 'bottom',
                           defaultCurrent: 1,
                           pageSize: 8,
                           showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} appointments`,
                           onChange: (page, pageSize) => {

                           }
                        }
                     }
                  />
               </TabPane>
            </Tabs>
   
         </Content> 
         </React.Fragment>
      );
   }
}

export default PatientHomePage;