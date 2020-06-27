import React from "react";
import {Button, Icon, Modal, Segment, Table} from "semantic-ui-react";
import DeleteModal from "../../modal/DeleteModal";
import {DELETE_API} from "../../../http/DELETE_API";
import {POST_API} from "../../../http/POST_API";
import CreateBeeFamilyForm from "../../forms/bee_farm/create/CreateBeeFamilyForm";
import PropTypes from "prop-types";
import {GET_API} from "../../../http/GET_API";
import BeeFamilyModal from "../../modal/BeeFamilyModal";
import {sortByKey} from "../../../helpers";


class BeeFamiliesTable extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            beeFamilies: null,
            modalOpen: false,
            order: false
        }

        this.deleteAPI = new DELETE_API();
        this.postAPI = new POST_API();
        this.getAPI = new GET_API();
    }

    deleteBeeFamily = async (id) => {
        await this.deleteAPI.DeleteBeeFamilyByID(id)
            .then((resp) => {
                document.getElementById("delete-cell-" + id).innerHTML = 'успешно удалено';
                document.getElementById("delete-cell-" + id).style.color = 'green';
            })
    }

    doInspectionByID = async (beeFamilyID) => {
        await this.postAPI.DoInspectionByID(beeFamilyID)
            .then((resp) => {
                document.getElementById('check-' + beeFamilyID).disabled = true;
            })
    }

    fetchData = async () => {
        let data = await this.getAPI.GetBeeFamiliesByBeeFarmID(this.props.beeFarmID);
        this.setState({
            beeFamilies: data,
            modalOpen: false
        });
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        if (this.state.beeFamilies === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
                <Modal open={this.state.modalOpen}
                       onClose={() => this.setState({modalOpen: false})}
                       trigger={<Button
                            color='olive'
                            content='Добавить семью'
                            size='medium'
                            icon='add'
                            onClick={() => this.setState({modalOpen: true})}
                       />}>
                    <Modal.Header>Новая семья</Modal.Header>
                    <Modal.Content>
                        <CreateBeeFamilyForm
                            reloadCallback={this.fetchData.bind(this)}
                            beeFarmID={this.props.beeFarmID}
                        />
                    </Modal.Content>
                </Modal>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                Семья
                                <Icon link name='arrow down' onClick={() =>
                                    this.setState({beeFamilies: sortByKey(this.state.beeFamilies, "name", this.state.order),
                                        order: !this.state.order})} />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Улей
                                <Icon link name='arrow down' onClick={() =>
                                    this.setState({beeFamilies: sortByKey(this.state.beeFamilies, "hive_id", this.state.order),
                                        order: !this.state.order})} />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Статус
                                <Icon link name='arrow down' onClick={() =>
                                    this.setState({beeFamilies: sortByKey(this.state.beeFamilies, "bee_family_status_id", this.state.order),
                                        order: !this.state.order})} />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Рождена
                                <Icon link name='arrow down' onClick={() =>
                                    this.setState({beeFamilies: sortByKey(this.state.beeFamilies, "queen_bee_born_date", this.state.order),
                                        order: !this.state.order})} />
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                Осмотрена
                                <Icon link name='arrow down' onClick={() =>
                                    this.setState({beeFamilies: sortByKey(this.state.beeFamilies, "last_inspection_date", this.state.order),
                                        order: !this.state.order})} />
                            </Table.HeaderCell>
                            <Table.HeaderCell>Опции</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.beeFamilies.map((bf, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{bf["name"]}</Table.Cell>
                            <Table.Cell>{bf["hive"] !== undefined ? bf["hive"]["name"] : '-'}</Table.Cell>
                            <Table.Cell>{bf["bee_family_status"]["status"]}</Table.Cell>
                            <Table.Cell>{
                                bf["queen_bee_born_date"] === null ? '[нет данных]' :
                                    (new Date(bf["queen_bee_born_date"])).toLocaleString('ru', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })
                            }</Table.Cell>
                            <Table.Cell>{
                            bf["last_inspection_date"] === null ? '[нет данных]' :
                                (new Date(bf["last_inspection_date"])).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })
                        }</Table.Cell>
                            <Table.Cell id={"delete-cell-" + bf.id}>
                                <Button id={"check-" + bf.id} color="blue" icon="eye"
                                        disabled={false}
                                        onClick={this.doInspectionByID.bind(this, bf.id)} />
                                <BeeFamilyModal beeFamilyID={bf.id} />
                                <DeleteModal deleteCallback={this.deleteBeeFamily.bind(this, bf.id)} />
                            </Table.Cell>
                        </Table.Row>
                    })}
                    </Table.Body>
                </Table>
            </div>
    }
}

export default BeeFamiliesTable;
