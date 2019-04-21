import React from 'react';
import {Modal, Icon, Table, message} from 'antd';
import axios from 'axios';
import moment from 'moment';
import {Typography} from 'antd';

const {Text} = Typography;


class InstallmentPaymentsHistoryModal extends React.Component {

   state = {
      loading: true,
      visible: false,
      paymentTransactions: []
   };

   componentDidMount() {
      this.getPaymentTransactions();
   }

   getPaymentTransactions() {
      this.setState({loading: true});
      axios.get(`/api/paymentTransactions/${this.props.treatmentId}`)
      .then((response) => {
         if(response.status === 200) {
            this.setState({paymentTransactions: response.data.paymentTransactions});
            setTimeout(() => {
               this.setState({loading: false});
            },500);
         }
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   showModal = () => {
      this.getPaymentTransactions();
      this.setState({visible: true});
   }

   hideModal = () => {
      this.setState({visible: false});
   }

   render() {


      const columns = [
         {
            title: <Text strong>Date Paid</Text>,
            dataIndex: 'date_paid',
            render: (text, record) => {
               return moment(record.date_paid).format('MMMM DD, YYYY');
            }
         },
         {
            title: <Text strong>Amount Paid</Text>,
            dataIndex: 'amount_paid',
            render: (text, record) => {
               return '₱'+record.amount_paid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
         },
         {
            title: <Text strong>Current Balance</Text>,
            dataIndex: 'current_balance_before',
            render: (text, record) => {
               return '₱'+record.current_balance_before.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
         },
         {
            title: <Text strong>New Balance</Text>,
            dataIndex: 'new_balance_after',
            render: (text, record) => {
               return record.new_balance_after === 0 ? 'Fully Paid' : '₱'+record.new_balance_after.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
         <React.Fragment>
            <a onClick={this.showModal} target="_blank" rel="noopener noreferrer">View Installment Payment Transactions</a>
            <Modal
               title="Installment Payment Transactions"
               visible={this.state.visible}
               okButtonProps={{style:{display: 'none'}}}
               cancelText={<React.Fragment><Icon type="close" />Close</React.Fragment>}
               onCancel={this.hideModal}
               width={650}
            >
               <Table
                  bordered
                  loading={this.state.loading}
                  dataSource={this.state.paymentTransactions}
                  size="small"
                  columns={columns}
                  scroll={{x: 300}}
                  rowKey={(record) => record.id}
                  pagination={
                     {
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} payments history`,
                        defaultCurrent: 1,
                        pageSize: 5,
                        onChange: (page, pageSize) => {
                        
                        }
                     }
                  }
               />
            </Modal>
         </React.Fragment>
      );
   }
}




export default InstallmentPaymentsHistoryModal;