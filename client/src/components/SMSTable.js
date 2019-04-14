import React from 'react';
import {Table, Typography, Row, Col, Button, Icon, Input, DatePicker, Tag, message} from 'antd';
import moment from 'moment';
import axios from 'axios';

const {Search} = Input;
const {RangePicker} = DatePicker;
const {Title, Text} = Typography;



class SMSTable extends React.Component {

   state = {
      loading: false,
      searchInput: '',
      recipients: [],
      selectedRowKeys: [],
      lastVisitFilter: [],
      nextAppointmmentFilter: [],
      currentDataSource: [],
      customMessageButton: false,
      balanceNoticeButton: false,
      appointmentNoticeButton: false,
      disabledBalanceArr: [],
      disabledAppointmentArr: []
      
   };

   componentDidMount() {
      this.getRecipients();
   }

   getRecipients = (searchValue) => {
      this.setState({loading: true, search: searchValue});
      if(searchValue) {
         const hide = message.loading('Searching...', 0);
         axios.get('/api/sms/', {
            params: {search: searchValue}
         })
         .then((response) => {
            if(response.status === 200) {
               hide();
               this.setState({recipients: response.data.recipients, currentDataSource: response.data.recipients});
               setTimeout(() => {
                  this.setState({loading: false});
                  message.info(`${response.data.recipients.length} Record(s) found`);
               },500); 
            }
         })
         .catch((err) => {
            console.log(err);
            hide();
            message.error('Something went wrong! Please, try again.');
         });
         
      }
      else {
         axios.get('/api/sms/')
         .then((response) => {
            this.setState({recipients: response.data.recipients, currentDataSource:response.data.recipients, loading: false});
         })
         .catch((err) => {
            console.log(err);
         });
      }
   }

   handleSearchErased = (e) => {
      const {value} = e.target;
     if(value === '')
      this.getRecipients(value);
   }

