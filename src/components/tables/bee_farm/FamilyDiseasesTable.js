import React from "react";
import {Button, ButtonGroup, Icon, Modal, Segment, Table} from "semantic-ui-react";
import {DELETE_API} from "../../../http/DELETE_API";
import DeleteModal from "../../modal/DeleteModal";
import {POST_API} from "../../../http/POST_API";
import PropTypes from "prop-types";
import {GET_API} from "../../../http/GET_API";
import CreateFamilyDiseaseForm from "../../forms/bee_farm/create/CreateFamilyDiseaseForm";
import {sortByKey} from "../../../helpers";


class FamilyDiseasesTable extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
        history: PropTypes.any.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            familyDiseases: null,
            modalOpen: false,
            order: false
        }

        this.deleteAPI = new DELETE_API();
        this.postAPI = new POST_API();
        this.getAPI = new GET_API();
    }

    deleteFamilyDisease = async (id) => {
        await this.deleteAPI.DeleteFamilyDiseaseByID(id)
            .then((resp) => {
                // everything is fine => remove delete button
                document.getElementById("delete-cell-" + id).innerHTML = 'успешно удалено';
                document.getElementById("delete-cell-" + id).style.color = 'green';
            })
    }

    fetchData = async () => {
        let data = await this.getAPI.GetFamilyDiseasesByBeeFarmID(this.props.beeFarmID);
        this.setState({
            familyDiseases: data,
            modalOpen: false
        });
    }

    componentDidMount = async () => {
        await this.fetchData();
    }

    render() {
        let r = null;
        if (parseInt(localStorage.getItem("subscription_type_id")) < 3) r = '/subscription_not_sufficient';
        else if (localStorage.getItem("subscription_expired") === 'true') r = '/subscription_expired';

        if (r) {
            localStorage.setItem("bee_farm_active_item", null);
            this.props.history.push({pathname: r});
        }

        if (this.state.familyDiseases === null) return <Segment style={{minHeight: "100px"}} loading />
        else return <div>
            <Modal open={this.state.modalOpen}
                   onClose={() => this.setState({modalOpen: false})}
                   trigger={<Button
                       color='red'
                       content='Новая болезнь'
                       size='medium'
                       icon='stethoscope'
                       onClick={() => this.setState({modalOpen: true})}
                   />}>
                <Modal.Header>Новая болезнь</Modal.Header>
                <Modal.Content>
                    <CreateFamilyDiseaseForm
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
                                this.setState({familyDiseases: sortByKey(this.state.familyDiseases, "bee_family_id", this.state.order),
                                    order: !this.state.order})} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Болезнь
                            <Icon link name='arrow down' onClick={() =>
                                this.setState({familyDiseases: sortByKey(this.state.familyDiseases, "bee_disease_id", this.state.order),
                                    order: !this.state.order})} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Добавлена
                            <Icon link name='arrow down' onClick={() =>
                                this.setState({familyDiseases: sortByKey(this.state.familyDiseases, "created_at", this.state.order),
                                    order: !this.state.order})} />
                        </Table.HeaderCell>
                        <Table.HeaderCell>Опции</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.familyDiseases.map((fd, i) => {
                        return <Table.Row key={i}>
                            <Table.Cell>{fd["bee_family"]["name"]}</Table.Cell>
                            <Table.Cell>{fd["bee_disease"]["name"]}</Table.Cell>
                            <Table.Cell>
                                {(new Date(fd["created_at"])).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',})}
                            </Table.Cell>
                            <Table.Cell id={"delete-cell-" + fd.id}>
                                <ButtonGroup>
                                    <DeleteModal deleteCallback={this.deleteFamilyDisease.bind(this, fd.id)} />
                                </ButtonGroup>
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table>
        </div>
    }
}

export default FamilyDiseasesTable;
