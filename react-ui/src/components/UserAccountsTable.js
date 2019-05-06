import React from 'react';
import { Table, Button, Icon, Row, Col, message, Typography, Popconfirm, Input} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CreateAccountModal from './CreateAccountModal';

const {Search} = Input;
const {Title, Text} = Typography;

class UserAccountsTable extends React.Component {

   state ={
      loading: false,
      searchInput: '',
      users: []
   };

   componentDidMount() {
      this.getUsers();
   }

   getUsers(searchValue) {
      this.setState({loading: true});


      if(searchValue) {
         const hide = message.loading('Searching...', 0);
         axios.get('/api/users/', {
            params: {search: searchValue}
         })
         .then((response) => {
            this.setState({users: response.data.users, loading: false});
            setTimeout(() => {
               this.setState({loading: false});
               message.info(`${response.data.users.length} user(s) found`);
               hide();
            },500);
         })
         .catch((err) => {
            console.log(err);
         }) ;
      }

      else {
         axios.get('/api/users/')
         .then((response) => {
            this.setState({users: response.data.users, loading: false});
            setTimeout(() => {
               this.setState({loading: false});
            },500);
         })
         .catch((err) => {
            console.log(err);
         }) ;
      }

   }

   handleCreate = (values) => {
      const hide = message.loading('Creating New Account...', 0);
      values.birthday = values.birthday.format('YYYY-MM-DD');
      axios.post('/api/users/create', values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('Account Created Successfully');
            this.getUsers();
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Something went wrong! Please, try again.');
      });
   }

   handleDelete(id) {
      const hide = message.loading('Deleting Acccount...', 0);
      axios.delete(`/api/users/${id}/delete`)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('Account deleted successfully');
            this.getUsers();
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Something went wrong! Please, try again.');
      });
   }


   handleSearchErased = (e) => {
      const {value} = e.target;
     if(value === '')
      this.getUsers(value);
   }

   render() {

      const columns = [
         {
            title: <Text strong>Account Username</Text>,
            dataIndex: 'username',
            render:(text, record) => {
               return record.username;
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
            title: <Text strong>Role</Text>,
            dataIndex: 'role',
            render: (text, record) => {
               return record.role === 'dentist' ? 'Dentist' : record.role === 'dentalaide' ? 'Dental Aide' : 'Patient';
            }
         }, 
         {
            title: <Text strong>Actions</Text>,
            dataIndex: 'actions',
            render: (text, record) => (
               <React.Fragment>
                  <Link to={`/useraccounts/${record.id}`}>
                     <Button style={{marginRight: 8}} type="primary"><Icon type="solution" />View User Account</Button>
                  </Link>
                  <Popconfirm title="Are you sure?" onConfirm={() => this.handleDelete(record.id)} okText="Yes" cancelText="No">
                     <Button type="danger"><Icon type="delete" />Delete User Account</Button>
                  </Popconfirm>
               </React.Fragment>
            )
         }
      ];
   
       
      return (
         <React.Fragment>
            <Row type="flex" align="left">
               <Col span={24}>
                  <Title level={4} style={{margin: 0}}>USER ACCOUNTS</Title>
               </Col>
               <Col align="right" span={24}>
                  <CreateAccountModal onCreate={this.handleCreate} />
               </Col>
            </Row>
            <Row style={{marginTop: 8}}>
               <Col span={24}>
                  <Search 
                    style={{width: '100%', zIndex: -999}}
                    placeholder="search user account by name or username"
                    enterButton
                    onSearch={(value) => this.getUsers(value)}
                    onChange={this.handleSearchErased}
                  />     
               </Col>
            </Row>
            <Table
               style={{marginTop: 8}}
               size="medium"
               columns={columns}
               dataSource={this.state.users}
               scroll={{x: 300}}
               loading={this.state.loading}
               rowKey={(record) => record.id}
               pagination={
                  {
                     showSizeChanger: true,
                     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} accounts`,
                     defaultCurrent: 1,
                     pageSize: 8,
                     onChange: (page, pageSize) => {
                        this.getUsers();
                       
                     }
                  }
               }
            />
         </React.Fragment>
      );
   }
 
}

export default UserAccountsTable;