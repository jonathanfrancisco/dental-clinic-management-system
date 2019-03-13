import React from 'react';
import {Table, message, Tag, Typography} from 'antd';
import moment from 'moment';
import axios from 'axios';

const {Title} = Typography;

class PaymentsTable extends React.Component {

   state = {
      loading: true,
      paymentTransactions: []
   };

   componentDidMount() {
      this.getAllPaymentTransactions();
   }

   getAllPaymentTransactions() {
      axios.get('/api/paymentTransactions')
      .then((response) => {
         if(response.status === 200)
            this.setState({paymentTransactions: response.data.paymentTransactions, loading: false});
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   render() {

      const TableTitle = () => {
         return  <Title level={3} style={{margin: 0}}>Payments Log</Title>;
      }

      const columns = [
         {
            title: 'Date Paid',
            dataIndex: 'date_paid',
            render: (text, record) => {
               const display = moment(record.date_paid).format('MMMM DD, YYYY') === moment(Date.now()).format('MMMM DD, YYYY') ? <Tag color="geekblue">Today</Tag> 
                              : moment(record.date_paid).format('MMMM DD, YYYY');
               return display;
            }
         },
         {
            title: 'Amount Paid',
            dataIndex: 'amount_paid',
            render: (text, record) => {
               return record.amount_paid;
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
            title: 'From',
            dataIndex: 'from',
            render: (text, record) => {
               return record.from;
            }
         },
         {
            title: 'Received By',
            dataIndex: 'received_by',
            render: (text, record) => {
               return record.received_by;
            }
         }
      ];

      return (
         <Table
            title={TableTitle}
            bordered
            loading={this.state.loading}
            dataSource={this.state.paymentTransactions}
            size="small"
            columns={columns}
            scroll={{x: 500}}
            rowKey={(record) => record.id}
            pagination={
               {
                  defaultCurrent: 1,
                  pageSize: 10,
                  onChange: (page, pageSize) => {
                  
                  }
               }
            }
         />
      );
   }
}

export default PaymentsTable;