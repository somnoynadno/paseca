import React from "react";
import MainMenu from "../components/menu/MainMenu"
import {Button, Container, Grid, Modal, Segment} from "semantic-ui-react";
import PasecaModel from "../components/other/PasecaModel";
import {GET_API} from "../http/GET_API";
import EditBeeFarmForm from "../components/forms/bee_farm/edit/EditBeeFarmForm";
import BeeFarmMenu from "../components/menu/BeeFarmMenu";

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
        }

        this.state = {
            activeItem: (localStorage.getItem( 'bee_farm_active_item' ) || null),
            beeFarm: this.props.location.state.beeFarm
        }

        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name })
            localStorage.setItem("bee_farm_active_item", name)
        }

        this.api = new GET_API();
    }

    render() {
        return (
            <Container>
                <MainMenu activeItem={'Мои пасеки'} history={this.props.history} />
                <Segment>
                    <Grid stackable columns={2}>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Segment content={"center"}>
                                    <h1>{this.state.beeFarm.name}</h1>
                                    <hr />
                                    <h5>{this.state.beeFarm["bee_farm_type"].name}</h5>
                                    <p>Создана: {(new Date(this.state.beeFarm["created_at"]))
                                        .toLocaleString('ru', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}</p>
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
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <PasecaModel maxX={this.state.beeFarm["bee_farm_size"]["max_x"]}
                                             maxY={this.state.beeFarm["bee_farm_size"]["max_y"]}
                                             beeFarmID={this.state.beeFarm.id}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <BeeFarmMenu beeFarmID={this.state.beeFarm.id} />
                </Segment>
            </Container>
        )
    }
}

export default BeeFarmPage;
