import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col, Modal, message, Typography, Popconfirm} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CreateAccountModal from './CreateAccountModal';

const {Title, Text} = Typography;

class UserAccountsTable extends React.Component {

   state ={
      loading: false,
      users: []
   };

   componentDidMount() {
      this.getUsers();
   }

   getUsers() {
      this.setState({loading: true});
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


   render() {

      const columns = [
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
               return record.role === 'dentist' ? 'Dentist' : 'Dental Aide';
            }
         }, 
         {
            title: <Text strong>Actions</Text>,
            dataIndex: 'actions',
            render: (text, record) => (
               <React.Fragment>
                  <Link to={`/useraccounts/${record.id}`}>
                     <Button style={{marginRight: 8}} type="primary"><Icon type="solution" />View user account</Button>
                  </Link>
                  <Popconfirm title="Are you sure?" onConfirm={() => this.handleDelete(record.id)} okText="Yes" cancelText="No">
                     <Button type="danger"><Icon type="delete" />Delete user account</Button>
                  </Popconfirm>
               </React.Fragment>
            )
         }
      ];
   
       
      return (
         <React.Fragment>
            <Row style={{marginBottom: 8}} type="flex" align="middle">
               <Col span={12}>
                  <Title level={4} style={{margin: 0}}>USER ACCOUNTS</Title>
               </Col>
               <Col align="right" span={12}>
                  <CreateAccountModal onCreate={this.handleCreate} />
               </Col>
            </Row>
            <Table
               size="middle"
               columns={columns}
               dataSource={this.state.users}
               bordered
               scroll={{x: 300}}
               loading={this.state.loading}
               rowKey={(record) => record.id}
               pagination={
                  {
                     showSizeChanger: true,
                     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} accounts`,
                     defaultCurrent: 1,
                     pageSize: 4,
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