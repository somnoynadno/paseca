import {Button, Form, Input, Select} from "semantic-ui-react";
import React from "react";
import {GET_API} from "../../../http/GET_API";
import {POST_API} from "../../../http/POST_API";


class CreateControlHarvestForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bee_family_id: '',
            amount: '',
            date: '',
            errorText: '',
            beeFamilies: []
        }

        this.getAPI = new GET_API();
        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (!this.state.bee_family_id) {
                this.setState({errorText: "Вы заполнили не все поля"})
            } else {
                this.setState({errorText: ""})
                await this.postAPI.CreateControlHarvest(
                    this.state.amount,
                    this.state.date,
                    this.state.bee_family_id
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
        await this.getAPI.GetUsersBeeFamilies().then((resp) => {
                let options = [];
                for (let r of resp) {
                    if (r["is_control"])
                        options.push({text: r.name + " (" + r["bee_farm_name"] + ")", value: r.id.toString()})
                }
                this.setState({beeFamilies: options})
            }
        );
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    label='Семья'
                    options={this.state.beeFamilies}
                    placeholder='Выберите имя семьи'
                    required
                    name='bee_family_id'
                    value={this.state.bee_family_id}
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

export default CreateControlHarvestForm;
