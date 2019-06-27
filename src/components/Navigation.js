import React from 'react';
import { Menu, Icon, Modal, Button, Form, Input, Checkbox } from 'antd';

import api from '../services/api';
import { login, logout } from "../services/auth";



class Navigation extends React.Component {
    state = {
        visible: false,
        email: "",
        password: "",
        error: ""
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

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post("/auth/autenticate", { email, password });
                login(response.data.token, response.data.user.name);
            } catch (err) {
                this.setState({
                    error: "Houve um problema com o login, verifique suas credenciais. T.T"
                });
            }
        }
    };

    // callLogout = async() => {
    //     await logout();
    // }

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
                    {localStorage.getItem("@Token") ?
                        <Menu.Item key="2">Be a Host</Menu.Item>
                        : null
                    }
                    <Menu.Item key="3">Sign up</Menu.Item>
                    <Menu.Item key="4">
                        {localStorage.getItem("@Token") ?
                            <a href="#">Log out</a>
                            :
                            <a href="#" onClick={this.showModal}>Login up</a>
                        }
                    </Menu.Item>
                </Menu>

                <Modal
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Form onSubmit={this.handleSignIn} className="login-form">
                        {this.state.error && <p>{this.state.error}</p>}
                        <Form.Item>
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="E-mail"
                            onChange={e => this.setState({ email: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            onChange={e => this.setState({ password: e.target.value })}
                            />
                        </Form.Item>
                        <Form.Item>
                        <Checkbox>Remember me</Checkbox>
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Navigation;