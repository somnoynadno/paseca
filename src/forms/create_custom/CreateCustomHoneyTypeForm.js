import React from "react";
import {Button, Form, Input} from "semantic-ui-react";
import {POST_API} from "../../http/POST_API";

class CreateCustomBeeDiseaseForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            base_price: NaN,
            errorText: '',
        }

        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (isNaN(parseInt(this.state.base_price))) {
                this.setState({errorText: "Цена килограмма мёда должна быть целым числом"});
                return
            }
            this.setState({errorText: ""});
            await this.postAPI.CreateCustomHoneyType(this.state.name, this.state.description, this.state.base_price)
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
                    placeholder='Название сорта мёда'
                    required
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Input}
                    type='number'
                    label='Цена за кг'
                    placeholder='Стоимость мёда'
                    required
                    name='base_price'
                    value={this.state.base_price}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.TextArea
                    label='Описание'
                    placeholder='Краткое описание сорта мёда (опционально)'
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
