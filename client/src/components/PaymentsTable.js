import React from 'react';
import {Table, message, Row, Col, Radio, Input, DatePicker, Tag, Typography} from 'antd';
import moment from 'moment';
import axios from 'axios';

const {RangePicker} = DatePicker;
const {Search} = Input;
const {Title, Text} = Typography;

class PaymentsTable extends React.Component {

   state = {
      loading: true,
      paymentTransactions: [],
      search: '',
      selectedFilterBy: '',
      rangeDate: [],
      loading: true,
   };

   componentDidMount() {
      this.getPaymentTransactions();
   }
   
paymentTransactions

   getPaymentTransactions(search = '', dates = []) {

      let hide;
      if(search != '')
         hide = message.loading('Searching...', 0);
      if(dates.length === 2) {
         this.setState({loading: true});
         axios.get(`/api/paymentTransactions`, {
            params: {
               startDate: dates[0].format('YYYY-MM-DD'),
               endDate: dates[1].format('YYYY-MM-DD'),
               search
            }
         })
         .then((response) => {
            if(response.status === 200) {
               setTimeout(() => {
                  if(search !='') {
                     hide();
                     message.info(`${response.data.paymentTransactions.length} payment(s) found`);
                  }
                  this.setState({loading: false, paymentTransactions: response.data.paymentTransactions});
               },300);
            }
         })
         .catch((err) => {
            console.log(err);
            message.error('Something went wrong! Please, try again.');
         });
      }

      else {
         this.setState({loading: true});
         axios.get(`/api/paymentTransactions`, {
            params: {
               search
            }
         })
         .then((response) => {
            if(response.status === 200) {
               setTimeout(() => {
                  if(search !='') {
                     hide();
                     message.info(`${response.data.paymentTransactions.length} payment(s) found`);
                  }
                  this.setState({loading: false, paymentTransactions: response.data.paymentTransactions});
               },300);
            }
         })
         .catch((err) => {
            console.log(err);
            message.error('Something went wrong! Please, try again.');
         });
      }

   }

   handleSearchChange = (e) => {
      const {value} = e.target;
      this.setState({search: value});
      if(value === '')
         this.getPaymentTransactions(value, this.state.rangeDate);
   }


   onRadioChange = async (e) => {
      const {value: filterBy} = e.target;
      await this.setState({selectedFilterBy: filterBy});
      if(filterBy === 'day')
         await this.setState({rangeDate: [moment(), moment()]});
      else if(filterBy === 'week')
         await this.setState({rangeDate: [moment().startOf('week'), moment().endOf('week')]});
      else if(filterBy === 'month')
         await this.setState({rangeDate: [moment().startOf('month'), moment().endOf('month')]});
      else if(filterBy === 'year')
         await this.setState({rangeDate: [moment().startOf('year'), moment().endOf('year')]});
      this.getPaymentTransactions(this.state.search, this.state.rangeDate);
    }

    onRangePickerChange =  async (dates, dateStrings) => {
      await this.setState({selectedFilterBy: ''});
      await this.setState({rangeDate: dates});
      this.getPaymentTransactions(this.state.search, this.state.rangeDate);
    }


   render() {

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
         <React.Fragment>
            <Title level={4} style={{margin: 0}}>TRANSACTION LOG</Title>
            <Row align="middle" gutter={8}>
               <Col style={{marginBottom:8}} span={24}>
                  <Search 
                     style={{width: '100%', zIndex: -999}}
                     placeholder="search payment log by patient name"
                     enterButton
                     onSearch={(value) => this.getPaymentTransactions(value, this.state.rangeDate)}
                     onChange={this.handleSearchChange}
                  />      
               </Col>
               <Col span={12} align="right">
                  <Radio.Group value={this.state.selectedFilterBy} onChange={this.onRadioChange}>
                     <Radio.Button value="day">All Today</Radio.Button>
                     <Radio.Button value="week">All Week</Radio.Button>
                     <Radio.Button value="month">All Month</Radio.Button>
                     <Radio.Button value="year">All Year</Radio.Button>
                  </Radio.Group>
               </Col>
               <Col style={{marginBottom:8}} span={12}>
                  <RangePicker allowClear={true} value={this.state.rangeDate} format="MMMM DD, YYYY" onChange={this.onRangePickerChange} style={{width: '100%'}} />  
               </Col>
            </Row>
            <Table
               bordered
               loading={this.state.loading}
               dataSource={this.state.paymentTransactions}
               size="small"
               columns={columns}
               scroll={{x: 500}}
               rowKey={(record) => record.id}
               pagination={
                  {
                     position: 'both',
                     showSizeChanger: true,
                     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} payments`,
                     defaultCurrent: 1,
                     pageSize: 15,
                     onChange: (page, pageSize) => {
                        this.getPaymentTransactions(this.state.search, this.state.rangeDate);
                     }
                  }
               }
            />
         </React.Fragment>
      );
   }
}

export default PaymentsTable;