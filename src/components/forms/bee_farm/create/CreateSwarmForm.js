import React from "react";
import {Button, Form, Input, Select} from "semantic-ui-react";
import {GET_API} from "../../../../http/GET_API";
import {POST_API} from "../../../../http/POST_API";
import PropTypes from "prop-types";


class CreateSwarmForm extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
        reloadCallback: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            order: '',
            bee_family_id: null,
            swarm_status_id: null,
            date: null,
            errorText: '',
            beeFamilies: [],
            swarmStatuses: []
        }

        this.getAPI = new GET_API();
        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (!this.state.swarm_status_id || !this.state.bee_family_id) {
                this.setState({errorText: "Вы заполнили не все поля"});
            } else {
                this.setState({errorText: ""})
                await this.postAPI.CreateSwarm(this.state.order, this.state.date,
                    this.state.bee_family_id, this.state.swarm_status_id)
                    .then(async (resp) => {
                    if (resp.constructor !== Error) {
                        // everything is fine => reload component
                        await this.props.reloadCallback();
                    } else {
                        this.setState({errorText: resp.message});
                    }
                })
            }
        }
    }


    componentDidMount = async () => {
        await this.getAPI.GetBeeFamiliesByBeeFarmID(this.props.beeFarmID).then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name , value: r.id.toString()})
                }
                this.setState({beeFamilies: options})
            }
        );
        await this.getAPI.GetSwarmStatuses().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.status, value: r.id.toString()})
                }
                this.setState({swarmStatuses: options})
            }
        );
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    label='Пчелиная семья'
                    required
                    options={this.state.beeFamilies}
                    name='bee_family_id'
                    value={this.state.bee_family_id}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Статус роения'
                    required
                    options={this.state.swarmStatuses}
                    name='swarm_status_id'
                    value={this.state.swarm_status_id}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    type='number'
                    label='Порядок'
                    placeholder='Укажите порядок'
                    name='order'
                    required
                    value={this.state.order}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Input}
                    type='date'
                    label='Дата появления'
                    placeholder='Укажите дату'
                    name='date'
                    required
                    value={this.state.date}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Field control={Button}>Создать</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateSwarmForm;
