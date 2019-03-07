import React from 'react';
import {Link} from 'react-router-dom';
import {Table, Typography, Row, Col, Tag, Card, Divider, Icon, Tabs} from 'antd';

import DescriptionItem from '../components/DescriptionItem';
import AdultTeethChart from '../components/AdultTeethChart';
import ChildTeethChart from '../components/ChildTeethChart';

const {TabPane} = Tabs;
const {Title} = Typography;


class DentalRecord extends React.Component {

   render() {

      const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
      }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      }, {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
         <span>
            {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
               color = 'volcano';
            }
            return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
            })}
         </span>
      ),
      }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
         <span>
            <a href="javascript:;">Invite {record.name}</a>
            <Divider type="vertical" />
            <a href="javascript:;">Delete</a>
         </span>
      ),
      }];

      const data = [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
      }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
      }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      }];

      return (
         <React.Fragment>
         <div style={{marginBottom: 8}}>
            <a>
               <Link to="/dentalrecords"> <Icon type="arrow-left" /> Back to dental records</Link>
            </a>
         </div>
         <Card>
            <Tabs defaultActiveKey="1">
               <TabPane tab="Personal Info" key="1">
               <Divider orientation="left">Personal Info <a><Icon type="edit"/> Edit</a></Divider>
                  <Row>
                     <Col span={8}><DescriptionItem title="Code" content="ABCDEFGH"/></Col>
                     <Col span={8}><DescriptionItem title="Name" content="Jonathan Francisco" /></Col>
                     <Col span={8}><DescriptionItem title="Last Visit" content="August 19, 1998" /></Col>
                     <Col span={8}><DescriptionItem title="Birthday" content="February 1, 2015" /></Col>
                     <Col span={8}><DescriptionItem title="Occupation" content="Software Engineer && Project Manager" /></Col>
                     <Col span={8}><DescriptionItem title="Civil Status" content="It's complicated" /></Col>
                     <Col span={12}><DescriptionItem title="Address" content="Sa puso mo" /></Col>
                     <Col span={12}><DescriptionItem title="Contact No" content="09212451903" /></Col>
                  </Row>
               </TabPane>
               <TabPane tab="Dental Chart" key="2">
                  <Divider orientation="left">Adult Teeth (left) and Child Teeth (right)</Divider>
                  <Row>
                     <Col align="center" md={{span:12}} sm={{span: 24}}>
                        <AdultTeethChart />
                     </Col>
                     <Col align="center" md={{span: 12}} sm={{span: 24}}>
                        <ChildTeethChart />
                     </Col>
                  </Row>
               </TabPane>
            </Tabs>
            <Divider orientation="left">Treatments and/or Procedures taken <a><Icon type="plus" /> Add</a></Divider>
             <Table columns={columns} dataSource={data} />
         </Card>
         {/* <Row gutter={32}>
            <Col span={12}>
               <Divider orientation="left">Personal Info</Divider>
               <Row>
                  <Col span={8}><DescriptionItem title="Code" content="ABCDEFGH"/></Col>
                  <Col span={8}><DescriptionItem title="Name" content="Jonathan Francisco" /></Col>
                  <Col span={8}><DescriptionItem title="Last Visit" content="August 19, 1998" /></Col>
                  <Col span={8}><DescriptionItem title="Birthday" content="February 1, 2015" /></Col>
                  <Col span={8}><DescriptionItem title="Occupation" content="Software Engineer && Project Manager" /></Col>
                  <Col span={8}><DescriptionItem title="Civil Status" content="It's complicated" /></Col>
                  <Col span={24}><DescriptionItem title="Address" content="Sa puso mo" /></Col>
                  <Col span={24}><DescriptionItem title="Contact No" content="09212451903" /></Col>
               </Row>
            </Col>
         </Row> */}
       
         </React.Fragment>
      );
   }
}

export default DentalRecord;