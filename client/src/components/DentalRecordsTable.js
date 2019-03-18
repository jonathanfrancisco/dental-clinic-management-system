import React from 'react';
import {Table, Button, Icon, Row, Col, message, Typography, Input, Tag} from 'antd';
import {Link} from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import CreateDentalRecordModal from './CreateDentalRecordModal'

const {Search} = Input;
const {Title, Paragraph, Text} = Typography;

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
               this.setState({patients: response.data.patients});
               setTimeout(() => {
                  this.setState({loading: false});
                  message.info(`${response.data.patients.length} Record(s) found`);
               },500); 
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

   handleCreate = (values) => {
      const hide = message.loading('Creating New Dental Record...', 0);
      values.birthday = values.birthday.format('YYYY-MM-DD');
      axios.post('/api/patients/create', values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('New Dental Record Created Successfully');
            this.getPatients();
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Something went wrong! Please, try again.');
      });
   }

   // when search button submits
   // handleSearch = (value) => {
   //    // this.getPatients(value);
   // }

   handleSearchErased = (e) => {
      const {value} = e.target;
     if(value === '')
      this.getPatients(value);
   }

   render() {

      const columns = [
         {
            title: <Text strong>Name</Text>,
            dataIndex: 'name',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.name.toLowerCase().substring(0,2) < b.name.toLowerCase().substring(0,2),
            render: (text, record) => {
              return record.name;
            }
         }, 
         {
            title: <Text strong>Last Visit</Text>,
            width: 200,
            dataIndex: 'last_visit',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => moment(a.last_visit).format('x') - moment(b.last_visit).format('x'),
            render: (text, record) => {
               const display = moment(record.last_visit).format('YYYY-MM-DD HH:MM:SS') === '1000-01-01 00:01:00' 
                              ? <Tag color="geekblue">New Record</Tag> : moment(record.last_visit).format('MMMM, DD YYYY');
               return display;
            }
         }, 
         {
            title: <Text strong>Address</Text>,
            dataIndex: 'address',
            render: (text, record) => {
               return record.address;
            }
         },
         {
            title: <Text strong>Code</Text>,
            dataIndex: 'code',
            render: (text, record) => {
               return <Paragraph copyable={true} >{record.code}</Paragraph>;
            }
         },
         {
            title: <Text strong>Actions</Text>,
            dataIndex: 'actions',
            render: (text, record) => {
               return (
                  <Link to={`/dentalrecords/${record.code}`}>
                     <Button type="primary"><Icon type="solution" />View Dental Record</Button>
                  </Link>
               );
            }
         }
      ];

   
      return (
         <React.Fragment>
            <Title level={4} style={{margin: 0}}>DENTAL RECORDS</Title>
               <Row>
                  <Col align="right" style={{marginBottom: '8px'}}>
                     <CreateDentalRecordModal onCreate={this.handleCreate} />
                  </Col>
                  <Col span={24}>
                        <Search 
                           style={{width: '100%', zIndex: -999}}
                           placeholder="search dental record by patient name"
                           enterButton
                           onSearch={(value) => this.getPatients(value)}
                           onChange={this.handleSearchErased}
                        />               
                  </Col>
               </Row>
            <Table
               size="small"
               columns={columns}
               dataSource={this.state.patients}
               locale={{emptyText: this.state.search === '' ? 'No Data' : 'No Record Found'}}
               bordered
               scroll={{x: 300}}
               loading={this.state.loading}
               rowKey={(record) => record.id}
               
               pagination={
                  {
                     position: 'both',
                     showSizeChanger: true,
                     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} dental records`,
                     defaultCurrent: 1,
                     pageSize: 11,
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

