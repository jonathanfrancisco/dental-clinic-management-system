import React from 'react';
import {Table, message, Row, Col, Radio, Input, DatePicker, Tag, Typography, Button, Icon} from 'antd';
import moment from 'moment';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const {RangePicker} = DatePicker;
const {Search} = Input;
const {Title, Text} = Typography;

class PaymentsTable extends React.Component {

   state = {
      loading: true,
      paymentTransactions: [],
      search: '',
      selectedFilterBy: '',
      rangeDate: []
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

   handlePrint = () => {
      
      const body = [];
      let total = 0;
      this.state.paymentTransactions.forEach(({date_paid, amount_paid, payment_type, from, received_by}) => {
         total += amount_paid;
         body.push({
            date_paid: moment(date_paid).format('MMMM DD, YYYY'),
            amount_paid: amount_paid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            payment_type,
            from,
            received_by
         });
      });

      const doc = new jsPDF({
         format: [612, 792]
      });
      const totalPagesExp = "{total_pages_count_string}";

        // Header
        const pageSize = doc.internal.pageSize;
        const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        
        doc.setFontSize(16);
        doc.setFontStyle('bold');
        doc.text('Andres Dental Clinic', pageWidth - 68, 10);
        doc.setFontSize(10);
        doc.setTextColor(53, 53, 53);
        doc.setFontStyle('normal');
        doc.text('One.O.5ive Department Store', pageWidth - 60, 14);
        doc.text('J. P. Rizal Street, Barangay 18', pageWidth - 62, 18);
        doc.text('Laoag City, 2900 Ilocos Norte', pageWidth - 60, 22);
        doc.text('09212451903', pageWidth - 35, 26);
        doc.setFontSize(14);
        doc.setTextColor(0,0, 0);
        doc.setFontStyle('bold');
        doc.text('Transaction Log', 15, 32);
        const [startDate, endDate] = this.state.rangeDate;
        doc.setFontStyle('normal');
        doc.setFontSize(10);

        if(startDate && endDate) {
           doc.setTextColor(53, 53, 53);
           doc.text(`(${moment(startDate).format('MMMM DD, YYYY')} - ${moment(endDate).format('MMMM DD, YYYY')})`, 54, 32);
           doc.setTextColor(0,0, 0);
        }

      doc.autoTable({
         columns: [
            {header: 'Date Paid', dataKey: 'date_paid'},
            {header: 'Amount Paid', dataKey: 'amount_paid'},
            {header: 'Payment Type', dataKey: 'payment_type'},
            {header: 'From', dataKey: 'from'},
            {header: 'Received By', dataKey: 'received_by'},
         ],
         body,
         didDrawPage: (data) => {
            // Footer
            var str = "Page " + doc.internal.getNumberOfPages()
            // Total page number plugin only available in jspdf v1.0+
            if (typeof doc.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            doc.setFontStyle('normal');

            // jsPDF 1.4+ uses getWidth, <1.4 uses .width
            doc.text(str, data.settings.margin.left, pageHeight - 10);
            doc.text(`Generated on ${moment(Date.now()).format('MMMM DD, YYYY hh:mmA')}`,  pageWidth - 73, pageHeight - 10);

        },
        startY: 34,
        showHead: 'firstPage',
      });
      
      doc.line(15,doc.autoTable.previous.finalY + 3, pageWidth-15, doc.autoTable.previous.finalY + 3); // horizontal line  
      doc.setFontStyle('bold');
      doc.text('TOTAL:', 15, doc.autoTable.previous.finalY + 8);
      doc.text(`${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`, 48, doc.autoTable.previous.finalY + 8);
      if (typeof doc.putTotalPages === 'function') 
         doc.putTotalPages(totalPagesExp);
     
      doc.autoPrint();
      window.open(doc.output('bloburl'), '_blank');   
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
               return '₱'+record.amount_paid.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
            <Row>
               <Col align="right">
                  <Button onClick={this.handlePrint} type="primary"><Icon type="printer" /> Print Transaction Log</Button>
               </Col>
            </Row>
            <Table
               loading={this.state.loading}
               dataSource={this.state.paymentTransactions}
               size="medium"
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