import React from "react";
import {Container, Grid, Card, Icon, Segment} from "semantic-ui-react";
import MainMenu from "../../../components/menu/MainMenu";
import {GET_API} from "../../../http/GET_API";
import {SUPPORT_EMAIL} from "../../../globals";

/*
 Страница со всеми видами подписок
 */
class SubscriptionsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subscriptionTypes: null
        }

        this.getAPI = new GET_API();
    }

    componentDidMount = async () => {
        let items = await this.getAPI.GetSubscriptionTypes();
        this.setState({subscriptionTypes: items});
    }

    render() {
        if (this.state.subscriptionTypes === null) return <Container>
            <MainMenu activeItem={'Личный кабинет'} history={this.props.history} />
            <Segment style={{minHeight: "100px"}} loading />
        </Container>
        return <div>
            <Container>
                <MainMenu activeItem={'Личный кабинет'} history={this.props.history} />
                <Grid stackable container>
                    <Grid.Row>
                        <Segment>
                            <h1>Подписки на сервис</h1>
                            <Grid.Column>
                                <Card.Group centered itemsPerRow={2}>
                                {this.state.subscriptionTypes.map((st) => {
                                    return <Card raised key={st.id}>
                                        <Card.Content header={st.name} />
                                        <Card.Content description={st.description.split('\n')
                                            .map((text, index) => {
                                            return <p key={index}>{text}</p>
                                        })} />
                                        <Card.Content extra>
                                            <b>{st.price} <Icon name='ruble sign' />
                                                {st.price === 0 ? '(бессрочно)' : '(3 месяца)'}
                                            </b>
                                        </Card.Content>
                                    </Card>
                                })}
                                </Card.Group>
                                <br /><hr /><br />
                                <p>Для приобретения подписки можно связаться
                                    со мной по почте <strong>{SUPPORT_EMAIL}</strong></p>
                            </Grid.Column>
                        </Segment>
                    </Grid.Row>
                </Grid>
            </Container>
        </div>
    }
}

export default SubscriptionsPage;
