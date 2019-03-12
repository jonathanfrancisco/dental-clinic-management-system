import React from 'react';
import {Modal, Icon, Table, message} from 'antd';
import axios from 'axios';
import moment from 'moment';



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
      axios.get(`/api/paymentTransactions/${this.props.treatmentId}`)
      .then((response) => {
         if(response.status === 200)
            this.setState({paymentTransactions: response.data.paymentTransactions, loading: false});
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }

   showModal = () => {
      this.setState({visible: true});
   }

   hideModal = () => {
      this.setState({visible: false});
   }

   render() {


      const columns = [
         {
            title: 'Date Paid',
            dataIndex: 'date_paid',
            render: (text, record) => {
               return moment(record.date_paid).format('MMMM DD, YYYY');
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
            title: 'Current Balance',
            dataIndex: 'current_balance_before',
            render: (text, record) => {
               return record.current_balance_before;
            }
         },
         {
            title: 'New balance',
            dataIndex: 'new_balance_after',
            render: (text, record) => {
               return record.new_balance_after === 0 ? 'Fully Paid' : record.new_balance_after;
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
         <React.Fragment>
            <a onClick={this.showModal} target="_blank" rel="noopener noreferrer">View Installment Payments History</a>
            <Modal
               title="Installment Payments History"
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