import React from 'react';
import '../index.css';

import {API} from '../http/API';
import {Button, Container, Form, Grid, Input, Segment} from "semantic-ui-react";


class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorText: ''
        };
        this.api = new API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.api.LoginUser(this.state.email, this.state.password)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    localStorage.setItem('token', resp["token"]);
                    localStorage.setItem('user_id', resp["user_id"]);
                    window.location.href = '/';
                } else {
                    this.setState({errorText: "Неверные логин или пароль"});
                }
            })
    }

    render() {
        return <Container>
            <Grid stackable columns={3} centered>
                <Grid.Row style={{margin: "5% auto"}}>
                    <Grid.Column>
                        <Segment raised>
                        <h1>Здравствуйте!</h1>
                            <br />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field
                                    control={Input}
                                    type='email'
                                    label='Почта'
                                    placeholder='Введите почту'
                                    required
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    type='password'
                                    label='Пароль'
                                    placeholder='Введите пароль'
                                    required
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <div style={{color: "red"}}>{this.state.errorText}</div>
                                <br />
                                <Form.Field control={Button}>Войти</Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    }
}

export default Login;
