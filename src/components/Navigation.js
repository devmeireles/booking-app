import React, { Component } from 'react';
import { Menu, Icon, Breadcrumb } from 'antd';

const { SubMenu } = Menu;


class Navigation extends React.Component {
    render() {
        return (
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Be a Host</Menu.Item>
                <Menu.Item key="3">Sign up</Menu.Item>
                <Menu.Item key="4">Login up</Menu.Item>
            </Menu>
        );
    }
}

export default Navigation;