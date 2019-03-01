import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col, Modal, message} from 'antd';
import axios from 'axios';
import CreateAccountModalForm from './CreateAccountModalForm';
import ViewAccountModal from './ViewAccountModal';

const {confirm} = Modal;

class UserAccountsTable extends React.Component {

   state ={
      loading: false,
      visibleCreateModal: false,
      visibleViewModal: false,
      selectedAccountViewModal: {},
      users: []
   };

   componentDidMount() {
      this.getUsers();
   }

   getUsers() {
      this.setState({loading: true});
      console.log('LOADING!!!');
      axios.get('/api/user/')
      .then((response) => {
         this.setState({users: response.data.users, loading: false});
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
         const hide = message.loading('Creating New Account...', 0);
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

   getUser(id) {
      axios.get(`/api/user/${id}`)
      .then((response) => {
         if(response.status === 200)
            this.setState({selectedAccountViewModal: response.data.user});
      })
      .catch((err) => {
         console.log(err);
      });
   }

   showViewModal = (id) => {
      this.getUser(id);
      this.setState({visibleViewModal: true});
   }

   handleViewModalCancel = () => {
      this.setState({selectedAccountViewModal: {}, visibleViewModal: false});
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
                     <Button type="primary" onClick={() => this.showViewModal(record.id)}><Icon type="profile" /></Button>
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
            <ViewAccountModal account={this.state.selectedAccountViewModal} onCancel={this.handleViewModalCancel} visible={this.state.visibleViewModal} />
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