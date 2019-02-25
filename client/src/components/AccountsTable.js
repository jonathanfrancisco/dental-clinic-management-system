import React from 'react';
import { Table, Button, Divider, Icon} from 'antd';

class AccountsTable extends React.Component {

   state ={
      loading: false
   };

   render() {

      const columns = [
         {
            title: 'Firstname',
            dataIndex: 'first_name'
         }, 
         {
            title: 'Middlename',
            dataIndex: 'middle_name'
         }, 
         {
            title: 'Lastname',
            dataIndex: 'last_name'
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
                  <Button type="primary"><Icon type="profile" />View</Button>
                  <Divider type="vertical" />
                  <Button><Icon type="edit" />Edit</Button>
                  <Divider type="vertical" />
                  <Button type="danger"><Icon type="delete" />Delete</Button>
               </React.Fragment>
            )
         }
      ];
   
      const data = [
         {
            key: '1',
            first_name: 'Cathleen',
            middle_name: 'Buted? ahaha',
            last_name: 'Tolentino',
            role: 'Documentation'
         },
         {
            key: '2',
            first_name: 'Patricia Dane',
            middle_name: 'Ruiz',
            last_name: 'Miguel',
            role: 'Documentation'
         },
         {
            key: '3',
            first_name: 'Jonathan',
            middle_name: 'Buted',
            last_name: 'Francisco',
            role: 'Software Engineer'
         },
         {
            key: '4',
            first_name: 'Joecel',
            middle_name: 'Jakammu',
            last_name: 'Pergis',
            role: 'Taga print'
         },
         {
            key: '5',
            first_name: 'Frances Deanne',
            middle_name: 'Jakammu',
            last_name: 'Medina',
            role: 'Pancit canton kuma'
         },
         {
            key: '6',
            first_name: 'Christopher',
            middle_name: 'Hackerman',
            last_name: 'Dugay',
            role: 'Documentation'
         },
         {
            key: '7',
            first_name: 'April Joyce',
            middle_name: 'Hmm',
            last_name: 'Guillermo',
            role: 'Documentation'
         },
         {
            key: '8',
            first_name: 'Jonathan',
            middle_name: 'Buted',
            last_name: 'Francisco',
            role: 'Software Engineer'
         },
         {
            key: '9',
            first_name: 'Joecel',
            middle_name: 'Jakammu',
            last_name: 'Pergis',
            role: 'Taga print'
         },
         {
            key: '10',
            first_name: 'Czar Emman',
            middle_name: 'Jakammu',
            last_name: 'Alejandro',
            role: 'Pancit canton kuma'
         }
      ];
       
      return (
         <Table
            columns={columns}
            dataSource={data}
            bordered
            title={() => <h1 style={{margin: 0}}>Accounts</h1>}
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
      );
   }
 
}

export default AccountsTable;