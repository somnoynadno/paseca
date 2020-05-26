import React from "react";
import {Button, Modal, Segment, Table} from "semantic-ui-react";
import DeleteModal from "../modal/DeleteModal";
import {DELETE_API} from "../http/DELETE_API";
import {GET_API} from "../http/GET_API";
import CreateCustomHiveFormatForm from "../forms/create_custom/CreateCustomHiveFormatForm";


class HiveFormatsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hiveFormats: null
        }

        this.getAPI = new GET_API();
        this.deleteAPI = new DELETE_API();
    }

    deleteHiveFormat = async (id) => {
        await this.deleteAPI.DeleteHiveFormatByID(id)
            .then((resp) => {
                if (resp.constructor !== Error) {
                    // everything is fine => reload page
                    document.location.reload();
                } else {
                    console.log(resp.message);
                }
            })
    }

    componentDidMount = async () => {
        let resp = await this.getAPI.GetHiveFormats();
        this.setState({hiveFormats: resp});
    }

    render() {
        if (this.state.hiveFormats === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal trigger={<Button
                color='green'
                content='Новая формат улья'
                size='medium'
                icon='add'
                floated='right'
                style={{margin: "0"}}
            />}>
                <Modal.Header>Новый формат улья</Modal.Header>
                <Modal.Content>
                    <CreateCustomHiveFormatForm />
                </Modal.Content>
            </Modal>
            <div><h2>Форматы ульев</h2></div>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>#</Table.HeaderCell>
                        <Table.HeaderCell>Название</Table.HeaderCell>
                        <Table.HeaderCell>Размер</Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.hiveFormats.map((hf, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{i+1}</Table.Cell>
                            <Table.Cell>{hf["name"]}</Table.Cell>
                            <Table.Cell>{hf["size"]}</Table.Cell>
                            <Table.Cell>
                                <DeleteModal deleteCallback={this.deleteHiveFormat.bind(this, hf.id)} />
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default HiveFormatsTable;
