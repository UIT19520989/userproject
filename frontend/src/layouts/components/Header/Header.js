import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Breadcrumb, Button, Col, Drawer, Dropdown, Input, Row, Switch, Typography } from 'antd';
import { bell, profile, setting, toggler } from '~/components/Icons';
import { FacebookFilled, GithubOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

const ButtonContainer = styled.div`
    .ant-btn-primary {
        background-color: #1890ff;
    }
    .ant-btn-success {
        background-color: #52c41a;
    }
    .ant-btn-yellow {
        background-color: #fadb14;
    }
    .ant-btn-black {
        background-color: #262626;
        color: #fff;
        border: 0px;
        border-radius: 5px;
    }
    .ant-btn-danger {
        background-color: #ff4d4f;
    }
    .ant-switch-active {
        background-color: #1890ff;
    }
`;
const Header = ({ placement, name, handleSidenavColor, onPress, handleSidenavType, handleFixedNavbar }) => {
    const navigate = useNavigate();

    const { Title, Text } = Typography;

    const [visible, setVisible] = useState(false);
    const [sidenavType, setSidenavType] = useState('transparent');

    useEffect(() => window.scrollTo(0, 0));

    const showDrawer = () => setVisible(true);
    const hideDrawer = () => setVisible(false);
    const userList = useSelector((state) => state.user.user?.allUsers);
    const username = useSelector((state) => state.user.user?.userId?.username);

    let numOfAds = 0;
    let numOfUsr = 0;

    userList?.forEach((element) => {
        element.isAdmin ? ++numOfAds : ++numOfUsr;
    });

    const handleSearch = (value) => {
        navigate('/tables', { state: { value } });
    };

    const items = [
        {
            key: '1',
            label: `Number of Admins: ${numOfAds}`,
        },
        {
            key: '2',
            label: `Number of Users: ${numOfUsr}`,
        },
    ];

    return (
        <>
            <div className={cx('setting-drwer')} onClick={showDrawer}>
                {setting}
            </div>
            <Row gutter={[24, 0]}>
                <Col span={24} md={6}>
                    <Breadcrumb
                        items={[
                            {
                                title: <NavLink to="/profile">Pages</NavLink>,
                            },
                            {
                                title: <div style={{ textTransform: 'capitalize' }}>{name.replace('/', '')}</div>,
                            },
                        ]}
                    ></Breadcrumb>
                    <div className="ant-page-header-heading">
                        <span className="ant-page-header-heading-title" style={{ textTransform: 'capitalize' }}>
                            {name.replace('/', '')}
                        </span>
                    </div>
                </Col>
                <Col span={24} md={18} className="header-control">
                    <Button type="link" className="sidebar-toggler" onClick={() => onPress()}>
                        {toggler}
                    </Button>
                    <Drawer
                        className="settings-drawer"
                        mask={true}
                        width={360}
                        onClose={hideDrawer}
                        placement={placement}
                        open={visible}
                    >
                        <div layout="vertical">
                            <div className={cx('header-top')}>
                                <Title level={4}>
                                    Configurator
                                    <Text className={cx('subtitle')}>See our dashboard options.</Text>
                                </Title>
                            </div>

                            <div className={cx('sidebar-color')}>
                                <Title level={5}>Sidebar Color</Title>
                                <div className="theme-color">
                                    <ButtonContainer>
                                        <Button type="primary" onClick={() => handleSidenavColor('#1890ff')}></Button>
                                        <Button type="success" onClick={() => handleSidenavColor('#52c41a')}></Button>
                                        <Button type="danger" onClick={() => handleSidenavColor('#d9363e')}></Button>
                                        <Button type="yellow" onClick={() => handleSidenavColor('#fadb14')}></Button>
                                        <Button type="black" onClick={() => handleSidenavColor('#111')}></Button>
                                    </ButtonContainer>
                                </div>

                                <div className="sidebarnav-color">
                                    <Title level={5}>Sidenav Type</Title>
                                    <Text>Choose between 2 different sidenav types.</Text>
                                    <ButtonContainer className="trans">
                                        <Button
                                            type={sidenavType === 'transparent' ? 'primary' : 'white'}
                                            onClick={() => {
                                                handleSidenavType('transparent');
                                                setSidenavType('transparent');
                                            }}
                                        >
                                            TRANSPARENT
                                        </Button>
                                        <Button
                                            type={sidenavType === 'white' ? 'primary' : 'white'}
                                            onClick={() => {
                                                handleSidenavType('#fff');
                                                setSidenavType('white');
                                            }}
                                        >
                                            WHITE
                                        </Button>
                                    </ButtonContainer>
                                </div>
                                <div className="fixed-nav">
                                    <Title level={5}>Navbar Fixed </Title>
                                    <Switch onChange={(e) => handleFixedNavbar(e)} />
                                </div>

                                <div className="info">
                                    <Title level={5}>Contact us !!</Title>
                                    <ButtonContainer className="contact">
                                        <Button type="black">{<GithubOutlined />}</Button>
                                        <Button type="black">{<FacebookFilled />}</Button>
                                    </ButtonContainer>
                                </div>
                            </div>
                        </div>
                    </Drawer>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        placement="bottomRight"
                    >
                        <Button type="link">
                            <Badge size="small" count={userList?.length}>
                                {bell}
                            </Badge>
                        </Button>
                    </Dropdown>

                    <Link to="/profile" className="btn-sign-in">
                        {profile}
                        <span>{username}</span>
                    </Link>
                    <Input.Search
                        onSearch={(value) => {
                            handleSearch(value);
                        }}
                        className="header-search"
                        placeholder="Type username here..."
                        allowClear
                    />
                </Col>
            </Row>
        </>
    );
};

export default Header;
