import React, { useLayoutEffect, useState } from 'react';
import BgProfile from '../../assets/imgs/barca-bg.jpg';
import BgProfile1 from '../../assets/imgs/bg-tech.jpg';
import BgProfile2 from '../../assets/imgs/bg-profile.jpg';
import BgProfile3 from '../../assets/imgs/bg-human.jpg';
import userAvatar from '../../assets/imgs/user.webp';
import adminAvatar from '../../assets/imgs/admin.png';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Avatar, Button, Card, Col, Descriptions, Row, Modal, Input, Typography, Table, notification } from 'antd';
import { deletebtn, pencil } from '~/components/Icons';
import { deleteUser, getUserById, updateUser } from '~/redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
    ExclamationCircleFilled,
    FacebookOutlined,
    InstagramOutlined,
    SearchOutlined,
    TwitterOutlined,
} from '@ant-design/icons';

const cx = classNames.bind(styles);
const { confirm } = Modal;
const { Title } = Typography;

const columns = [
    {
        title: 'Other Users',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
                <Input
                    placeholder="Search here"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                    }}
                    onPressEnter={() => {
                        confirm();
                    }}
                    onBlur={() => {
                        confirm();
                    }}
                    allowClear
                ></Input>
            );
        },
        filterIcon: () => {
            return <SearchOutlined />;
        },
        onFilter: (value, record) => {
            const name = record?.name.props.children[1].props.children[0].props.children;
            return name.toLowerCase().includes(value.toLowerCase());
        },
    },
];
const bg = [BgProfile, BgProfile1, BgProfile2, BgProfile3];

