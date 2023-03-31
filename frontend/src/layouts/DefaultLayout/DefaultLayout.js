import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Affix, Drawer, Layout, Spin } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

import './DefaultLayout.css';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, getUserById } from '~/redux/apiRequest';

const { Header: AntHeader, Content, Sider } = Layout;

const DefaultLayout = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = localStorage.getItem('accessToken');
    const id = localStorage.getItem('id');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/signin');
        }
        setLoading(true);
        getAllUsers(dispatch);
        getUserById(dispatch, id);
        setLoading(false);
        return () => {
            if (!user) {
                navigate('/signin');
            }
        };
    }, [dispatch, navigate, user, id]);

    const isAdmin = useSelector((state) => state.user.user?.userId?.isAdmin);

    const [visible, setVisible] = useState(false);
    const [sidenavType, setSidenavType] = useState('transparent');
    const [sidenavColor, setSidenavColor] = useState('#1890ff');
    const [fixed, setFixed] = useState(false);

    const openDrawer = () => setVisible(!visible);
    const handleSidenavType = (type) => setSidenavType(type);
    const handleSidenavColor = (color) => setSidenavColor(color);
    const handleFixedNavbar = (type) => setFixed(type);

    let { pathname } = useLocation();
    pathname = pathname.replace('/', '');
    pathname = pathname ? pathname : 'dashboard';
    return (
        <Spin spinning={loading} delay={500}>
            <Layout className={`layout-dashboard ${pathname === 'profile' ? 'layout-profile' : ''} `}>
                <Drawer
                    title={false}
                    placement={'left'}
                    closable={false}
                    onClose={() => setVisible(false)}
                    open={visible}
                    key={'left'}
                    width={250}
                    className={`drawer-sidebar `}
                >
                    <Layout className={`layout-dashboard`}>
                        <Sider
                            trigger={null}
                            width={250}
                            theme="light"
                            className={`sider-primary ant-layout-sider-primary ${
                                sidenavType === '#fff' ? 'active-route' : ''
                            }`}
                            style={{ background: sidenavType }}
                        >
                            <Sidebar isAdmin={isAdmin} color={sidenavColor} />
                        </Sider>
                    </Layout>
                </Drawer>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    trigger={null}
                    width={250}
                    theme="light"
                    className={`sider-primary ant-layout-sider-primary ${sidenavType === '#fff' ? 'active-route' : ''}`}
                    style={{ background: sidenavType }}
                >
                    <Sidebar isAdmin={isAdmin} color={sidenavColor} />
                </Sider>
                <Layout>
                    {fixed ? (
                        <Affix>
                            <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
                                <Header
                                    onPress={openDrawer}
                                    name={pathname}
                                    handleSidenavColor={handleSidenavColor}
                                    handleSidenavType={handleSidenavType}
                                    handleFixedNavbar={handleFixedNavbar}
                                />
                            </AntHeader>
                        </Affix>
                    ) : (
                        <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
                            <Header
                                onPress={openDrawer}
                                name={pathname}
                                handleSidenavColor={handleSidenavColor}
                                handleSidenavType={handleSidenavType}
                                handleFixedNavbar={handleFixedNavbar}
                            />
                        </AntHeader>
                    )}
                    <Content className="content-ant">{children}</Content>
                    <Footer />
                </Layout>
            </Layout>
        </Spin>
    );
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
