import React from "react";
import {Button, Form, Input, Select} from "semantic-ui-react";
import {GET_API} from "../../../../http/GET_API";
import PropTypes from "prop-types";
import {PUT_API} from "../../../../http/PUT_API";
import {containsObject} from "../../../../helpers";


class EditBeeFamilyForm extends React.Component {
    static propTypes = {
        beeFamily: PropTypes.object.isRequired,
        reloadCallback: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            last_inspection_date: this.props.beeFamily.last_inspection_date,
            queen_bee_born_date: this.props.beeFamily.queen_bee_born_date,
            bee_family_status_id: this.props.beeFamily.bee_family_status_id,
            bee_breed_id: this.props.beeFamily.bee_breed_id,
            parent1_id: this.props.beeFamily.parent1_id,
            parent2_id: this.props.beeFamily.parent2_id,
            is_control: this.props.beeFamily.is_control,
            name: this.props.beeFamily.name,
            beeBreeds: [{text: this.props.beeFamily.bee_breed.name,
                value: this.props.beeFamily.bee_breed_id.toString()}],
            beeFamilyStatuses: [{text: this.props.beeFamily.bee_family_status.status,
                value: this.props.beeFamily.bee_family_status_id.toString()}],
            errorText: '',
        }

        this.getAPI = new GET_API();
        this.putAPI = new PUT_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (!this.state.bee_breed_id || !this.state.bee_family_status_id) {
                this.setState({errorText: "Вы заполнили не все поля"})
            } else {
                this.setState({errorText: ""})
                await this.putAPI.EditBeeFamily(
                    this.props.beeFamily.id,
                    this.state.name,
                    this.state.queen_bee_born_date,
                    this.state.last_inspection_date,
                    this.state.bee_breed_id,
                    this.state.bee_family_status_id,
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
                    let o = {text: r.name, value: r.id.toString()};
                    if (!containsObject(o, this.state.beeBreeds)) {
                        options.push(o);
                    }
                }
                let updated = this.state.beeBreeds;
                updated.push(...options);
                this.setState({beeBreeds: updated});
            }
        );
        await this.getAPI.GetBeeFamilyStatuses().then((resp) => {
                let options = [];
                for (let r of resp) {
                    let o = {text: r.status, value: r.id.toString()};
                    if (!containsObject(o, this.state.beeFamilyStatuses)) {
                        options.push(o);
                    }
                }
                let updated = this.state.beeFamilyStatuses;
                updated.push(...options);
                this.setState({beeFamilyStatuses: options});
                this.forceUpdate();
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
            <Form.Field control={Button}>Применить</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default EditBeeFamilyForm;
