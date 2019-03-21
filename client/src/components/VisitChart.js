import React from 'react';
import {DatePicker, Select, Badge, Row, Col, Typography} from 'antd';
import {ResponsiveContainer, BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Bar, Legend} from 'recharts';
import moment from 'moment';
import axios from 'axios';

const {RangePicker} = DatePicker;
const {Title} = Typography;

const getMonthName = (monthNumber) => {
   switch(monthNumber) {
      case 1:
         return "January";
      case 2:
         return "February";
      case 3:
         return "March";
      case 4:
         return "April";
      case 5:
         return "May";
      case 6:
         return "June";
      case 7:
         return "July";
      case 8:
         return "August";
      case 9:
         return "September";
      case 10:
         return "October";
      case 11:
         return "November";
      case 12:
         return "December";
   }
}

const getDayName = (dayNumber) => {
   switch(dayNumber) {
      case 0:
         return "Monday";
      case 1:
         return "Tuesday";
      case 2:
         return "Wednesday";
      case 3:
         return "Thursday";
      case 4:
         return "Friday";
      case 5:
         return "Saturday";
      case 6:
         return "Sunday";
   }
}


class VisitChart extends React.Component {


   state = {
      filterBy: 'month',
      rangeDate: [moment().startOf('year'), moment().endOf('year')],
      visitsTrend: [],
      visitsRanking: []
   };

   componentDidMount() {
      this.getVisits();
   }

   getVisits() {
      axios.get('/api/dashboard/visits', {
         params: {
            startDate: moment(this.state.rangeDate[0]).format('YYYY-MM-DD'),
            endDate: moment(this.state.rangeDate[1]).format('YYYY-MM-DD'),
            filterBy: this.state.filterBy
         }
      })
      .then((response) => {
         if(response.status === 200)
            this.setState({visitsTrend: response.data.visits, visitsRanking: response.data.visitsRanked});
      })
      .catch((err) => {
         console.log(err);
      });
   }

   handleSelectChange = async (value) => {
     await this.setState({filterBy: value});
     this.getVisits();
   }

   handleRangeDateChange = async (dates) => {
      if(dates.length === 0)
         await this.setState({
            rangeDate: [moment().startOf('year'), moment().endOf('year')]
         });
      else
         await this.setState({
            rangeDate: dates
         });
      this.getVisits();
   }

   render() {
      
   
      const data = [...this.state.visitsTrend].map((data) => {
         if(this.state.filterBy === 'month')
            return {
               "name": getMonthName(data.name),
               "Number of Visits": data["Number of Visits"]
            };
         return {
            "name": getDayName(data.name),
            "Number of Visits": data["Number of Visits"]
         };
      });

      let previousPosition;
      let visitsRanking = [...this.state.visitsRanking].map((obj, index, arr) => {
         if(index != 0) {
            if(obj.totalVisits === arr[index-1].totalVisits) {
               return {
                  ...obj,
                  position: previousPosition
               }
            }
            previousPosition+= 1;
            return {
               ...obj,
               position: previousPosition
            }
         }
         previousPosition = 1;
         return {
           ...obj,
           position: previousPosition
         };
      });

   
      return (
         <div style={{padding: '12px 0px 24px 0px'}}>
            <Row style={{marginBottom: 8}}>
                  <Col align="center" span={24}>
                     <Select style={{marginRight: 12}} defaultValue="month" onChange={this.handleSelectChange} >
                        <Select.Option value="month">Month</Select.Option>
                        <Select.Option value="day">Day</Select.Option>
                     </Select>
                     <RangePicker format="MMMM DD, YYYY" defaultPickerValue={[moment().startOf('year'), moment().endOf('year')]} value={this.state.rangeDate} onChange={this.handleRangeDateChange}/>
                  </Col>
               </Row>
            <Row gutter={32}>
               <Col span={18}>
               <Title level={4} style={{marginLeft: 30, marginTop: 0, marginBottom: 12,fontWeight: 'normal', fontSize: 14}}>Visits Trend</Title>
               {/* <Title style={{textAlign: 'center', fontWeight: 'normal', fontSize: 18}}>January 1, 2019 ~ December 31, 2019</Title> */}
                  <ResponsiveContainer width="100%" height={320}>
                     <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Number of Visits" fill="#69c0ff" />
                     </BarChart>
                  </ResponsiveContainer>
               </Col>
               <Col span={6}>
                  <Title level={1} style={{marginTop: 0, marginBottom: 24,fontWeight: 'normal', fontSize: 14}}>Visits Ranking</Title>

                  {
                     visitsRanking.map((obj, index) => {
                        if(index < 3)
                           return (
                              <Row style={{marginBottom: 12}}>
                                 <Col span={24}>
                                    <Badge count={obj.position} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#314659', color: '#f5f5f5'}} />
                                    {getMonthName(obj.name)}
                              </Col>
                              </Row>
                           );
                        return (
                           <Row style={{marginBottom: 12}}>
                              <Col span={24}>
                                 <Badge count={obj.position} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#595959'}} />
                                 {getMonthName(obj.name)}
                              </Col>
                           </Row>
                        );
                     })
                  }

               </Col>
            </Row>
            
         </div>
      );
   }
}

export default VisitChart;