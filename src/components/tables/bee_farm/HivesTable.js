import React from "react";
import {Button, Modal, Segment, Table} from "semantic-ui-react";
import DeleteModal from "../../modal/DeleteModal";
import {DELETE_API} from "../../../http/DELETE_API";
import CreateHiveForm from "../../forms/bee_farm/create/CreateHiveForm";
import PropTypes from "prop-types";
import {GET_API} from "../../../http/GET_API";


class HivesTable extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            hives: null,
            modalOpen: false
        }

        this.deleteAPI = new DELETE_API();
        this.getAPI = new GET_API();
    }

    deleteHive = async (id) => {
        await this.deleteAPI.DeleteHiveByID(id)
            .then(async (resp) => {
                // everything is fine => fetch new data
                await this.fetchData();
            })
    }

    fetchData = async () => {
        let data = await this.getAPI.GetHivesByBeeFarmID(this.props.beeFarmID);
        this.setState({
            hives: data,
            modalOpen: false
        });
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        if (this.state.hives === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal open={this.state.modalOpen}
                   onClose={() => this.setState({modalOpen: false})}
                   trigger={<Button
                        color='yellow'
                        content='Добавить улей'
                        size='medium'
                        icon='archive'
                        onClick={() => this.setState({modalOpen: true})}
                    />}>
                <Modal.Header>Новый улей</Modal.Header>
                <Modal.Content>
                    <CreateHiveForm
                        reloadCallback={this.fetchData.bind(this)}
                        beeFarmID={this.props.beeFarmID}
                    />
                </Modal.Content>
            </Modal>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Номер</Table.HeaderCell>
                        <Table.HeaderCell>Тип улья</Table.HeaderCell>
                        <Table.HeaderCell>Размер улья</Table.HeaderCell>
                        <Table.HeaderCell>Формат рамки</Table.HeaderCell>
                        <Table.HeaderCell>Установлен?</Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.hives.map((hive, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{hive["name"]}</Table.Cell>
                            <Table.Cell>{hive["hive_format"]["name"]}</Table.Cell>
                            <Table.Cell>{hive["hive_format"]["size"]}</Table.Cell>
                            <Table.Cell>{hive["hive_frame_type"]["name"]}</Table.Cell>
                            <Table.Cell>
                                {hive["coord_x"] !== null && hive["coord_y"] !== null ? 'Да' : 'Нет'}
                            </Table.Cell>
                            <Table.Cell id={"delete-cell-" + hive.id}>
                                <DeleteModal deleteCallback={this.deleteHive.bind(this, hive.id)} />
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default HivesTable;
