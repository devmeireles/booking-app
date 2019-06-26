import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;


class FooterBottom extends React.Component {
    state = {
        current: 'mail',
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Footer style={{ textAlign: 'center' }}>BookingApp © 2018 Created by dev.meireles</Footer>
        );
    }
}

export default FooterBottom;