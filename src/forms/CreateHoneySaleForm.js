import {Button, Form, Input, Select} from "semantic-ui-react";
import React from "react";

const farmOptions = [
    { key: 'f1', text: 'Пасека 1', value: '1' },
    { key: 'f2', text: 'Пасека 2', value: '2' },
    { key: 'f3', text: 'Пасека 3', value: '3' },
]

const honeyOptions = [
    { key: 'h1', text: 'Мёд 1', value: '1' },
    { key: 'h2', text: 'Мёд 2', value: '2' },
]


class CreateHoneySaleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            honey_type_id: '',
            bee_farm_id: '',
            amount: '',
            total_price: '',
            date: ''
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
                    label='Пасека'
                    options={farmOptions}
                    placeholder='Выберите пасеку'
                    required
                    name='bee_farm_id'
                    value={this.state.bee_farm_id}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Мёд'
                    options={honeyOptions}
                    placeholder='Выберите вид мёда'
                    required
                    name='honey_type_id'
                    value={this.state.honey_type_id}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    type='number'
                    label='Количество (кг)'
                    placeholder='Укажите количество'
                    required
                    name='amount'
                    value={this.state.amount}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Input}
                    type='number'
                    label='Стоимость'
                    placeholder='Укажите суммарную стоимость'
                    required
                    name='total_price'
                    value={this.state.total_price}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Input}
                    type='date'
                    label='Дата'
                    placeholder='Укажите дату'
                    required
                    name='date'
                    value={this.state.date}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Field control={Button}>Создать</Form.Field>
            <strong>onChange:</strong>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </Form>
    }
}

export default CreateHoneySaleForm
