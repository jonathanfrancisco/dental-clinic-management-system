import React from 'react';
import {Table, Typography, Row, Col, Button, Icon, Input, DatePicker, Tag} from 'antd';
import moment from 'moment';
import { filter } from 'bluebird';

const {Search} = Input;
const {RangePicker} = DatePicker;
const {Title, Text} = Typography;

const data = [];

for (let i = 0; i < 10; i++) {
   data.push({
      key: i,
      name: `Edward King ${i}`,
      contact_number: '123456789',
      last_visit: '2018-10-12',
      total_balance: 120,
      next_appointment: '2015-08-05'
   });
}

data.push(
   {
      key: 100,
      name: `Putanginamo`,
      contact_number: '',
      last_visit: '2019-04-05',
      total_balance: 120,
      next_appointment: '2019-04-07'
   }
);

data.push(
   {
      key: 101,
      name: `Putanginamo`,
      contact_number: '09212451903',
      last_visit: '2017-08-05',
      total_balance: 0,
      next_appointment: '2019-04-08'
   }
);


data.push(
   {
      key: 102,
      name: `Gagu`,
      contact_number: '09212451903',
      last_visit: '2015-10-12',
      total_balance: 0,
      next_appointment: '2019-04-11'
   }
);



class SMSTable extends React.Component {

   state = {
      loading: false,
      selectedRowKeys: [],
      displayedData: [],
      lastVisitFilter: [],
      nextAppointmmentFilter: [],
      currentDataSource: [...data]
   };

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




   onSelectChange = (selectedRowKeys) => {
      this.setState({ selectedRowKeys });
   }

   onUnselectAll = () => {
      this.setState({selectedRowKeys: []});
   }  

   render() {

      const { selectedRowKeys } = this.state;

      const rowSelection = {
         selectedRowKeys,
         onChange: this.onSelectChange,
         hideDefaultSelections: true,
         onSelection: this.onSelection,
         getCheckboxProps: record => ({
               disabled: !record.contact_number, // Column configuration not to be checked
            }),
         selections: [
            {
               key: 'all',
               text: 'Select all',
               onSelect: (changableRowKeys) => { 
                  let selectedRowKeys = [];
                  this.state.currentDataSource.forEach((record) => {
                     if(record.contact_number)
                        selectedRowKeys.push(record.key);
                  });
                  this.setState({selectedRowKeys});
               },
            },
            {
               key: 'balance',
               text: 'Select has balance',
               onSelect: (changableRowKeys) => {
                  let selectedRowKeys = [];
                  this.state.currentDataSource.forEach((record) => {
                     if(record.total_balance > 0 && record.contact_number)
                        selectedRowKeys.push(record.key);
                  });
                  this.setState({selectedRowKeys});
               },
            },
            {
               key: 'appointment',
               text: 'Select has appointment',
               onSelect: (changableRowKeys) => {
                  let selectedRowKeys = [];
                  this.state.currentDataSource.forEach((record) => {
                     if(record.next_appointment && record.contact_number)
                        selectedRowKeys.push(record.key);
                  });
                  this.setState({selectedRowKeys});
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
               return moment(record.last_visit).format('MMMM DD, YYYY');
            }, 
            ...this.lastVisitFilterProps('last_visit')
         },{
            title: <Text strong>Total Balance</Text>,
            dataIndex: 'total_balance'
         },{
            title: <Text strong>Next Appointment</Text>,
            dataIndex: 'next_appointment',
            render: (text, record) => {
               return moment(record.next_appointment).format('MMMM DD, YYYY');
            },
            ...this.nextAppointmentFilterProps('next_appointment')
         }
      ];

      const hasSelected = selectedRowKeys.length > 0;

      return (
         <React.Fragment>
            <Title level={4} style={{margin: 0}}>SMS Text Messaging</Title>
            <Row>
               <Col span={24}>
                  <Search 
                     style={{width: '100%', zIndex: -999}}
                     placeholder="search patient by name"
                     enterButton
                     // onSearch={(value) => this.props.getAppointments(value, this.state.rangeDate)}
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
                  <Button disabled={!hasSelected} style={{marginRight: 8}} type="primary">Send Custom Message</Button>
                  <Button disabled={!hasSelected} style={{marginRight: 8}} type="primary">Send Appointment Notice</Button>
                  <Button disabled={!hasSelected} type="primary">Send Balance Notice</Button>
               </Col>
            </Row>
            <Table
               onChange={(pagination, filters, sorter, {currentDataSource}) => {
                  this.setState({currentDataSource});
               }} 
               loading={this.state.loading}
               rowSelection={rowSelection}
               columns={columns}
               dataSource={data}
               rowKey={(record) => record.key}
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


