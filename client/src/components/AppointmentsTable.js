import React from 'react';
import {Popconfirm, Badge, Icon, Button, Table, Row, Col, Input, Typography, DatePicker, Radio, Divider} from 'antd';
import moment from 'moment';

import CreateAppointmentModal from './CreateAppointmentModal';

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;;
const {Search} = Input;
const {Title, Text} = Typography;


class AppointmentsTable extends React.Component {

   state = {
      search: '',
      selectedFilterBy: '',
      rangeDate: [],
   };

   handleSearchChange = (e) => {
      const {value} = e.target;
      this.setState({search: value});
      if(value === '')
         this.props.getAppointments(value, this.state.rangeDate);
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
            render: (text, record) => {
               return record.status === 'confirmed' ? (<Badge status="success" text="confirmed"/>) 
               : record.status === 'pending' ? (
                  <Popconfirm placement="topRight" title="What would you like to do with this appointment?" cancelText="Cancel" cancelButtonProps={{type: 'danger'}} okText="Confirm">
                     <a href="#"><Badge status="processing" text={<Text style={{color: '#108ee9'}}>pending</Text>}/></a>
                  </Popconfirm>
               ) 
               : (<Badge status="error" text="cancelled"/>) }
         }
      ];
      
      return (
         <React.Fragment>
            
            <Row align="middle" gutter={8}>
               <Col style={{marginBottom: '12px'}} align="right">
                  <CreateAppointmentModal />
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
               style={{marginTop: 21}}
               dataSource={this.props.appointments}
               size="small"
               columns={columns}
               bordered
               scroll={{x: 300}}
               rowKey={(record) => record.id}
               pagination={
                  {
                     defaultCurrent: 1,
                     pageSize: 5,
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