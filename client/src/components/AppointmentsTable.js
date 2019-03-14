import React from 'react';
import {Table, Row, Col, AutoComplete, Typography} from 'antd'

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
      
      const TableTitle = () => {
         return (
            <React.Fragment>
               <Row>
               <Col span={24}>
                     <AutoComplete 
                        style={{width: '100%'}}
                        placeholder="search dental record by patient name"
                        // dataSource={this.state.patients.map(patient => patient.name)}
                        // filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        // onSelect={this.handleNameSelect}
                        // onChange={this.handleSearchErased}
                     />
                     <p>Add New Appointment</p>
                  </Col>
               </Row>
            </React.Fragment>
         );
      }


      return (
         <Table
            title={TableTitle}
            dataSource={this.state.appointments}
            size="middle"
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
      );
   }
}


export default AppointmentsTable;