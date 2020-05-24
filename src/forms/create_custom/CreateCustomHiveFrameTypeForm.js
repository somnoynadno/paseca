import React from "react";
import {Button, Form, Input, Label} from "semantic-ui-react";
import {POST_API} from "../../http/POST_API";

class CreateCustomHiveFrameTypeForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            errorText: '',
        }

        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            this.setState({errorText: ""});
            await this.postAPI.CreateCustomHiveFrameType(this.state.name)
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
                    placeholder='Название типа рамки улья'
                    required
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <Label pointing='left'>Ваш тип рамки (дадан, рута или другое)</Label>
            </Form.Group>
            <Form.Field control={Button}>Создать</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateCustomHiveFrameTypeForm;
