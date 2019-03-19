import React from 'react';
import {Badge, Row, Col, Typography} from 'antd';
import {ResponsiveContainer, BarChart, CartesianGrid, YAxis, XAxis, Tooltip, Bar, Legend} from 'recharts';
const {Title} = Typography;
class VisitChart extends React.Component {

   render() {

      const data = [
         {
            "name": "January",
            "Number of Visits": 88
         },
         {
            "name": "February",
            "Number of Visits": 25
         },
         {
            "name": "March",
            "Number of Visits": 80
         },
         {
            "name": "April",
            "Number of Visits": 55
         },
         {
            "name": "May",
            "Number of Visits": 8
         },
         {
            "name": "Jun",
            "Number of Visits": 44
         },
         {
            "name": "July",
            "Number of Visits": 23
         },
         {
            "name": "August",
            "Number of Visits": 70
         },
         {
            "name": "September",
            "Number of Visits": 38
         },
         {
            "name": "October",
            "Number of Visits": 15
         },
         {
            "name": "November",
            "Number of Visits": 52
         },
         {
            "name": "December",
            "Number of Visits": 30
         }
      ];

      return (
         <div style={{padding: '12px 0px 24px 0px'}}>
            <Row gutter={32}>
               <Col span={18}>
               <Title level={4} style={{marginLeft: 30, marginTop: 0, marginBottom: 12,fontWeight: 'normal', fontSize: 14}}>Visits Trend</Title>
                  <ResponsiveContainer width="100%" height={320}>
                     <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend verticalAlign="top"/>
                        <Bar dataKey="Number of Visits" fill="#40a9ff" />
                     </BarChart>
                  </ResponsiveContainer>
               </Col>
               <Col span={6}>
                  <Title level={1} style={{marginTop: 0, marginBottom: 12,fontWeight: 'normal', fontSize: 14}}>Visits Ranking</Title>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={1} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#314659', color: '#f5f5f5'}} />
                        January
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={2} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#314659', color: '#f5f5f5'}} />
                        February
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={3} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#314659', color: '#f5f5f5'}} />
                        March
                     </Col>
                  </Row>


                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={4} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#595959'}} />
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={5} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#595959'}} />
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={6} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#595959'}} />
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={7} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#595959'}} />
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={8} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#595959'}} />
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={9} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#595959'}} />
                     </Col>
                  </Row>
                  <Row style={{marginBottom: 12}}>
                     <Col span={24}>
                        <Badge count={10} style={{marginRight: 8,fontWeight: 'bold', backgroundColor: '#f5f5f5', color: '#595959'}} />
                     </Col>
                  </Row>
               </Col>
            </Row>
            
         </div>
      );
   }
}

export default VisitChart;