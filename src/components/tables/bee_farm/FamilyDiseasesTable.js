import React from "react";
import {Button, ButtonGroup, Modal, Segment, Table} from "semantic-ui-react";
import {DELETE_API} from "../../../http/DELETE_API";
import DeleteModal from "../../modal/DeleteModal";
import {POST_API} from "../../../http/POST_API";
import PropTypes from "prop-types";
import {GET_API} from "../../../http/GET_API";
import CreateFamilyDiseaseForm from "../../forms/bee_farm/create/CreateFamilyDiseaseForm";


class FamilyDiseasesTable extends React.Component {
    static propTypes = {
        beeFarmID: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            familyDiseases: null,
            modalOpen: false
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
                        <Table.HeaderCell>Семья</Table.HeaderCell>
                        <Table.HeaderCell>Болезнь</Table.HeaderCell>
                        <Table.HeaderCell>Добавлена</Table.HeaderCell>
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
