import React, { useState } from 'react';
import { Layout, Button, Typography, Card, Form, Input, Checkbox, notification, Spin } from 'antd';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, MailOutlined, UnlockOutlined } from '@ant-design/icons';

import HeaderCo from '~/components/HeaderCo';
import FooterCo from '~/components/FooterCo';
import { useDispatch } from 'react-redux';
import { registerUser } from '~/redux/apiRequest';
// import '~/assets/styles/responsive.css';

const { Title } = Typography;
const { Content } = Layout;

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        const { username, email, password } = values;
        const newUser = {
            username,
            email,
            password,
        };
        await setLoading(true);
        await dispatch(registerUser(newUser, navigate));

        openNotificationWithIcon();
        setLoading(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const openNotificationWithIcon = () => {
        api['error']({
            message: 'Register failed',
            description: 'Username or email already exist!',
        });
    };

    return (
        <Spin spinning={loading} delay={500}>
            <div className="layout-default ant-layout layout-sign-up">
                <HeaderCo />
                {contextHolder}
                <Content className="p-0">
                    <div className="sign-up-header">
                        <div className="content">
                            <Title>Sign Up</Title>
                        </div>
                    </div>

                    <Card
                        className="card-signup header-solid h-full ant-card pt-0"
                        title={<h5>Register with</h5>}
                        bordered="false"
                    >
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            className="row-col"
                        >
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                            </Form.Item>
                            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error('The two passwords that you entered do not match!'),
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<UnlockOutlined className="site-form-item-icon" />}
                                    placeholder="Comfirm your password"
                                />
                            </Form.Item>

                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}
                            >
                                <Checkbox>
                                    I agree the{' '}
                                    <Link to="#p" className="font-bold text-dark">
                                        Terms and Conditions
                                    </Link>
                                </Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button style={{ width: '100%', marginTop: '10px' }} type="primary" htmlType="submit">
                                    SIGN UP
                                </Button>
                            </Form.Item>
                        </Form>
                        <p className="font-semibold text-muted text-center">
                            Already have an account?{' '}
                            <Link to="/signin" className="font-bold text-dark">
                                Sign In
                            </Link>
                        </p>
                    </Card>
                </Content>
                <FooterCo />
            </div>
        </Spin>
    );
};

export default SignUp;
