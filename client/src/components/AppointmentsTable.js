import React from 'react';
import {Table} from 'antd'

class AppointmentsTable extends React.Component {

   state = {
      loading: true,
      appointments: []
   };
   
   render() {

      const columns = [
         {
            title: 'Date & Time',
            dataIndex: 'date_time',
            render: (text, record) => {
               return record.date_time;
            }
         },
         {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => {
               return record.name;
            }
         },
         {
            title: 'Status',
            dataIndex: 'status',
            render: (text, record) => {
               return record.status;
            }
         },
         {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
               return 'Actions bruh';
            }
         }
      ];

      return (
         <Table
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