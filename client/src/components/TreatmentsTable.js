import React from 'react';
import {Table, Divider, Dropdown, Menu, Button, Icon, message, Tag} from 'antd';
import axios from 'axios';
import moment from 'moment';
import AddTreatmentModal from './AddTreatmentModal';

const balanceStatus = (paymentType, balance) => {
   switch(paymentType) {
      case 'in-full':
         return    <Tag color="blue">Fully Paid</Tag>;
      case 'no-charge':
         return <Tag color="green">No Charge</Tag>
      default:
         return  <Tag color="volcano">{balance}</Tag>;
   }
}



class TreatmentsTable extends React.Component {

   state = {
      loading: true,
      treatments: []
   };

   componentDidMount() {
      this.getTreatments();
   }

   getTreatments() {
      axios.get(`/api/treatments/${this.props.patientId}`)
      .then((response) => {
         console.log(response.data);
         if(response.status === 200)
            this.setState({treatments: response.data.treatments, loading: false});
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   render() {
   
      const menu = (
            <Menu>
               <Menu.Item>
                  <a disabled target="_blank" rel="noopener noreferrer">Pay Installment</a>
               </Menu.Item>
               <Menu.Item>
                  <a target="_blank" rel="noopener noreferrer">View Installment Payments History</a>
               </Menu.Item>
            </Menu>
         );
      

      const columns = [
         {
            title: 'Description',
            width: 190,
            fixed: 'left',
            dataIndex: 'description',
            render: (text, record) => {
               return record.description;
            }
         }, 
         {
            title: 'Tooth No',
            dataIndex: 'tooth_affected_no',
            render: (text, record) => {
               return record.tooth_affected_no;
            }
         }, 
         {
            title: 'Date Treated',
            dataIndex: 'date_treated',
            render: (text, record) => {
               return moment(record.date_treated).format('MMMM DD, YYYY');
            }
         },
         {
            title: 'Treated By',
            dataIndex: 'treated_by',
            render: (text, record) => {
               return record.treated_by;
            }
         },
         {
            title: 'Payment Type',
            dataIndex: 'payment_type',
            render: (text, record) => {
               return record.payment_type.substring(0,1).toUpperCase()+record.payment_type.substring(1,record.payment_type.length);
            }
         },
         {
            title: 'Total Amount to Pay',
            dataIndex: 'total_amount_to_pay',
            render: (text, record) => {
               return record.total_amount_to_pay;
            }
         },
         {
            title: 'Balance',
            dataIndex: 'balance',
            render: (text, record) => {
               return balanceStatus(record.payment_type, record.balance);
            }
         },
         {
            title: 'Actions',
            width: 80,
            fixed: 'right',
            dataIndex: 'actions',
            render: (text, record) => {
               if(record.payment_type !== 'installment')
                  return (
                     <Dropdown disabled>
                        <Button>
                           Actions <Icon type="down" />
                        </Button>
                     </Dropdown>
                  );
               return (
                  <Dropdown overlay={menu} trigger={['click']}>
                     <Button>
                        Actions <Icon type="down" />
                     </Button>
                  </Dropdown>
               );
            }
         }
      ];
      
      return (  
         <React.Fragment>
         <Divider orientation="left">
         Treatments and/or Procedures taken  <AddTreatmentModal /></Divider>
         <Table
            dataSource={this.state.treatments}
            size="middle"
            columns={columns}
            bordered
            scroll={{x: 1000}}
            rowKey={(record) => record.id}
            pagination={
               {
                  defaultCurrent: 1,
                  pageSize: 4,
                  onChange: (page, pageSize) => {
                  
                  }
               }
            }
         />
         </React.Fragment>
      );
   }
}

export default TreatmentsTable;