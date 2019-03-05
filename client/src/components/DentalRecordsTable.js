import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col, Modal, message} from 'antd';
import moment from 'moment';
import axios from 'axios';

class DentalRecordsTable extends React.Component {

   state ={
      loading: false,
      patients: []
   };

   componentDidMount() {
      this.getPatients();
   }

   getPatients() {
      this.setState({loading: true});
      axios.get('/api/patients/')
      .then((response) => {
         this.setState({patients: response.data.patients, loading: false});
      })
      .catch((err) => {
         console.log(err);
      }) ;
   }

   render() {

      const columns = [
         {
            title: 'Last Visit',
            dataIndex: 'last_visit',
            render: (text, record) => {
               return moment(record.last_visit).format('MMMM, DD YYYY');
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
         },
         {
            title: 'Code',
            dataIndex: 'code',
            render: (text, record) => {
               return record.code;
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
               dataSource={this.state.patients}
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

