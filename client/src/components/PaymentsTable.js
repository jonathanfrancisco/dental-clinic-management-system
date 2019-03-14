import React from 'react';
import {Table, message, Tag, Typography} from 'antd';
import moment from 'moment';
import axios from 'axios';

const {Title, Text} = Typography;

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
         return  <Title level={4} style={{margin: 0}}>Payments Log</Title>;
      }

      const columns = [
         {
            title: <Text strong>Date Paid</Text>,
            dataIndex: 'date_paid',
            render: (text, record) => {
               const display = moment(record.date_paid).format('MMMM DD, YYYY') === moment(Date.now()).format('MMMM DD, YYYY') ? <Tag color="geekblue">Today</Tag> 
                              : moment(record.date_paid).format('MMMM DD, YYYY');
               return display;
            }
         },
         {
            title: <Text strong>Amount Paid</Text>,
            dataIndex: 'amount_paid',
            render: (text, record) => {
               return record.amount_paid;
            }
         },
         {
            title: <Text strong>Payment Type</Text>,
            dataIndex: 'payment_type',
            render: (text, record) => {
               return record.payment_type.substring(0,1).toUpperCase()+record.payment_type.substring(1,record.payment_type.length);
            }
         },
         {
            title: <Text strong>From</Text>,
            dataIndex: 'from',
            render: (text, record) => {
               return record.from;
            }
         },
         {
            title: <Text strong>Received By</Text>,
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
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} payments`,
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