import { RightOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React from 'react';
import { Link } from 'react-router-dom';
import EChart from '~/components/Chart/Echart/EChart';
import LineChart from '~/components/Chart/LineChart/LineChart';
import './Home.scss';

const { Title, Text } = Typography;

const Home = () => {
    return (
        <>
            <Row gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                    <Card bordered={false} className="criclebox h-full">
                        <EChart />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} className="mb-24">
                    <Card bordered={false} className="criclebox h-full">
                        <LineChart />
                    </Card>
                </Col>
            </Row>
            <Row gutter={[24, 0]}>
                <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mb-24">
                    <Card bordered={false} className="criclebox h-full">
                        <Row gutter>
                            <Col xs={24} md={12} sm={24} lg={12} xl={14} className="mobile-24">
                                <div className="h-full col-content p-20">
                                    <div className="ant-muse">
                                        <Text>Built by developers</Text>
                                        <Title level={5}>Cules Dashboard for Ant Design</Title>
                                        <Paragraph className="lastweek mb-36">
                                            From colors, cards, typography to complex elements, you will find the full
                                            documentation.
                                        </Paragraph>
                                    </div>
                                    <div className="card-footer">
                                        <a className="icon-move-right" href="https://ant.design/components/overview/">
                                            Read More
                                            {<RightOutlined />}
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col xs={24} md={12} sm={24} lg={12} xl={10} className="mb-24">
                    <Card bordered={false} className="criclebox card-info-2 h-full">
                        <div className="gradent h-full col-content">
                            <div className="card-content">
                                <Title level={5}>Work with the best</Title>
                                <p>
                                    Wealth creation is an evolutionarily recent positive-sum game. It is all about who
                                    take the opportunity first.
                                </p>
                            </div>
                            <div className="card-footer">
                                <Link className="icon-move-right" to="https://ant.design/components/overview/">
                                    Read More
                                    <RightOutlined />
                                </Link>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Home;
