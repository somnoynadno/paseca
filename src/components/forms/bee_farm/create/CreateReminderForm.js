import * as React from "react";
import {Button, Form, Input} from "semantic-ui-react";
import {GET_API} from "../../../../http/GET_API";
import {POST_API} from "../../../../http/POST_API";
import PropTypes from "prop-types";


class CreateReminderForm extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
        reloadCallback: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            text: '',
            date: null,
            errorText: '',
        }

        this.getAPI = new GET_API();
        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            this.setState({errorText: ""})
            await this.postAPI.CreateReminder(this.props.beeFarmID, this.state.title,
                this.state.text, this.state.date).then(async (resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => reload component
                    await this.props.reloadCallback();
                } else {
                    this.setState({errorText: resp.message});
                }
            })

        }
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    type='text'
                    label='Заголовок'
                    placeholder='Краткий и ёмкий'
                    required
                    name='title'
                    value={this.state.title}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.TextArea
                    label='Описание'
                    placeholder='О чём вы хотите себе напомнить?'
                    required
                    name='text'
                    value={this.state.text}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    type='date'
                    label='Когда нужно напомнить?'
                    placeholder='Укажите дату'
                    name='date'
                    required
                    value={this.state.date}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Field control={Button}>Создать</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateReminderForm;
