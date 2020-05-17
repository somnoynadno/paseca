import {Button, Form, Input, Select} from "semantic-ui-react";
import React from "react";
import {API} from "../http/API";


class CreateHoneySaleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            honey_type_id: '',
            bee_farm_id: '',
            amount: '',
            total_price: '',
            date: '',
            errorText: '',
            honeyTypes: [],
            beeFarms: []
        }

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.api = new API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (!this.state.honey_type_id || !this.state.bee_farm_id) {
                this.setState({errorText: "Вы заполнили не все поля"})
            } else {
                this.setState({errorText: ""})
                await this.api.CreateHoneySale(this.state.amount, this.state.date,
                    this.state.honey_type_id, this.state.bee_farm_id, this.state.total_price
                ).then((resp) => {
                    if (resp.constructor !== Error) {
                        // everything is fine => reload page
                        document.location.reload();
                    } else {
                        this.setState({errorText: resp.message});
                    }
                })
            }
        }
    }

    componentDidMount = async () => {
        await this.api.GetHoneyTypes().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name, value: r.id.toString()})
                }
                this.setState({honeyTypes: options})
            }
        );
        await this.api.GetBeeFarms().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name, value: r.id.toString()})
                }
                this.setState({beeFarms: options})
            }
        );
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    label='Пасека'
                    options={this.state.beeFarms}
                    placeholder='Выберите пасеку'
                    required
                    name='bee_farm_id'
                    value={this.state.bee_farm_id}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Мёд'
                    options={this.state.honeyTypes}
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
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateHoneySaleForm
