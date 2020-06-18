import React from "react";
import {Button, Container, Grid, Segment, Transition} from "semantic-ui-react";
import MainMenu from "../../../components/menu/MainMenu";

/*
 Страница ошибки недостаточной подписки.
 Сюда переадресует PermissionCheckWrapper.
 */
class SubscriptionNotSufficientPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            r: null
        }
    }

    componentDidMount() {
        this.setState({visible: true})
    }

    render() {
        if (this.state.r) this.props.history.push({pathname: this.state.r});
        return <div>
            <Container>
                <MainMenu activeItem={null} history={this.props.history} />
                <Grid>
                    <Grid.Column>
                        <Transition visible={this.state.visible} animation='scale' duration={300}>
                            <Segment>
                                <h1>Недостаточный вид подписки</h1>
                                <br />
                                <p>Вашей подписки недостаточно для просмотра этой страницы.</p>
                                <hr /><br />
                                <p>
                                    Вы можете посмотреть все виды подписок и выбрать подходяющую &nbsp;
                                    <Button basic color='blue'
                                            onClick={() => this.setState({r: '/subscriptions'})}>
                                        на этой странице</Button>
                                </p>
                            </Segment>
                        </Transition>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    }
}

export default SubscriptionNotSufficientPage;
