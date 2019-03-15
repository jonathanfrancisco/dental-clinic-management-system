import React from 'react';
import {Icon, Button, Table, Row, Col, Input, Typography, DatePicker, Radio} from 'antd'


const {MonthPicker, RangePicker, WeekPicker} = DatePicker;;
const {Search} = Input;
const {Title, Text} = Typography;


class AppointmentsTable extends React.Component {

   state = {
      loading: true,
      appointments: []
   };
   
   render() {

      const columns = [
         {
            title: <Text strong>Date & Time</Text>,
            dataIndex: 'date_time',
            render: (text, record) => {
               return record.date_time;
            }
         },
         {
            title: <Text strong>Name</Text>,
            dataIndex: 'name',
            render: (text, record) => {
               return record.name;
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
            title: <Text strong>Status</Text>,
            dataIndex: 'status',
            render: (text, record) => {
               return record.status;
            }
         },
         {
            title: <Text strong>Actions</Text>,
            dataIndex: 'actions',
            render: (text, record) => {
               return 'Actions bruh';
            }
         }
      ];
      
  
      return (
         <React.Fragment>
            
            <Row align="center" gutter={8}>
               <Col style={{marginBottom: '12px'}} align="right">
                  <Button type="primary"><Icon type="add"/>Add New Appointment</Button>
               </Col>
               <Col style={{marginBottom:8}} span={24}>
                  <Search 
                     style={{width: '100%', zIndex: -999}}
                     placeholder="search appointment by patient name"
                     enterButton
                     // onSearch={(value) => this.getPatients(value)}
                     // onChange={this.handleSearchErased}
                  />      
               </Col>
               <Col span={12} align="right">
                  <Radio.Group>
                     <Radio.Button value="a">All Day</Radio.Button>
                     <Radio.Button value="b">All Week</Radio.Button>
                     <Radio.Button value="c">All Month</Radio.Button>
                     <Radio.Button value="d">All Year</Radio.Button>
                  </Radio.Group>
               </Col>
               <Col style={{marginBottom:8}} span={12}>
                  <RangePicker style={{width: '100%'}} />  
               </Col>
               </Row>
            <Table
               style={{marginTop: 21}}
               dataSource={this.state.appointments}
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
                     
                     }
                  }
               }
            />
         </React.Fragment>
      );
   }
}


export default AppointmentsTable;