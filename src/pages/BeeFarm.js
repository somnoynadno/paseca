import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Container, Grid, Menu, Modal, Segment} from "semantic-ui-react";
import PasecaModel from "../components/PasecaModel";
import {API} from "../http/API";
import BeeFarmFamiliesTable from "../components/BeeFarmFamiliesTable";
import BeeFarmHivesTable from "../components/BeeFarmHivesTable";
import BeeFarmNotificationsTable from "../components/BeeFarmNotificationsTable";
import CreateBeeFamilyForm from "../forms/CreateBeeFamilyForm";
import CreateReminderForm from "../forms/CreateReminderForm";
import CreateHiveForm from "../forms/CreateHiveForm";


class BeeFarm extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.location.state === undefined) {
            window.location.href = '/my_farms';
        } else this.farmID = this.props.location.state.farmID;

        this.state = {
            activeItem: null,
            beeFarm: null
        }

        this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })

        this.api = new API();
    }

    componentDidMount = async () => {
        let farm = await this.api.GetBeeFarmByID(this.farmID);
        this.setState({beeFarm: farm});
        console.log(farm);
    }


    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Мои пасеки'} />
                {this.state.beeFarm === null ? <Segment style={{minHeight: "100px"}} loading /> :
                <Segment>
                    <Grid>
                        <Grid.Row columns={3} >
                            <Grid.Column>
                                <h1 style={{textAlign: "center"}}>{this.state.beeFarm.name}</h1>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Modal trigger={<Button
                                    color='orange'
                                    content='Добавить улей'
                                    size='medium'
                                    icon='archive'
                                    floated='right'
                                    style={{margin: "0 10px"}}
                                />}>
                                    <Modal.Header>Новый улей</Modal.Header>
                                    <Modal.Content>
                                        <CreateHiveForm beeFarmID={this.state.beeFarm.id} />
                                    </Modal.Content>
                                </Modal>
                                <Modal trigger={<Button
                                    color='yellow'
                                    content='Создать семью'
                                    size='medium'
                                    icon='add'
                                    floated='right'
                                    style={{margin: "0 10px"}}
                                />}>
                                    <Modal.Header>Новая семья</Modal.Header>
                                    <Modal.Content>
                                        <CreateBeeFamilyForm beeFarmID={this.state.beeFarm.id} />
                                    </Modal.Content>
                                </Modal>
                                <Modal trigger={<Button
                                    color='red'
                                    content='Создать напоминание'
                                    size='medium'
                                    icon='attention'
                                    floated='right'
                                    style={{margin: "0 10px"}}
                                />}>
                                    <Modal.Header>Новое напоминание</Modal.Header>
                                    <Modal.Content>
                                        <CreateReminderForm beeFarmID={this.state.beeFarm.id} />
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{paddingLeft: "30px"}}>
                            <PasecaModel maxX={this.state.beeFarm["bee_farm_size"]["max_x"]}
                                         maxY={this.state.beeFarm["bee_farm_size"]["max_y"]} />
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
                                    TODO
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
                                        <BeeFarmFamiliesTable beeFarm={this.state.beeFarm} />
                                        : this.state.activeItem === 'Ульи' ?
                                            <BeeFarmHivesTable beeFarm={this.state.beeFarm} />
                                            : this.state.activeItem === 'Напоминания' ?
                                                <BeeFarmNotificationsTable beeFarm={this.state.beeFarm} />
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

export default BeeFarm;
