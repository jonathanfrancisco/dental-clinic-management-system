import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col, Modal, message} from 'antd';
import axios from 'axios';
import CreateAccountModal from './CreateAccountModal';
import ViewAccountModal from './ViewAccountModal';

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
      axios.get('/api/user/')
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
      axios.post('/api/user/create', values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('Account created successfully');
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
      axios.delete('/api/user/delete', {data: {id}})
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
            title: 'Fullname',
            dataIndex: 'full_name',
            render: (text, record) => {
               return `${record.first_name} ${record.middle_name || ''} ${record.last_name}`;
            }
         }, 
         {
            title: 'Role',
            dataIndex: 'role',
            render: (text, record) => {
               return record.role === 'dentist' ? 'Dentist' : 'Dental Aide';
            }
         }, 
         {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
               <React.Fragment>
                  <Tooltip title="View Account">
                     <ViewAccountModal account={record} />
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip title="Edit Account">
                     <Button><Icon type="form" /></Button>
                  </Tooltip>
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
               <Row>
                  <Col span={12}>
                     <h1 style={{margin: 0}} >User Accounts</h1>
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
               size="small"
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