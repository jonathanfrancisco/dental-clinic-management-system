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
      this.setState({loading: true, search: searchValue});
      if(searchValue) {
         const hide = message.loading('Searching...', 0);
         axios.get('/api/patients', {
            params: {search: searchValue}
         })
         .then((response) => {
            if(response.status === 200) {
               hide();
               this.setState({patients: response.data.patients, loading: false});
               message.info(`${response.data.patients.length} Record(s) found`);
            }
         })
         .catch((err) => {
            console.log(err);
            hide();
            message.error('Something went wrong! Please, try again.');
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

   handleSearchErased = (e) => {
     const {value} = e.target;
     if(value === '')
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
            title: 'Address',
            dataIndex: 'address',
            render: (text, record) => {
               return record.address;
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
                        onChange={this.handleSearchErased}
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
               locale={{emptyText: this.state.search === '' ? 'No Data' : 'No Record Found'}}
               bordered
               title={TableTitle}
               scroll={{x: 300}}
               loading={this.state.loading}
               rowKey={(record) => record.id}
               pagination={
                  {
                     defaultCurrent: 1,
                     pageSize: 7,
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

