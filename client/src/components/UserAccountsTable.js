import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col, Modal, message, Typography} from 'antd';

import axios from 'axios';
import CreateAccountModal from './CreateAccountModal';
import ViewAccountModal from './ViewAccountModal';
import UpdateAccountModal from './UpdateAccountModal';

const {Title, Text} = Typography;
const {confirm} = Modal;

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

   handleUpdate = (id, values) => {
      const hide = message.loading('Updating Account...', 0);
      values.birthday = values.birthday.format('YYYY-MM-DD');
      axios.patch(`/api/users/${id}/update`, values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('Account Updated Successfully');
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

   showDeleteConfirm = (id) => {
      confirm({
         title: 'System Message',
         content: 'Are you sure you want to delete this account?',
         okText: 'Yes',
         okType: 'danger',
         cancelText: 'No',
         onOk: () => {
           this.handleDelete(id);
         },
         onCancel() {

         },
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
                  <ViewAccountModal account={record} />
                  <Divider type="vertical" />          
                  <UpdateAccountModal onUpdate={this.handleUpdate}account={record}/>
                  <Divider type="vertical" />
                  <Tooltip title="Delete Account">
                     <Button type="danger" onClick={() => this.showDeleteConfirm(record.id)}><Icon type="delete" /></Button>
                  </Tooltip>
               </React.Fragment>
            )
         }
      ];
   
      const TableTitle = () => {
         return (
            <React.Fragment>
               <Row type="flex" align="middle">
                  <Col span={12}>
                     <Title level={4} style={{margin: 0}}>User Accounts</Title>
                  </Col>
                  <Col align="right" span={12}>
                     <CreateAccountModal onCreate={this.handleCreate} />
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
               dataSource={this.state.users}
               bordered
               title={TableTitle}
               scroll={{x: 300}}
               loading={this.state.loading}
               rowKey={(record) => record.id}
               pagination={
                  {
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