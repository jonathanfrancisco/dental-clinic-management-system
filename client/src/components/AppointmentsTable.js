import React from 'react';
import {Modal, message, Menu, Dropdown,Badge, Icon, Button, Table, Row, Col, Input, Typography, DatePicker, Radio, Divider} from 'antd';
import moment from 'moment';
import DeclineCancelAppointmentModal from './DeclineCancelAppointmentModal';

import CreateAppointmentModal from './CreateAppointmentModal';
import axios from 'axios';


const {confirm} = Modal;
const {RangePicker} = DatePicker;;
const {Search} = Input;
const {Text} = Typography;


class AppointmentsTable extends React.Component {

   state = {
      search: '',
      selectedFilterBy: '',
      rangeDate: [],
   };

   handleAppointmentCreate = (values) => {
      values.date_time = values.date_time.format('YYYY-MM-DD HH:mm');
      const hide = message.loading('Creating New Appointment...', 0);
      axios.post('/api/appointments/create/in-person', values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('New Appointment Successfully Created');
            this.props.getAppointments(this.state.search, this.state.rangeDate);
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Something went wrong! Please, try again.');
      });
      
   }

   handleSearchChange = (e) => {
      const {value} = e.target;
      this.setState({search: value});
      if(value === '')
         this.props.getAppointments(value, this.state.rangeDate);
   }

   handleNoContactNumber = (values) => {
      confirm({
         title: `Are you sure to ${values.type} this appointment?!`,
         content: 'This patient does not have available contact number, therefore will not be notified through SMS.',
         okText: 'Yes',
         onOk: () => {
            this.handleDeclineCancelAppointment(values);
         },
         onCancel() {
         },
       });
   }

   handleDeclineCancelAppointment = (values) => {
      
      const hide = message.loading(`${values.type === 'cancel' ? 'Cancelling' : 'Declining'} appointment...`, 0);
      axios.patch('/api/appointments/decline-cancel',values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success(`Appointment Successfully ${values.type === 'cancel' ? 'Cancelled' : 'Declined'} `);
            this.props.getAppointments(this.state.search, this.state.rangeDate);
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Something went wrong! Please, try again.');
      });
     
   }

   handleConfirmAppoinment = (values) => {
      const hide = message.loading(`Confirming appointment...`, 0);
      axios.post('/api/appointments/confirm',values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success(`Appointment Successfully Confirmed`);
            this.props.getAppointments(this.state.search, this.state.rangeDate);
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Something went wrong! Please, try again.');
      });
   }

   onRadioChange = async (e) => {
      const {value: filterBy} = e.target;
      await this.setState({selectedFilterBy: filterBy});
      if(filterBy === 'day')
         await this.setState({rangeDate: [moment(), moment()]});  
      else if(filterBy === 'week')
         await this.setState({rangeDate: [moment().startOf('week'), moment().endOf('week')]});
      else if(filterBy === 'month')
         await this.setState({rangeDate: [moment().startOf('month'), moment().endOf('month')]});
      else if(filterBy === 'year')
         await this.setState({rangeDate: [moment().startOf('year'), moment().endOf('year')]});
      this.props.getAppointments(this.state.search, this.state.rangeDate);
    }
   
    onRangePickerChange =  async (dates, dateStrings) => {
      await this.setState({selectedFilterBy: ''});
      await this.setState({rangeDate: dates});
      this.props.getAppointments(this.state.search, this.state.rangeDate);
    }

   render() {

      const columns = [
         {
            title: <Text strong>Date and Time</Text>,
            dataIndex: 'date_time',
            render: (text, record) => {
               const date = moment(record.date_time).format('MMMM DD, YYYY');
               const time = moment(record.date_time).format('h:mm A');
               return (
                  <React.Fragment>
                     <Text>{date}</Text>
                     <Divider type="vertical"/>
                     <Text>{time}</Text>
                  </React.Fragment>
               );
            }
         },
         {
            title: <Text strong>Patient Name</Text>,
            dataIndex: 'name',
            render: (text, record) => {
               return record.name;
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
            filters: [{
               text: 'Confirmed',
               value: 'confirmed',
             }, {
               text: 'Cancelled',
               value: 'cancelled',
             }, {
               text: 'Pending',
               value: 'pending',
             }],
            filterMultiple: false,
            onFilter: (value, record) => {
              return record.status.indexOf(value) === 0;
            },
            render: (text, record) => {
            return record.status === 'confirmed' ? (<Badge status="success" text={<Text style={{color: '#73d13d'}}>Confirmed</Text>}/>) 
               : record.status === 'pending' ? (    
                  <Badge status="processing" text={<Text style={{color: '#108ee9'}}>Pending</Text>}/>
               ) 
               : record.status === 'declined' ? (
                  (<Badge status="error" text={<Text style={{color: '#ff7875'}}>Declined</Text>}/>)
               )
               : (<Badge status="error" text={<Text style={{color: '#ff7875'}}>Cancelled</Text>}/>) }
         },
         {
            title: <Text strong>Actions</Text>,
            dataIndex: 'actions',
            render: (text, record) => {

               const isAppointmentPast = moment(record.date_time).format('X') < moment(Date.now()).format('X');
               const menu = record.status === 'pending' ? (
                  <Menu>
                     <Menu.Item> 
                        <a 
                           onClick={() => {
                              this.handleConfirmAppoinment({id: record.id,
                                 date_time: record.date_time,
                                 name: record.name, contact_number:
                                 record.contact_number
                              });
                           }}
                           target="_blank" rel="noopener noreferrer" >Confirm Appointment</a>
                     </Menu.Item>
                     <Menu.Item>
                        {record.contact_number ? <DeclineCancelAppointmentModal 
                                                   onDeclineCancel={this.handleDeclineCancelAppointment} 
                                                   appointment={{id: record.id, date_time: record.date_time, name: record.name, contact_number: record.contact_number}} type="decline" /> 
                                                   :   <a
                                                   onClick={() => this.handleNoContactNumber({id: record.id, date_time: record.date_time, name: record.name, contact_number: record.contact_number, type: 'decline'})} 
                                                   target="_blank" rel="noopener noreferrer">
                                                   Decline Appointment
                                                </a>} 
                     </Menu.Item>
                  </Menu>
               ) : (
                  <Menu>
                     <Menu.Item disabled> 
                        Confirm Appointment
                     </Menu.Item>
                     
                     {
                        isAppointmentPast ? (
                           <Menu.Item disabled> 
                              Cancel Appointment
                           </Menu.Item>
                        ) : (
                           <Menu.Item>
                               {record.contact_number ? <DeclineCancelAppointmentModal 
                                                         onDeclineCancel={this.handleDeclineCancelAppointment} 
                                                         appointment={{id: record.id, date_time: record.date_time, name: record.name, contact_number: record.contact_number}} type="cancel" /> 
                                                         :  <a
                                                               onClick={() => this.handleNoContactNumber({id: record.id, date_time: record.date_time, name: record.name, contact_number: record.contact_number, type: 'cancel'})} 
                                                               target="_blank" rel="noopener noreferrer">
                                                               Cancel Appointment
                                                            </a> } 
                           </Menu.Item>
                        )
                     }
                  </Menu>
               );

               const disabledDropdown = (record.status === 'cancelled'
                                    || record.status === 'declined'
                                    || (record.status === 'pending' && isAppointmentPast)
                                    || (record.status === 'confirmed' && isAppointmentPast)
               ) ?  true : false;
              
               return (
                  <Dropdown disabled={disabledDropdown} overlay={menu} trigger={['click']}>
                     <Button>
                        Actions <Icon type="down" />
                     </Button>
                  </Dropdown>
               );
            }
         }
      ];
      
      return (
         <React.Fragment>
            
            <Row align="middle" gutter={8}>
               <Col style={{marginBottom: 8}} align="right">
                  <CreateAppointmentModal onCreate={this.handleAppointmentCreate}/>
               </Col>
               <Col style={{marginBottom:8}} span={24}>
                  <Search 
                     style={{width: '100%', zIndex: -999}}
                     placeholder="search appointment by patient name"
                     enterButton
                     onSearch={(value) => this.props.getAppointments(value, this.state.rangeDate)}
                     onChange={this.handleSearchChange}
                  />      
               </Col>
               <Col span={12} align="right">
                  <Radio.Group value={this.state.selectedFilterBy} onChange={this.onRadioChange}>
                     <Radio.Button value="day">All Today</Radio.Button>
                     <Radio.Button value="week">All Week</Radio.Button>
                     <Radio.Button value="month">All Month</Radio.Button>
                     <Radio.Button value="year">All Year</Radio.Button>
                  </Radio.Group>
               </Col>
               <Col style={{marginBottom:8}} span={12}>
                  <RangePicker allowClear={true} value={this.state.rangeDate} format="MMMM DD, YYYY" onChange={this.onRangePickerChange} style={{width: '100%'}} />  
               </Col>
               </Row>
            <Table
               loading={this.props.tableLoading}
               dataSource={this.props.appointments}
               size="medium"
               columns={columns}
               scroll={{x: 300}}
               rowKey={(record) => record.id}
               pagination={
                  {
                     position: 'both',
                     defaultCurrent: 1,
                     pageSize: 8,
                     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} appointments`,
                     onChange: (page, pageSize) => {
                       this.props.getAppointments(this.state.search, this.state.rangeDate);
                     }
                  }
               }
            />
         </React.Fragment>
      );
   }
}


export default AppointmentsTable;