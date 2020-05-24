import {Button, Form, Select} from "semantic-ui-react";
import React from "react";
import {API} from "../http/API";


class ChooseHiveForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hive_id: null,
            coord_x: this.props.coordX,
            coord_y: this.props.coordY,
            errorText: '',
            hives: []
        }

        this.handleChange = (e, { name, value }) => this.setState({ [name]: value })

        this.api = new API();

        this.handleSubmit = async () => {
            if (!this.state.hive_id) {
                this.setState({errorText: "Вы заполнили не все поля"})
            } else {
                this.setState({errorText: ""})
                await this.api.SetHiveCoords(this.state.hive_id, this.state.coord_x, this.state.coord_y)
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
        await this.api.GetUsersFreeHives().then((resp) => {
                let options = [];
                for (let r of resp) {
                    options.push({text: r.name + " (" + r["bee_farm_name"] + ")", value: r.id.toString()})
                }
                this.setState({hives: options})
            }
        );
    }

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    label='Улей'
                    options={this.state.hives}
                    placeholder='Выберите свободный улей'
                    required
                    name='hive_id'
                    value={this.state.hive_id}
                    onChange={this.handleChange}
                />
            </Form.Group>
            <Form.Field control={Button}>Поставить улей</Form.Field>
            <strong style={{color: "red"}}>{this.state.errorText}</strong>
        </Form>
    }
}

export default ChooseHiveForm;
