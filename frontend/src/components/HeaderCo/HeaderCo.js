import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { profile, signin, signup, template } from '../Icons';
import { Link } from 'react-router-dom';
import './HeaderCo.css';

const { Header } = Layout;
const items = [
    {
        key: '0',
        label: (
            <Link to="/">
                {template}
                <span> Dashboard</span>
            </Link>
        ),
    },
    {
        key: '1',
        label: (
            <Link to="/profile">
                {profile}
                <span>Profile</span>
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link to="/signup">
                {signup}
                <span> Sign Up</span>
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link to="/signin">
                {signin}
                <span> Sign In</span>
            </Link>
        ),
    },
];

function HeaderCo() {
    return (
        <Header>
            <div className="header-col header-brand">
                <h5>Cules Dashboard</h5>
            </div>
            <div className="header-col header-nav">
                <Menu mode="horizontal" items={items}></Menu>
            </div>
            <div className="header-col header-btn">
                <Button type="false">
                    <a href="https://github.com/UIT19520989">FREE DOWNLOAD</a>
                </Button>
            </div>
        </Header>
    );
}

export default HeaderCo;
