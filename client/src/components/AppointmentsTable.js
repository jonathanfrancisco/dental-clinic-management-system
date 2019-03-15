import React from 'react';
import {Button, Table, Row, Col, Input, Typography, DatePicker} from 'antd'


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
            
            <Row gutter={8}>
               <Col style={{marginBottom:8}} span={12}>
                  <Text>Search by name:</Text>
                  <Search 
                     style={{width: '100%', zIndex: -999}}
                     placeholder="search appointment by patient name"
                     enterButton
                     // onSearch={(value) => this.getPatients(value)}
                     // onChange={this.handleSearchErased}
                  />      
               </Col>
               <Col style={{marginBottom:8}} span={12}>
                  <Text>Filter by date:</Text>
                  <DatePicker style={{width: '100%'}}/>
               </Col>
               <Col style={{marginBottom:8}} span={8}>
                  <Text>Filter by month:</Text>
                  <MonthPicker style={{width: '100%'}} />  
               </Col>
               <Col style={{marginBottom:8}} span={8}>
                  <Text>Filter by week:</Text>
                  <WeekPicker style={{width: '100%'}}/>  
               </Col>
               <Col style={{marginBottom:8}} span={8}>
                  <Text>Filter by range:</Text>
                  <RangePicker style={{width: '100%'}} />  
               </Col>
               </Row>
               <Row>
                  <Col align="right" span={24}>
                     <Button type="default">Clear search & filter(s)</Button>
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