import React from "react";
import {Button, Form, Input} from "semantic-ui-react";
import {POST_API} from "../../../http/POST_API";

// не используется
class CreateCustomBeeDiseaseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            errorText: '',
        }

        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            this.setState({errorText: ""})
            await this.postAPI.CreateCustomBeeDisease(this.state.name, this.state.description)
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
                    placeholder='Название болезни'
                    required
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.TextArea
                    label='Описание'
                    placeholder='Краткое описание породы болезни (опционально)'
                    name='description'
                    value={this.state.description}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Field control={Button}>Создать</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateCustomBeeDiseaseForm;
