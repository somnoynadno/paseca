import {Button, Form, Input, Select} from "semantic-ui-react";
import React from "react";
import {GET_API} from "../../http/GET_API";
import {POST_API} from "../../http/POST_API";


class CreatePollenHarvestForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bee_farm_id: '',
            amount: '',
            date: '',
            errorText: '',
            beeFarms: []
        }

        this.getAPI = new GET_API();
        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (!this.state.bee_farm_id) {
                this.setState({errorText: "Вы заполнили не все поля"})
            } else {
                this.setState({errorText: ""})
                await this.postAPI.CreatePollenHarvest(
                    this.state.amount,
                    this.state.date,
                    this.state.bee_farm_id
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
        await this.getAPI.GetBeeFarms().then((resp) => {
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

export default CreatePollenHarvestForm;
