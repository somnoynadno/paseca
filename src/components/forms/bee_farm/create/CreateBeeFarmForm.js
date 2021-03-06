import {Button, Form, Input, Select} from "semantic-ui-react";
import React from "react";
import {GET_API} from "../../../../http/GET_API";
import {POST_API} from "../../../../http/POST_API";


class CreateBeeFarmForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bee_farm_type_id: null,
            bee_farm_size_id: null,
            name: null,
            location: null,
            errorText: '',
            beeFarmSizes: null,
            beeFarmTypes: null
        }

        this.getAPI = new GET_API();
        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            await this.postAPI.CreateBeeFarm(this.state.name, this.state.location,
                this.state.bee_farm_size_id, this.state.bee_farm_type_id
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

    componentDidMount = async () => {
        await this.getAPI.GetBeeFarmSizes().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name, value: r.id.toString()})
                }
                this.setState({beeFarmSizes: options})
            }
        );
        await this.getAPI.GetBeeFarmTypes().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name, value: r.id.toString()})
                }
                this.setState({beeFarmTypes: options})
            }
        );
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    label='Тип пасеки'
                    options={this.state.beeFarmTypes}
                    placeholder='Выберите тип пасеки'
                    required
                    name='bee_farm_type_id'
                    value={this.state.bee_farm_type_id}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Размер пасеки'
                    options={this.state.beeFarmSizes}
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
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateBeeFarmForm;
