import React from "react";
import MainMenu from "../../components/menu/MainMenu"
import {Button, Card, Container, Grid, Icon, Modal, Segment} from "semantic-ui-react";
import CreateBeeFarmForm from "../../components/forms/bee_farm/create/CreateBeeFarmForm";
import {GET_API} from "../../http/GET_API";

/*
 Страница выбора пользователем пасеки.
 Переадресует на BeeFarmPage.
 */
class MyFarmsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: null,
            beeFarms: null,
            farmID: null
        };

        this.getAPI = new GET_API();
        this.postAPI = new GET_API();

        this.handleItemClick = (e, { farm }) => {
            this.redirectToFarm(farm);
        }
    }

    redirectToFarm(farm) {
        this.setState({
            referrer: "bee_farm",
            beeFarm: farm
        })
    }

    componentDidMount = async () => {
        let farms = await this.getAPI.GetBeeFarms();
        this.setState({
            beeFarms: farms
        });
    };

    render() {
        const { referrer, beeFarm } = this.state;

        if (referrer && beeFarm) {
            this.props.history.push({
                pathname: referrer,
                state: { beeFarm: beeFarm }
            });
        }

        return <div>
            <Container>
                <MainMenu activeItem={'Мои пасеки'} history={this.props.history} />
                <Segment>
                    <Grid>
                        <Grid.Row columns={2} relaxed='very'>
                            <Grid.Column>
                                <h1 style={{textAlign: "center"}}>Выбор пасеки</h1>
                            </Grid.Column>
                            <Grid.Column>
                                <Modal trigger={<Button
                                    color='green'
                                    content='Создать новую'
                                    size='medium'
                                    icon='plus'
                                    floated='right'
                                    style={{marginRight: "30px"}}
                                />}>
                                    <Modal.Header>Новая пасека</Modal.Header>
                                    <Modal.Content>
                                        <CreateBeeFarmForm />
                                    </Modal.Content>
                                </Modal>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Card.Group>
                        {this.state.beeFarms === null ? <Segment style={{minHeight: "100px", width: "100%"}} loading /> :
                            this.state.beeFarms.map((farm) => {
                                return <Card key={farm.id} farm={farm} onClick={this.handleItemClick}>
                                    <Card.Content>
                                        <Card.Header>{farm.name}</Card.Header>
                                        <Card.Meta>
                                            <span className='date'>Создана: {
                                                (new Date(farm["created_at"])).toLocaleString('ru', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}</span>
                                        </Card.Meta>
                                        <Card.Description>
                                            {farm.location}
                                        </Card.Description>
                                    </Card.Content>
                                    <Card.Content extra>
                                        <Icon name='archive' />
                                        {farm["bee_farm_type"].name}
                                        <br />
                                        <Icon name='arrows alternate' />
                                        {farm["bee_farm_size"].name}
                                    </Card.Content>
                                </Card>
                            })
                        }
                    </Card.Group>
                </Segment>
            </Container>
        </div>
    }
}

export default MyFarmsPage;
