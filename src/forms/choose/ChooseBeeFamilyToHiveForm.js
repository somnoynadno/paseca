import {Button, Form, Select} from "semantic-ui-react";
import React from "react";
import {GET_API} from "../../http/GET_API";
import {POST_API} from "../../http/POST_API";


class ChooseBeeFamilyToHiveForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hive_id: this.props.hiveID,
            bee_family_id: null,
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
                await this.postAPI.SetHiveBeeFamily(this.state.hive_id, this.state.bee_family_id)
                    .then((resp) => {
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
        await this.getAPI.GetUsersBeeFamiliesWithoutHives().then((resp) => {
                let options = [];
                for (let r of resp) {
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
                    label='Пчелосемья'
                    options={this.state.beeFamilies}
                    placeholder='Выберите пчелиную семью'
                    required
                    name='bee_family_id'
                    value={this.state.bee_family_id}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Field control={Button}>Заселить</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default ChooseBeeFamilyToHiveForm;
