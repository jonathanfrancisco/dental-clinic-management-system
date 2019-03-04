import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col, Modal, message} from 'antd';
import axios from 'axios';

class DentalRecordsTable extends React.Component {

   state ={
      loading: false,
      dentalrecords: []
   };

   componentDidMount() {
  
   }

   render() {

      const columns = [
         {
            title: 'Last Visit',
            dataIndex: 'last_visit',
            render: (text, record) => {
               return record.last_visit;
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
            title: 'Occupation',
            dataIndex: 'occupation',
            render: (text, record) => {
               return record.occupation;
            }
         },
         {
            title: 'Civil Status',
            dataIndex: 'civil_status',
            render: (text, record) => {
               return record.civil_status;
            }
         }
      ];
   
      const TableTitle = () => {
         return (
            <React.Fragment>
               <Row type="flex" align="middle">
                  <Col span={12}>
                     <h1 style={{margin: 0}} >Dental Records</h1>
                  </Col>
                  <Col align="right" span={12}>
                     {/* create dental record modal */}
                  </Col>
               </Row>
            </React.Fragment>
         );
      }
       
      return (
         <React.Fragment>
            <Table
               size="middle"
               columns={columns}
               bordered
               title={TableTitle}
               scroll={{x: 300}}
               loading={this.state.loading}
               rowKey={(record) => record.id}
               pagination={
                  {
                     defaultCurrent: 1,
                     pageSize: 10,
                     onChange: (page, pageSize) => {
                       
                     }
                  }
               }
            />
         </React.Fragment>
      );
   }
 
}

export default DentalRecordsTable;

