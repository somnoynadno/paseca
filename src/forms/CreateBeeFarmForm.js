import {Button, Form, Input, Select} from "semantic-ui-react";
import React from "react";

const beeFarmTypeOptions = [
    { text: 'Основная', value: '1' },
    { text: 'Кочевая', value: '2' },
]

const beeFarmSizeOptions = [
    { text: 'Большая', value: '1' },
    { text: 'Средняя', value: '2' },
]

class CreateBeeFarmForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bee_farm_type_id: '',
            bee_farm_size_id: '',
            name: '',
            location: ''
        }

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = () => {
            // TODO: API call
            console.log(this.state);
        }
    }
    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    label='Тип пасеки'
                    options={beeFarmTypeOptions}
                    placeholder='Выберите тип пасеки'
                    required
                    name='bee_farm_type_id'
                    value={this.state.bee_farm_type_id}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Размер пасеки'
                    options={beeFarmSizeOptions}
                    placeholder='Выберите размер пасеки'
                    required
                    name='bee_farm_size_id'
                    value={this.state.honey_type_id}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    type='text'
                    label='Название'
                    placeholder='Укажите название пасеки'
                    required
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Input}
                    type='text'
                    label='Расположение'
                    placeholder='Укажите расположение пасеки'
                    name='location'
                    value={this.state.location}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Field control={Button}>Создать</Form.Field>
            <strong>onChange:</strong>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </Form>
    }
}

export default CreateBeeFarmForm;