   lastVisitFilterProps = (dataIndex) => ({
      filterDropdown: ({
         setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
         <div style={{ padding: 8 }}>
            <RangePicker 
               value={this.state.lastVisitFilter}
               onChange={(dates) => {
                     this.setState({lastVisitFilter: dates ? dates: []});
                     setSelectedKeys(dates ? [dates] : [])
                  }
               }
               disabledDate={(current) => current && current >= moment()} format="MMMM DD, YYYY" />
            <Row style={{marginTop: 8}}>
               <Col align="right">
                  <Button
                     type="primary"
                     onClick={() => this.handleLastVisitFilter(selectedKeys, confirm)}
                     size="small"
                     style={{ width: 90, marginRight: 8 }}
                  >
                     Filter
                  </Button>    
                  <Button
                     onClick={() => this.handleLastVisitReset(clearFilters)}
                     size="small"
                     style={{ width: 90 }}
                  >
                     Reset
                  </Button>
               </Col>
            </Row>
         </div>
      ),
      filterIcon: filtered => <Icon type="schedule" style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (filterValue, record, a) => {
         return moment(record[dataIndex]).isBetween(filterValue[0], filterValue[1]);
      },
   })

   handleLastVisitFilter = (selectedKeys, confirm) => {
      confirm();
      this.setState({lastVisitFilter: selectedKeys[0]});
   }

   handleLastVisitReset = (clearFilters) => {
      clearFilters();
      this.setState({lastVisitFilter: []});
   }

   nextAppointmentFilterProps = (dataIndex) => ({
      filterDropdown: ({
         setSelectedKeys, selectedKeys, confirm, clearFilters,
      }) => (
         <div style={{ padding: 8 }}>
            <RangePicker 
               value={this.state.nextAppointmmentFilter}
               onChange={(dates) => {
                     this.setState({nextAppointmmentFilter: dates ? dates: []});
                     setSelectedKeys(dates ? [dates] : [])
                  }
               }
               disabledDate={(current) => current && current <= moment()} format="MMMM DD, YYYY" />
            <Row style={{marginTop: 8}}>
               <Col align="right">
                  <Button
                     type="primary"
                     onClick={() => this.handleNextAppointmentFilter(selectedKeys, confirm)}
                     size="small"
                     style={{ width: 90, marginRight: 8 }}
                  >
                     Filter
                  </Button>    
                  <Button
                     onClick={() => this.handleNextAppointmentReset(clearFilters)}
                     size="small"
                     style={{ width: 90 }}
                  >
                     Reset
                  </Button>
               </Col>
            </Row>
         </div>
      ),
      filterIcon: filtered => <Icon type="schedule" style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (filterValue, record, a) => {
         return moment(record[dataIndex]).isBetween(filterValue[0], filterValue[1]);
      },
   })

   handleNextAppointmentFilter = (selectedKeys, confirm) => {
      confirm();
      this.setState({nextAppointmmentFilter: selectedKeys[0]});
   }

   handleNextAppointmentReset = (clearFilters) => {
      clearFilters();
      this.setState({nextAppointmmentFilter: []});
   }

   onSelectChange = async (selectedRowKeys) => {
      await this.setState({ selectedRowKeys });
      this.updateButtons();
   }

   onUnselectAll = async () => {
      await this.setState({selectedRowKeys: []});
      this.updateButtons();
   }
   

   // UPDATES THE APPROPRIATE BUTTONS TO BE ENABLED
   // THE ALGORITHM IS QUITE A MESS :(
   updateButtons = () => {

      this.state.disabledBalanceArr.forEach((element) => {
         const isExistArr = this.state.selectedRowKeys.filter((key) => key == element.id);
         if(isExistArr.length <= 0) {
            const newDisabledBalanceArr = [...this.state.disabledBalanceArr];
            for(var i = 0; i<newDisabledBalanceArr.length; i++) {
               if(newDisabledBalanceArr[i].id === element.id) {
                  newDisabledBalanceArr.splice(i, 1);
               }
            }
            this.setState({
               disabledBalanceArr: newDisabledBalanceArr
            });
         }
      });

      this.state.disabledAppointmentArr.forEach((element) => {
         const isExistArr = this.state.selectedRowKeys.filter((key) => key == element.id);
         if(isExistArr.length <= 0) {
            const newDisabledAppointmentArr = [...this.state.disabledAppointmentArr];
            for(var i = 0; i<newDisabledAppointmentArr.length; i++) {
               if(newDisabledAppointmentArr[i].id === element.id) {
                  newDisabledAppointmentArr.splice(i, 1);
               }
            }
            this.setState({
               disabledAppointmentArr: newDisabledAppointmentArr
            });
         }
      });

   
      if(this.state.selectedRowKeys.length == 0) {
         this.setState({
            customMessageButton: false,
            balanceNoticeButton: false,
            appointmentNoticeButton: false
         });
      }
      else {

         let balanceNoticeButton = false;
         let appointmentNoticeButton = false;
         
         this.state.selectedRowKeys.forEach((selectedRowKey) => { 
            // CHECKPOINT April 14 5:01AM
            const obj = this.state.currentDataSource.find((element) => element.id == selectedRowKey);
            console.log('obj gagu: ', obj);
            if(obj.total_balance > 0 && this.state.disabledBalanceArr.length <= 0)
               balanceNoticeButton = true;
            else if(obj.total_balance <= 0) {
               balanceNoticeButton = false; 
               const newDisabledBalanceArr = [...this.state.disabledBalanceArr];
               const isExist = newDisabledBalanceArr.find((element) => element.id == selectedRowKey);
               if(!isExist)
                  newDisabledBalanceArr.push(obj);
               this.setState({
                  disabledBalanceArr: newDisabledBalanceArr
               });
            }
            
            if(obj.next_appointment && this.state.disabledAppointmentArr.length <= 0) {
               appointmentNoticeButton = true;
            }
            else if(!obj.next_appointment) {
               appointmentNoticeButton = false;
               const newDisabledAppointmentArr = [...this.state.disabledAppointmentArr];
               const isExist = newDisabledAppointmentArr.find((element) => element.id == selectedRowKey);
               if(!isExist)
                  newDisabledAppointmentArr.push(obj);
               this.setState({
                  disabledAppointmentArr: newDisabledAppointmentArr
               });
            }
            
         });

         this.setState({
            customMessageButton: true,
            balanceNoticeButton,
            appointmentNoticeButton
         });

         
      }
      
   }

   render() {

      const { selectedRowKeys } = this.state;

      const rowSelection = {
         selectedRowKeys,
         onChange: this.onSelectChange,
         hideDefaultSelections: true,
         onSelection: this.onSelection,
         getCheckboxProps: record => ({
               disabled: !record.contact_number || !record.last_visit, // Column configuration not to be checked
            }),
         selections: [
            {
               key: 'all',
               text: 'Select all',
               onSelect: async (changableRowKeys) => { 
                  let selectedRowKeys = [];
                  this.state.currentDataSource.forEach((record) => {
                     if(record.contact_number)
                        selectedRowKeys.push(record.id);
                  });
                  await this.setState({selectedRowKeys});
                  this.updateButtons();
               },
            },
            {
               key: 'balance',
               text: 'Select has balance',
               onSelect: async (changableRowKeys) => {
                  let selectedRowKeys = [];
                  this.state.currentDataSource.forEach((record) => {
                     if(record.total_balance > 0 && record.contact_number)
                        selectedRowKeys.push(record.id);
                  });
                  await this.setState({selectedRowKeys});
                  this.updateButtons();
               },
            },
            {
               key: 'appointment',
               text: 'Select has appointment',
               onSelect: async (changableRowKeys) => {
                  let selectedRowKeys = [];
                  this.state.currentDataSource.forEach((record) => {
                     if(record.next_appointment && record.contact_number)
                        selectedRowKeys.push(record.id);
                  });
                  await this.setState({selectedRowKeys});
                  this.updateButtons();
               }
            }
         ],
      };

      const columns = [
         {
            title: <Text strong>Name</Text>,
            dataIndex: 'name',
         }, {
            title: <Text strong>Contact Number</Text>,
            dataIndex: 'contact_number',
            render: (text, record) => {
               return !record.contact_number ? <Tag>Not Available</Tag> : record.contact_number;
            }
         }, {
            title: <Text strong>Last Visit</Text>,
            dataIndex: 'last_visit',
            render: (text, record) => {
               return !record.last_visit ? <Tag color="geekblue">New Record</Tag> : moment(record.last_visit).format('MMMM DD, YYYY');
            }, 
            ...this.lastVisitFilterProps('last_visit')
         },{
            title: <Text strong>Total Balance</Text>,
            dataIndex: 'total_balance',
            render: (text, record) => {
               return record.total_balance > 0 ? <Tag color="red">{'₱'+record.total_balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Tag> : <Tag>None</Tag>
            }
         },{
            title: <Text strong>Next Appointment</Text>,
            dataIndex: 'next_appointment',
            render: (text, record) => {
               return !record.next_appointment? <Tag>None</Tag> : moment(record.next_appointment).format('MMMM DD, YYYY');
            },
            ...this.nextAppointmentFilterProps('next_appointment')
         }
      ];

      const hasSelected = selectedRowKeys.length > 0;

      return (
         <React.Fragment>
            <Title level={4} style={{margin: 0}}>SMS</Title>
            <Row>
               <Col span={24}>
                  <Search 
                    style={{width: '100%', zIndex: -999}}
                    placeholder="search recipient by name"
                    enterButton
                    onSearch={(value) => this.getRecipients(value)}
                    onChange={this.handleSearchErased}
                  />     
               </Col>
            </Row>
            {/* <Row style={{marginTop: 12}} type="flex" justify="end">
               <Col span={12}>
                  <RangePicker allowClear={true} format="MMMM DD, YYYY" style={{width: '100%'}} />
               </Col>
            </Row> */}
            <Row style={{marginTop: 12}}>
               <Col span={8} align="left">
                  <Button onClick={this.onUnselectAll} disabled={!hasSelected} >Unselect all</Button>
                  <span style={{ marginLeft: 8 }}>
                     {hasSelected ? `Selected ${selectedRowKeys.length} row(s)` : ''}
                  </span>
               </Col>
               <Col span={16} align="right">
                  <Button disabled={!this.state.customMessageButton} style={{marginRight: 8}} type="primary">Send Custom Message</Button>
                  <Button disabled={!this.state.balanceNoticeButton} style={{marginRight: 8}} type="primary">Send Balance Notice</Button>
                  <Button disabled={!this.state.appointmentNoticeButton} type="primary">Send Appointment Notice</Button>
               </Col>
            </Row>
            <Table
               onChange={(pagination, filters, sorter, {currentDataSource}) => {
                  console.log('Current on change data source: ',currentDataSource);
                  this.setState({currentDataSource});
               }} 
               loading={this.state.loading}
               rowSelection={rowSelection}
               columns={columns}
               dataSource={this.state.recipients}
               rowKey={(record) => record.id}
               pagination={
                  {
                     position: 'both',
                     showSizeChanger: true,
                     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} patients`,
                     defaultCurrent: 1,
                     pageSize: 8,
                     onChange: (page, pageSize) => {
                        // this.getPaymentTransactions(this.state.search, this.state.rangeDate);
                     }
                  }
               }
                />
        </React.Fragment>
      );

    }
  
}

export default SMSTable;


