import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col, Modal, message, Typography, Input} from 'antd';
import moment from 'moment';
import axios from 'axios';

const {Search} = Input;
const {Title, Paragraph} = Typography;

class DentalRecordsTable extends React.Component {

   state ={
      loading: false,
      patients: [],
      searchInput: '',
   };

   componentDidMount() {
      this.getPatients();
   }

   getPatients(searchValue) {
      console.log(searchValue);
      this.setState({loading: true});

      if(searchValue) {
         axios.get('/api/patients', {
            params: {search: searchValue}
         })
         .then((response) => {
            this.setState({patients: response.data.patients, loading: false});
         })
         .catch((err) => {
            console.log(err);
         });
      }
      else {
         axios.get('/api/patients/')
         .then((response) => {
            this.setState({patients: response.data.patients, loading: false});
         })
         .catch((err) => {
            console.log(err);
         });
      }


   }

   // when search button submits
   handleSearch = (value) => {
      this.getPatients(value);
   }

   // Live Suggest
   handleLiveSearch = (e) => {
     const {value} = e.target;
     this.getPatients(value);
   }

   render() {

      const columns = [
         {
            title: 'Last Visit',
            dataIndex: 'last_visit',
            defaultSortOrder: 'descend',
            sorter: (a, b) => moment(a.last_visit).format('x') - moment(b.last_visit).format('x'),
            render: (text, record) => {
               return moment(record.last_visit).format('MMMM, DD YYYY');
            }
         }, 
         {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.name.toLowerCase().substring(0,2) < b.name.toLowerCase().substring(0,2),
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
               return <Paragraph copyable={true} >{record.code}</Paragraph>;
            }
         },
         {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => {
               return <p>Actions</p>
            }
         }
      ];

   
      const TableTitle = () => {
         return (
            <React.Fragment>
               <Row style={{marginBottom: 8}} type="flex" align="middle">
                  <Col xs={{span: 24}} sm={{span: 12}} md={{span: 16}}>
                     <Title level={3} style={{margin: 0}}>Dental Records</Title>
                  </Col>
                  <Col xs={{span: 24}} sm={{span: 12}} md={{span: 8}}>
                  <Button style={{width: '100%'}} type="primary"><Icon type="idcard" />Create New Record</Button>
                  </Col>
               </Row>
               <Row>
               <Col span={24}>
                     <Search 
                        style={{width: '100%'}}
                        placeholder="search dental record by patient name"
                        enterButton
                        onSearch={this.handleSearch}
                        onChange={this.handleLiveSearch}
                     />               
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

