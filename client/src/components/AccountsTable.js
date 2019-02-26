import React from 'react';
import { Table, Button, Divider, Icon, Tooltip, Row, Col} from 'antd';

class AccountsTable extends React.Component {

   state ={
      loading: false
   };

   render() {

      const columns = [
         {
            title: 'Fullname',
            dataIndex: 'full_name'
         }, 
         {
            title: 'Role',
            dataIndex: 'role'
         }, 
         {
            title: 'Actions',
            dataIndex: 'actions',
            render: () => (
               <React.Fragment>
                  <Tooltip title="View Account Info">
                     <Button type="primary"><Icon type="profile" /></Button>
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip title="Edit Account">
                     <Button><Icon type="form" /></Button>
                  </Tooltip>
                  <Divider type="vertical" />
                  <Tooltip title="Delete account">
                     <Button type="danger"><Icon type="delete" /></Button>
                  </Tooltip>
               </React.Fragment>
            )
         }
      ];
   
      const data = [
         {
            key: '1',
            full_name: 'Cathleen B. Tolentino',
            role: 'Documentation'
         },
         {
            key: '2',
            full_name: 'Jonathan B. Francisco',
            role: 'Software Engineer / Programmer'
         },
         {
            key: '3',
            full_name: 'Patricia Dane R. Miguel',
            role: 'Documentation'
         },
         {
            key: '4',
            full_name: 'Joecel Pergis',
            role: 'Human Printer'
         },
         {
            key: '5',
            full_name: 'Czar Emman Alejandro',
            role: 'Housekeeper?'
         }
      ];

      const TableTitle = () => {
         return (
            <React.Fragment>
               <Row>
                  <Col span={12}>
                     <h1 style={{margin: 0}} >Accounts</h1>
                  </Col>
                  <Col align="right" span={12}>
                     <Button type="primary"><Icon type="usergroup-add" />Add New Account</Button>
                  </Col>
               </Row>
             
              
            </React.Fragment>
         );
      }
       
      return (
         <React.Fragment>
            <Table
               columns={columns}
               dataSource={data}
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

export default AccountsTable;