import React from 'react';
import {Table, Divider, Dropdown, Menu, Button, Icon, message, Tag} from 'antd';
import axios from 'axios';
import moment from 'moment';
import AddTreatmentModal from './AddTreatmentModal';
import InstallmentPaymentsHistoryModal from './InstallmentPaymentsHistoryModal';

const balanceStatus = (paymentType, balance) => {
   if(paymentType === 'in-full')
      return   <Tag color="blue">Fully Paid</Tag>;
   else if(paymentType === 'no-charge')
      return <Tag color="green">No Charge</Tag>
   else if(paymentType === 'installment') 
      return balance == 0 ?  <Tag color="blue">Fully Paid</Tag> : <Tag color="volcano">{balance}</Tag>;
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
         if(response.status === 200)
            this.setState({treatments: response.data.treatments, loading: false});
      })
      .catch((err) => {
         console.log(err);
         message.error('Something went wrong! Please, try again.');
      });
   }
   
   handleAddTreatment = (values) => {
      const hide = message.loading('Adding New Treatment...', 0);
      values.date_treated = values.date_treated.format('YYYY-MM-DD');
      axios.post(`/api/treatments/${this.props.patientId}/add`, values)
      .then((response) => {
         if(response.status === 200) {
            hide();
            message.success('New Treatment Added Sucessfully');
            this.getTreatments();
         }
      })
      .catch((err) => {
         console.log(err);
         hide();
         message.error('Someting went wrong! Please, try again');
      });
   }

   render() {
   
     
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
               const menu = (
                  <Menu>
                     <Menu.Item>
                        <a disabled target="_blank" rel="noopener noreferrer">Pay Installment</a>
                     </Menu.Item>
                     <Menu.Item>
                        <InstallmentPaymentsHistoryModal treatmentId={record.id} />
                     </Menu.Item>
                  </Menu>
               );
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
         Treatments and/or Procedures taken  <AddTreatmentModal onAdd={this.handleAddTreatment} /></Divider>
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