const bgm = bg[Math.floor(Math.random() * bg.length)];

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    let usr = useSelector((state) => state.user.user?.userId);
    const userList = useSelector((state) => state.user.user?.allUsers);

    const [usernameUpdate, setUsernameUpdate] = useState('');
    const [emailUpdate, setEmailUpdate] = useState('');
    const [api, contextHolder] = notification.useNotification();

    useLayoutEffect(() => {
        setUser(usr);
    }, [usr]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);

    const handleDelete = (id) => {
        deleteUser(dispatch, id);
        localStorage.clear();
        navigate('/signin');
    };

    const openNotificationWithIcon = (type) => {
        if (api[type]) {
            api[type]({
                message: `Upadate ${type}`,
            });
        }
    };

    const handleUpdate = async (username, email, id) => {
        const newData = {
            username: username,
            email: email,
        };
        await updateUser(dispatch, id, newData);
        const msgState = localStorage.getItem('state');
        openNotificationWithIcon(msgState);
        getUserById(dispatch, id);

        if (msgState === 'success') {
            usr = {
                ...usr,
                ...newData,
            };
            setUser(usr);
        }
    };

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete your account?',
            icon: <ExclamationCircleFilled />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
                handleDelete(id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const data = userList?.map((item, index) => {
        return {
            key: index,
            name: (
                <Avatar.Group>
                    <Avatar
                        className="shape-avatar"
                        shape="square"
                        size={40}
                        src={item.isAdmin ? adminAvatar : userAvatar}
                    ></Avatar>
                    <div className="avatar-info">
                        <Title level={5}>{item.username}</Title>
                        <p>{item.email}</p>
                    </div>
                </Avatar.Group>
            ),
        };
    });

    if (user) {
        return (
            <>
                <div className={cx('profile-nav-bg')} style={{ backgroundImage: 'url(' + bgm + ')' }}></div>
                {contextHolder}
                <Card
                    className="card-profile-head"
                    bodyStyle={{ display: 'none' }}
                    title={
                        <Row justify="space-between" align="middle" gutter={[24, 0]}>
                            <Col span={24} md={12} className="col-info">
                                <Avatar.Group>
                                    <Avatar size={74} shape="square" src={user?.isAdmin ? adminAvatar : userAvatar} />

                                    <div className="avatar-info">
                                        <h4 className="font-semibold m-0">{user?.username}</h4>
                                        <p>{user?.isAdmin ? 'Admin' : 'User'}</p>
                                    </div>
                                </Avatar.Group>
                            </Col>
                            <Col
                                span={24}
                                md={12}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <div className="col-action">
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => {
                                            showDeleteConfirm(user._id);
                                        }}
                                    >
                                        <div className={cx('actionDelete')}>{deletebtn} DELETE</div>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    }
                ></Card>
                <Row gutter={[24, 0]}>
                    <Col span={24} md={16} className="mb-24">
                        <Card
                            className="h-full"
                            bordered={false}
                            title={<h6 className="font-semibold m-0">Profile Information</h6>}
                            extra={
                                !isUpdate ? (
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setIsUpdate(true);
                                        }}
                                    >
                                        {pencil}
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                handleUpdate(
                                                    usernameUpdate ? usernameUpdate : user.username,
                                                    emailUpdate ? emailUpdate : user.email,
                                                    user._id,
                                                );
                                                setIsUpdate(false);
                                            }}
                                        >
                                            OK
                                        </Button>
                                        <Button
                                            type="link"
                                            style={{ marginLeft: '10px' }}
                                            onClick={() => {
                                                setIsUpdate(false);
                                                setUsernameUpdate(user.username);
                                                setEmailUpdate(user.email);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                )
                            }
                            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                        >
                            <Descriptions title={user?.isAdmin ? 'Admin' : 'User'} className={cx('desTitle')}>
                                <Descriptions.Item label="Name" span={3}>
                                    {isUpdate ? (
                                        <Input
                                            required
                                            onChange={(e) => {
                                                setUsernameUpdate(e.target.value);
                                            }}
                                            value={usernameUpdate ? usernameUpdate : user.username}
                                            onPressEnter={() => {
                                                handleUpdate(
                                                    usernameUpdate ? usernameUpdate : user.username,
                                                    emailUpdate ? emailUpdate : user.email,
                                                    user._id,
                                                );
                                                setIsUpdate(false);
                                            }}
                                        ></Input>
                                    ) : (
                                        user?.username
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item required label="Email" span={3}>
                                    {isUpdate ? (
                                        <Input
                                            required
                                            onChange={(e) => {
                                                setEmailUpdate(e.target.value);
                                            }}
                                            value={emailUpdate ? emailUpdate : user.email}
                                            onPressEnter={() => {
                                                handleUpdate(
                                                    usernameUpdate ? usernameUpdate : user.username,
                                                    emailUpdate ? emailUpdate : user.email,
                                                    user._id,
                                                );
                                                setIsUpdate(false);
                                            }}
                                        ></Input>
                                    ) : (
                                        user?.email
                                    )}
                                </Descriptions.Item>
                                <Descriptions.Item label="Date created" span={3}>
                                    {user?.createdAt.slice(0, 10)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Last update date" span={3}>
                                    {user?.updatedAt.slice(0, 10)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Social" span={3}>
                                    <Link to="#" className="mx-5 px-5">
                                        {<TwitterOutlined />}
                                    </Link>
                                    <Link to="#" className="mx-5 px-5">
                                        {<FacebookOutlined style={{ color: '#344e86' }} />}
                                    </Link>
                                    <Link to="#" className="mx-5 px-5">
                                        {<InstagramOutlined style={{ color: '#e1306c' }} />}
                                    </Link>
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                    <Col span={24} md={8} className="mb-24">
                        <Card bordered={false} className="h-full">
                            <Table
                                columns={columns}
                                dataSource={data}
                                pagination={{
                                    current: page,
                                    pageSize: pageSize,
                                    onChange: (page, pageSize) => {
                                        setPage(page);
                                        setPageSize(pageSize);
                                    },
                                }}
                                className="ant-border-space"
                            />
                        </Card>
                    </Col>
                </Row>
            </>
        );
    }
};

export default Profile;
