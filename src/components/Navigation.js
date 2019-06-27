import React, { Component } from 'react';
import { Menu, Icon, Breadcrumb, Modal, Button, Form, Input } from 'antd';



class Navigation extends React.Component {
    state = {
        visible: false
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">Home</Menu.Item>
                    <Menu.Item key="2">Be a Host</Menu.Item>
                    <Menu.Item key="3">Sign up</Menu.Item>
                    <Menu.Item key="4">
                        <a  onClick={this.showModal}>Login up</a>
                    </Menu.Item>
                </Menu>

                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <h1 className="boldFont formTitle">Meet awesome peoples in awesome places</h1>
                        <Form.Item label="E-mail">
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        </Form.Item>

                        <Form.Item label="Password">
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            />
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>

                        <Form.Item>
                            <Button block type="primary">Log in</Button>
                        </Form.Item>

                        Or <a href="">register now!</a>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Navigation;