import React from "react";
import MainMenu from "../components/menu/MainMenu"
import {Button, Container, Grid, Menu, Modal, Segment} from "semantic-ui-react";
import PasecaModel from "../components/other/PasecaModel";
import BeeFamiliesTable from "../components/tables/bee_farm/BeeFamiliesTable";
import HivesTable from "../components/tables/bee_farm/HivesTable";
import RemindersTable from "../components/tables/bee_farm/RemindersTable";
import CreateBeeFamilyForm from "../components/forms/bee_farm/create/CreateBeeFamilyForm";
import CreateReminderForm from "../components/forms/bee_farm/create/CreateReminderForm";
import CreateHiveForm from "../components/forms/bee_farm/create/CreateHiveForm";
import {GET_API} from "../http/GET_API";
import EditBeeFarmForm from "../components/forms/bee_farm/edit/EditBeeFarmForm";

/*
 Страница с выбраной пользователем пасекой.
 Принимает пасеку в location.props при переходе
 с компонента MyFarmsPage.
 */
class BeeFarmPage extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.location.state === undefined) {
            window.location.href = '/my_farms';
        } else this.farmID = this.props.location.state.farmID;

        this.state = {
            activeItem: (localStorage.getItem( 'bee_farm_active_item' ) || null),
            beeFarm: null
        }

        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name })
            localStorage.setItem("bee_farm_active_item", name)
        }

        this.api = new GET_API();
    }

    componentDidMount = async () => {
        let farm = await this.api.GetBeeFarmByID(this.farmID);
        this.setState({beeFarm: farm});
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Мои пасеки'} />
                {this.state.beeFarm === null ? <Segment style={{minHeight: "100px"}} loading /> :
                <Segment>
                    <Grid stackable>
                        <Grid.Row columns={3} >
                            <Grid.Column>
                                <h1 style={{textAlign: "center"}}>{this.state.beeFarm.name}</h1>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{paddingLeft: "30px"}}>
                            <PasecaModel maxX={this.state.beeFarm["bee_farm_size"]["max_x"]}
                                         maxY={this.state.beeFarm["bee_farm_size"]["max_y"]}
                                         beeFarm={this.state.beeFarm}
                            />
                            <Grid.Column floated='right' width={5} style={{marginTop: "20px"}}>
                                <Button.Group vertical>
                                    <Modal trigger={<Button
                                        color='green'
                                        content='Создать напоминание'
                                        size='medium'
                                        icon='attention'
                                    />}>
                                        <Modal.Header>Новое напоминание</Modal.Header>
                                        <Modal.Content>
                                            <CreateReminderForm beeFarmID={this.state.beeFarm.id} />
                                        </Modal.Content>
                                    </Modal>
                                    <Modal trigger={<Button
                                        color='olive'
                                        content='Добавить семью'
                                        size='medium'
                                        icon='add'
                                    />}>
                                        <Modal.Header>Новая семья</Modal.Header>
                                        <Modal.Content>
                                            <CreateBeeFamilyForm beeFarmID={this.state.beeFarm.id} />
                                        </Modal.Content>
                                    </Modal>
                                    <Modal trigger={<Button
                                        color='yellow'
                                        content='Добавить улей'
                                        size='medium'
                                        icon='archive'
                                    />}>
                                        <Modal.Header>Новый улей</Modal.Header>
                                        <Modal.Content>
                                            <CreateHiveForm beeFarmID={this.state.beeFarm.id} />
                                        </Modal.Content>
                                    </Modal>
                                    <Button
                                        color='orange'
                                        content='Создать роение'
                                        size='medium'
                                        icon='sun outline'
                                    />
                                    <Button
                                        color='red'
                                        content='Новая болезнь'
                                        size='medium'
                                        icon='stethoscope'
                                    />
                                </Button.Group>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{paddingLeft: "30px"}}>
                            <Modal trigger={<Button
                                color='blue'
                                content='Изменение пасеки'
                                size='small'
                                icon='pencil'
                            />}>
                                <Modal.Header>Изменение пасеки</Modal.Header>
                                <Modal.Content>
                                    <EditBeeFarmForm beeFarm={this.state.beeFarm} />
                                </Modal.Content>
                            </Modal>
                        </Grid.Row>
                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <Menu stackable pointing secondary>
                                    <Menu.Item
                                        name='Семьи'
                                        active={this.state.activeItem === 'Семьи'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name='Ульи'
                                        active={this.state.activeItem === 'Ульи'}
                                        onClick={this.handleItemClick}
                                    />
                                    <Menu.Item
                                        name='Напоминания'
                                        active={this.state.activeItem === 'Напоминания'}
                                        onClick={this.handleItemClick}
                                    />
                                </Menu>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment>
                                    {this.state.activeItem === 'Семьи' ?
                                        <BeeFamiliesTable beeFarm={this.state.beeFarm} />
                                        : this.state.activeItem === 'Ульи' ?
                                            <HivesTable beeFarm={this.state.beeFarm} />
                                            : this.state.activeItem === 'Напоминания' ?
                                                <RemindersTable beeFarm={this.state.beeFarm} />
                                                // : this.state.activeItem === 'Роения' ?
                                                //     <BeeFarmSwarmsTable beeFarm={this.state.beeFarm} />
                                                //     : this.state.activeItem === 'Болезни' ?
                                                //         <BeeFarmBeeDiseasesTable beeFarm={this.state.beeFarm} />
                                                        : ''
                                    }
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                }
            </Container>
        </div>
    }
}

export default BeeFarmPage;
