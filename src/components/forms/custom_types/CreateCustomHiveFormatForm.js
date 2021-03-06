import React from "react";
import {Button, Form, Input, Label} from "semantic-ui-react";
import {POST_API} from "../../../http/POST_API";

class CreateCustomHiveFormatForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            size: '',
            errorText: '',
        }

        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (isNaN(parseInt(this.state.size))) {
                this.setState({errorText: "Размер должен быть целым числом"});
                return
            }
            this.setState({errorText: ""});
            await this.postAPI.CreateCustomHiveFormat(this.state.name, this.state.size)
                .then((resp) => {
                    if (resp.constructor !== Error) {
                        // everything is fine => reload page
                        document.location.reload();
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
                    label='Название'
                    placeholder='Название формата улья'
                    required
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <Label pointing='left'>Ваш формат улья (лежак, полулежак или другой)</Label>
            </Form.Group>
            <Form.Group>
                <Form.Field
                    control={Input}
                    type='number'
                    label='Размерность'
                    placeholder='Количество рамок'
                    required
                    name='size'
                    value={this.state.size}
                    onChange={this.handleChange}
                />
                <Label pointing='left'>Количество рамок в улье (16, 32 или иное число)</Label>
            </Form.Group>
            <Form.Field control={Button}>Создать</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateCustomHiveFormatForm;
