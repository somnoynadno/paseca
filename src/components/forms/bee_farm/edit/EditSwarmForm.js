import React from "react";
import {Button, Form, Input, Select} from "semantic-ui-react";
import {GET_API} from "../../../../http/GET_API";
import {PUT_API} from "../../../../http/PUT_API";
import PropTypes from "prop-types";
import {containsObject} from "../../../../helpers";


class EditSwarmForm extends React.Component {
    static propTypes = {
        swarm: PropTypes.object.isRequired,
        reloadCallback: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.swarm.id,
            swarm_status_id: this.props.swarm.swarm_status_id,
            order: this.props.swarm.order,
            date: new Date(this.props.swarm.date).toISOString().split('T')[0],
            errorText: '',
            swarmStatuses: []
        }

        this.getAPI = new GET_API();
        this.putAPI = new PUT_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (!this.state.swarm_status_id) {
                this.setState({errorText: "Вы заполнили не все поля"});
            } else {
                this.setState({errorText: ""})
                await this.putAPI.EditSwarm(this.props.swarm.id, this.state.order,
                    this.state.date, this.state.swarm_status_id)
                    .then(async (resp) => {
                        if (resp.constructor !== Error) {
                            // everything is fine => reload component
                            await this.props.reloadCallback();
                        }
                    })
            }
        }
    }


    componentDidMount = async () => {
        await this.getAPI.GetSwarmStatuses().then((resp) => {
                let options = [];
                for (let r of resp) {
                    let o = {text: r.status, value: r.id.toString()};
                    if (!containsObject(o, this.state.swarmStatuses)) {
                        options.push(o);
                    }
                }
                let updated = this.state.swarmStatuses;
                updated.push(...options);
                this.setState({swarmStatuses: updated});
            }
        );
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    label='Статус роения'
                    required
                    options={this.state.swarmStatuses}
                    name='swarm_status_id'
                    value={this.state.swarm_status_id}
                    onChange={this.handleChange}
                />
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
            <Form.Field control={Button}>Применить</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default EditSwarmForm;
