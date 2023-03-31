import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Radio, Table, Avatar, Typography, notification, Modal } from 'antd';

// import { ToTopOutlined } from '@ant-design/icons';
// import { Link } from 'react-router-dom';
import adminface from '../../assets/imgs/admin.png';
import userface from '../../assets/imgs/user.webp';
import DeleteBtn from '~/components/DeleteBtn';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUsers } from '~/redux/apiRequest';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;
const { confirm } = Modal;

const Tables = () => {
    const location = useLocation();
    const valueSearch = location.state?.value;

    const columns = [
        {
            title: 'USER',
            dataIndex: 'username',
            key: 'username',
            width: '32%',
            sorter: (record1, record2) => {
                return record1.username.props.children.props.children[1].props.children[0].props.children.localeCompare(
                    record2.username.props.children.props.children[1].props.children[0].props.children,
                );
            },
            filteredValue: [valueSearch ? valueSearch : ''],
            onFilter: (value, record) => {
                return String(record.username.props.children.props.children[1].props.children[0].props.children)
                    .toLowerCase()
                    .includes(value.toLowerCase());
            },
        },
        {
            title: 'FUNCTION',
            dataIndex: 'function',
            key: 'function',
            sorter: (record1, record2) => {
                return (
                    record1.function.props.children.props.children[0].props.children >
                    record2.function.props.children.props.children[0].props.children
                );
            },
        },

        {
            title: 'EMPLOYED',
            key: 'employed',
            dataIndex: 'employed',
            sorter: (record1, record2) => {
                console.log(record1.employed.props.children.props.children.props.children[0].props.children);
                return (
                    record1.employed.props.children.props.children.props.children[0].props.children >
                    record2.employed.props.children.props.children.props.children[0].props.children
                );
            },
        },
        {
            title: '',
            key: 'btn',
            dataIndex: 'btn',
        },
    ];

    const dispatch = useDispatch();
    const [userList, setUserList] = useState(null);
    const allUsers = useSelector((state) => state.user.user?.allUsers);

    const msg = useSelector((state) => state.user.msg?.mess);
    let msgState = useSelector((state) => state.user.msg?.msgState);

    useEffect(() => {
        setUserList(allUsers);
    }, [allUsers]);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type) => {
        if (api[type]) {
            api[type]({
                message: msg ? msg : `Delete ${type}`,
            });
        }
    };

    const [data, setData] = useState(null);

    const handleDelete = async (id) => {
        await deleteUser(dispatch, id);
        msgState = localStorage.getItem('state');
        openNotificationWithIcon(msgState);
        getAllUsers(dispatch);

        if (msgState === 'success') {
            setUserList(
                userList.filter((user) => {
                    return user._id !== id;
                }),
            );
        }
    };

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this user?',
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

    const render = (userList) =>
        userList?.map((item, index) => {
            return {
                key: index,
                username: (
                    <>
                        <Avatar.Group>
                            <Avatar
                                className="shape-avatar"
                                shape="square"
                                size={40}
                                src={item.isAdmin ? adminface : userface}
                            ></Avatar>
                            <div className="avatar-info">
                                <Title level={5}>{item.username}</Title>
                                <p>{item.email}</p>
                            </div>
                        </Avatar.Group>
                    </>
                ),
                function: (
                    <>
                        <div className="author-info">
                            <Title level={5}>{item.isAdmin ? 'Admin' : 'User'}</Title>
                            <p>{item.isAdmin ? 'Developer' : 'Cules'}</p>
                        </div>
                    </>
                ),

                employed: (
                    <>
                        <div className="ant-employed">
                            <span>
                                <Title level={5}>{item.createdAt.slice(0, 10)}</Title>
                                <p>{item.createdAt.slice(11, 19)}</p>
                            </span>
                        </div>
                    </>
                ),
                btn: (
                    <div
                        style={{ width: 'fit-content' }}
                        onClick={() => {
                            showDeleteConfirm(item._id);
                        }}
                    >
                        <DeleteBtn />
                    </div>
                ),
            };
        });

    const onChange = (e) => {
        if (e.target.value === 'b') {
            const adminItem = userList.filter((item) => item.isAdmin === true);
            setData(render(adminItem));
        } else {
            setData(render(userList));
        }
    };

    useEffect(() => {
        setData(render(userList));
    }, [userList]);

    return (
        <>
            {/* {msgState ? <Alert message={msg} type={msgState} closable showIcon /> : ''} */}
            {contextHolder}
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Users Table"
                            extra={
                                <>
                                    <Radio.Group onChange={onChange} defaultValue="a">
                                        <Radio.Button value="a">All</Radio.Button>
                                        <Radio.Button value="b">ADMIN</Radio.Button>
                                    </Radio.Group>
                                </>
                            }
                        >
                            <div className="table-responsive">
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
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Tables;
