import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Button, Row, Col, Typography, Form, Input, Switch, notification, Spin } from 'antd';
import signinbg from '../../assets/imgs/login.png';
import HeaderCo from '~/components/HeaderCo';
import FooterCo from '~/components/FooterCo';
import './SignIn.css';
import { loginUser } from '~/redux/apiRequest';
import { useDispatch } from 'react-redux';
function onChange(checked) {
    console.log(`switch to ${checked}`);
}

const { Title } = Typography;
const { Content } = Layout;

function SignIn() {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        const { username, password } = values;
        const user = {
            username,
            password,
        };

        await setLoading(true);
        await dispatch(loginUser(user, navigate));

        setLoading(false);
        openNotificationWithIcon();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const openNotificationWithIcon = () => {
        api['error']({
            message: 'Login failed',
            description: 'Incorrect username or password!',
        });
    };

    return (
        <Spin spinning={loading} delay={500}>
            <Layout className="layout-default layout-signin">
                <HeaderCo />
                {contextHolder}
                <Content className="signin">
                    <Row gutter={[24, 0]} justify="space-around">
                        <Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
                            <Title className="mb-15">Sign In</Title>
                            <Title className="font-regular text-muted" level={5}>
                                Enter your username and password to sign in
                            </Title>
                            <Form
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                className="row-col"
                            >
                                <Form.Item
                                    key="0"
                                    className="username"
                                    label="Username"
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>

                                <Form.Item
                                    key="1"
                                    className="username"
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder="Password" />
                                </Form.Item>

                                <Form.Item key="2" name="remember" className="aligin-center" valuePropName="checked">
                                    <>
                                        <Switch defaultChecked onChange={onChange} />
                                        Remember me
                                    </>
                                </Form.Item>

                                <Form.Item key="3">
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                        SIGN IN
                                    </Button>
                                </Form.Item>
                                <p className="font-semibold text-muted">
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="text-dark font-bold">
                                        Sign Up
                                    </Link>
                                </p>
                            </Form>
                        </Col>
                        <Col
                            className="sign-img"
                            style={{ padding: 12 }}
                            xs={{ span: 24 }}
                            lg={{ span: 12 }}
                            md={{ span: 12 }}
                        >
                            <img src={signinbg} alt="" />
                        </Col>
                    </Row>
                </Content>
                <FooterCo />
            </Layout>
        </Spin>
    );
}

export default SignIn;
