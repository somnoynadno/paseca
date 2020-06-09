import React from "react";
import {Button, Form, Input, Select} from "semantic-ui-react";
import {GET_API} from "../../../../http/GET_API";
import {POST_API} from "../../../../http/POST_API";


class CreateHiveForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            hive_frame_type_id: null,
            hive_format_id: null,
            errorText: '',
            hiveFrameTypes: [],
            hiveFormats: []
        }

        this.getAPI = new GET_API();
        this.postAPI = new POST_API();

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.handleSubmit = async () => {
            if (!this.state.hive_format_id || !this.state.hive_frame_type_id) {
                this.setState({errorText: "Вы заполнили не все поля"})
            } else {
                this.setState({errorText: ""})
                await this.postAPI.CreateHive(this.props.beeFarmID, this.state.name,
                    this.state.hive_format_id, this.state.hive_frame_type_id
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
        await this.getAPI.GetHiveFormats().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name + " (" + r.size + ")", value: r.id.toString()})
                }
                this.setState({hiveFormats: options})
            }
        );
        await this.getAPI.GetHiveFrameTypes().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name, value: r.id.toString()})
                }
                this.setState({hiveFrameTypes: options})
            }
        );
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Input}
                        type='text'
                        label='Номер'
                        placeholder='Введите номер/название улья'
                        required
                        name='name'
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Select}
                        label='Тип улья'
                        required
                        options={this.state.hiveFormats}
                        name='hive_format_id'
                        value={this.state.hive_format_id}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Select}
                        label='Формат рамки'
                        required
                        options={this.state.hiveFrameTypes}
                        name='hive_frame_type_id'
                        value={this.state.hive_frame_type_id}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Field control={Button}>Создать</Form.Field>
                <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default CreateHiveForm;
