import {Button, Form, Input, Select} from "semantic-ui-react";
import React from "react";
import {GET_API} from "../../../../http/GET_API";
import PropTypes from "prop-types";
import {PUT_API} from "../../../../http/PUT_API";
import DeleteModal from "../../../modal/DeleteModal";
import {DELETE_API} from "../../../../http/DELETE_API";
import {containsObject} from "../../../../helpers";


class EditBeeFarmForm extends React.Component {
    static propTypes = {
        beeFarm : PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            bee_farm_type_id: this.props.beeFarm.bee_farm_type_id,
            name: this.props.beeFarm.name,
            location: this.props.beeFarm.location,
            errorText: '',
            beeFarmTypes: [{text: this.props.beeFarm.bee_farm_type.name,
                            value: this.props.beeFarm.bee_farm_type_id.toString()}]
        }

        this.getAPI = new GET_API();
        this.putAPI = new PUT_API();
        this.deleteAPI = new DELETE_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            await this.putAPI.EditBeeFarm(this.props.beeFarm.id, this.state.name, this.state.location,
                this.state.bee_farm_type_id).then((resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => reload page
                    document.location.reload();
                } else {
                    this.setState({errorText: resp.message});
                }
            })
        }

        this.deleteCallback = async () => {
            await this.deleteAPI.DeleteBeeFarmByID(this.props.beeFarm.id);
            document.location.href = "/my_farms";
        }
    }

    componentDidMount = async () => {
        await this.getAPI.GetBeeFarmTypes().then((resp) => {
                let options = [];
                for (let r of resp) {
                    let o = {text: r.name, value: r.id.toString()};
                    if (!containsObject(o, this.state.beeFarmTypes)) {
                        options.push(o);
                    }
                }
                let updated = this.state.beeFarmTypes;
                updated.push(...options);
                this.setState({beeFarmTypes: updated});
            }
        );
    }

    render() {
        return <div>
            <Form onSubmit={this.handleSubmit}>
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
                        control={Select}
                        label='Тип пасеки'
                        options={this.state.beeFarmTypes}
                        placeholder='Выберите тип пасеки'
                        required
                        name='bee_farm_type_id'
                        value={this.state.bee_farm_type_id}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group widths='equal'>
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
                <Form.Field control={Button}>Сохранить</Form.Field>
                <strong style={{color: "red"}}>{this.state.errorText}</strong>
            </Form>
            <hr />
            <div style={{float: "left", marginRight: "20px"}}>
                <p>
                    Также вы можете удалить эту пасеку.
                </p>
                <p>
                    P.S. Все ваши ульи и пчелосемьи сохранятся в системе.
                </p>
            </div>
            <DeleteModal deleteCallback={this.deleteCallback.bind(this)} />
            <div style={{clear: "both"}} />
        </div>
    }
}

export default EditBeeFarmForm;
