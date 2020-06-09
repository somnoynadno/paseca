import * as React from "react";
import {Button, Form, Input, Select} from "semantic-ui-react";
import {GET_API} from "../../../../http/GET_API";
import {POST_API} from "../../../../http/POST_API";
import PropTypes from "prop-types";


class CreateBeeFamilyForm extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
        reloadCallback: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            last_inspection_date: null,
            queen_bee_born_date: null,
            bee_family_status_id: null,
            bee_breed_id: null,
            parent1_id: null,
            parent2_id: null,
            is_control: false,
            name: '',
            beeBreeds: [],
            beeFamilies: [],
            beeFamilyStatuses: [],
            errorText: '',
        }

        this.getAPI = new GET_API();
        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (!this.state.bee_breed_id || !this.state.bee_family_status_id) {
                this.setState({errorText: "Вы заполнили не все поля"})
            } else {
                this.setState({errorText: ""})
                // пиздец убейте меня
                await this.postAPI.CreateBeeFamily(
                    this.props.beeFarmID,
                    this.state.name,
                    this.state.queen_bee_born_date,
                    this.state.last_inspection_date,
                    this.state.bee_breed_id,
                    this.state.bee_family_status_id,
                    this.state.parent1_id,
                    this.state.parent2_id,
                    this.state.is_control).then(async (resp) => {
                    if (resp.constructor !== Error) {
                        // everything is fine => reload component
                        await this.props.reloadCallback();
                    } else {
                        this.setState({errorText: resp.message});
                    }
                });
            }
        }
    }

    componentDidMount = async () => {
        await this.getAPI.GetBeeBreeds().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name, value: r.id.toString()})
                }
                this.setState({beeBreeds: options})
            }
        );
        await this.getAPI.GetUsersBeeFamilies().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name + " (" + r["bee_farm_name"] + ")", value: r.id.toString()})
                }
                this.setState({beeFamilies: options})
            }
        );
        await this.getAPI.GetBeeFamilyStatuses().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.status, value: r.id.toString()})
                }
                this.setState({beeFamilyStatuses: options})
            }
        );
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    type='text'
                    label='Имя семьи'
                    placeholder='Укажите имя семьи'
                    required
                    name='name'
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Порода пчёл'
                    options={this.state.beeBreeds}
                    placeholder='Укажите породу пчёл'
                    required
                    name='bee_breed_id'
                    value={this.state.bee_breed_id}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Input}
                    type='date'
                    label='Дата последнего осмотра'
                    placeholder='Укажите дату последнего осмотра'
                    name='last_inspection_date'
                    value={this.state.last_inspection_date}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Input}
                    type='date'
                    label='Дата рождения матки'
                    placeholder='Укажите дату рождения матки'
                    name='queen_bee_born_date'
                    value={this.state.queen_bee_born_date}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Статус семьи'
                    placeholder='Выберите статус семьи'
                    options={this.state.beeFamilyStatuses}
                    required
                    name='bee_family_status_id'
                    value={this.state.bee_family_status_id}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    label='Родитель'
                    options={this.state.beeFamilies}
                    placeholder='Укажите родителя'
                    name='parent1_id'
                    value={this.state.parent1_id}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Родитель'
                    options={this.state.beeFamilies}
                    placeholder='Укажите родителя'
                    name='parent2_id'
                    value={this.state.parent2_id}
                    onChange={this.handleChange}
                />
                <Form.Field
                    control={Select}
                    label='Контрольная'
                    placeholder='Является ли контрольной?'
                    options={[{text: "Нет", value: false}, {text: "Да", value: true}]}
                    name='is_control'
                    value={this.state.is_control}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Field control={Button}>Создать</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateBeeFamilyForm;
