import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col, message} from 'antd';
import axios from 'axios';
import CreateAccountModalForm from './CreateAccountModalForm';

class UserAccountsTable extends React.Component {

   state ={
      loading: false,
      visibleCreateModal: false,
      users: []
   };

   componentDidMount() {
      this.getUsers();
   }

   getUsers() {
      axios.get('/api/user/')
      .then((response) => {
         this.setState({users: response.data.users});
      })
      .catch((err) => {
         console.log(err);
      }) ;
   }

   handleCreate = () => {
      const {form} = this.createFormRef.props;
      form.validateFields((err, values) => {
         if(err)
            return
         const hide = message.loading('Creating new Account...', 0);
         values.birthday = values.birthday.format('YYYY-MM-DD');
         axios.post('/api/user/create', values)
         .then((response) => {
            if(response.status === 200) {
               hide();
               message.success('Account created successfully');
               form.resetFields();
               this.setState({visibleCreateModal: false});
               this.getUsers();
            }
         })
         .catch((err) => {
            console.log(err);
            hide();
            message.error('Something went wrong! Please, try again.');
         });

      });
   }

   showCreateModal = () => {
      this.setState({visibleCreateModal: true});
   }

   handleCreateModalCancel = () => {
      const {form} = this.createFormRef.props;
      form.resetFields();
      this.setState({visibleCreateModal: false});
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
            render: () => (
               <React.Fragment>
                  <Tooltip title="View Account">
                     <Button type="primary"><Icon type="profile" /></Button>
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip title="Edit Account">
                     <Button><Icon type="form" /></Button>
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip title="Delete Account">
                     <Button type="danger"><Icon type="delete" /></Button>
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
                     <Button type="primary" onClick={this.showCreateModal}><Icon type="usergroup-add" />Create New Account</Button>
                     <CreateAccountModalForm
                        wrappedComponentRef={(form) => this.createFormRef = form}
                        visible={this.state.visibleCreateModal}
                        onCreate={this.handleCreate}
                        onCancel={this.handleCreateModalCancel}
                     />
                  </Col>
               </Row>
            </React.Fragment>
         );
      }
       
      return (
         <React.Fragment>
            <Table
               columns={columns}
               dataSource={this.state.users}
               bordered
               title={TableTitle}
               scroll={{x: 300}}
               loading={this.state.loading}
               pagination={
                  {
                     defaultCurrent: 1,
                     pageSize: 4,
                     onChange: (page, pageSize) => {
                        this.setState({loading: true});
                        setTimeout(() => {
                           this.setState({loading: false});
                        }, 500);
                     }
                  }
               }
            />
         </React.Fragment>
      );
   }
 
}

export default UserAccountsTable;