import React from "react";
import MainMenu from "../components/MainMenu"
import {Button, Card, Container, Grid, Icon, Modal, Segment} from "semantic-ui-react";
import {Redirect} from "react-router-dom";
import CreateBeeFarmForm from "../forms/CreateBeeFarmForm";
import {API} from "../http/API";


class MyFarms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            referrer: null,
            beeFarms: null
        };

        this.api = new API();

        this.handleItemClick = (e, { name }) => {
            this.setState({ activeItem: name });
            console.log(name);
            this.redirectToFarm(name);
        }
    }

    redirectToFarm(name) {
        this.setState({
            referrer: "bee_farm"
        })
    }

    componentDidMount = async () => {
        let farms = await this.api.GetBeeFarms();
        this.setState({
            beeFarms: farms
        });
    };

    render() {
        const { referrer } = this.state;

        if (referrer) return <Redirect to={referrer} />;
        else return <div>
            <Container>
                <MainMenu activeItem={'Мои пасеки'} />
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
                                return <Card name={farm.id} onClick={this.handleItemClick.bind(this)}>
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

export default MyFarms;
