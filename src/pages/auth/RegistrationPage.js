import React from 'react';
import '../../index.css';

import {Button, Container, Form, Grid, Input, Segment} from "semantic-ui-react";
import {API} from "../../http/API";
import ReCAPTCHA from "react-google-recaptcha";

/*
 Страница регистрации
 */
class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            password_repeat: '',
            name: '',
            surname: '',
            errorText: ''
        };
        this.api = new API();
        this.captcha = null;

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({errorText: ""});

        if (!this.validateData()) return;

        await this.api.RegisterUser(this.state.email, this.state.password,
            this.state.name, this.state.surname, this.captcha)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    window.location.href = '/login';
                } else {
                    console.log(resp);
                    if (resp.response.status === 400) {
                        this.setState({errorText: "Пользователь с такой почтой уже зарегистирован"});
                    } else if (resp.response.status === 401) {
                        this.setState({errorText: "Проблемы с капчей, повторите попытку позже"});
                    } else {
                        this.setState({errorText: "Неожиданная ошибка сервера. Свяжитесь с администратором."});
                    }
                }
            })
    }

    validateData() {
        if (this.state.password !== this.state.password_repeat) {
            this.setState({errorText: "Пароли не совпадают"});
            return false
        }

        if (this.state.password.length <= 6) {
            this.setState({errorText: "Не рекомендуется использовать короткий пароль"});
            return false
        }

        if (!this.captcha) {
            this.setState({errorText: "Вы точно не робот?"});
            return false
        }

        return true
    }

    onCaptchaChanged(value) {
        console.log("Captcha value:", value);
        this.captcha = value;
    }

    render() {
        return <Container>
            <Grid stackable columns={3} centered>
                <Grid.Row style={{margin: "20px"}}>
                    <Grid.Column>
                        <Segment raised>
                            <h1>Регистрация</h1>
                            <br />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Field
                                    control={Input}
                                    type='text'
                                    label='Имя'
                                    placeholder='Введите ваше имя'
                                    required
                                    name='name'
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    type='text'
                                    label='Фамилия'
                                    placeholder='Введите вашу фамилию'
                                    required
                                    name='surname'
                                    value={this.state.surname}
                                    onChange={this.handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    type='email'
                                    label='Почта'
                                    placeholder='Введите вашу почту'
                                    required
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <hr /><br />
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
                                <Form.Field
                                    control={Input}
                                    type='password'
                                    label='Повторите пароль'
                                    placeholder='Введите пароль ещё раз'
                                    required
                                    name='password_repeat'
                                    value={this.state.password_repeat}
                                    onChange={this.handleChange}
                                />
                                <div style={{color: "red"}}>{this.state.errorText}</div>
                                <br />

                                <ReCAPTCHA
                                    sitekey="6LddjqUZAAAAAKpWlnuNRX01-x4QoazMilSeiAWA"
                                    onChange={this.onCaptchaChanged.bind(this)}
                                />
                                <br />

                                <Form.Field control={Button}>Зарегистироваться</Form.Field>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    }
}

export default RegistrationPage;
