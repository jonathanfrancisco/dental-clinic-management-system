import React from 'react';
import { Table, Button, Divider, Icon} from 'antd';

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