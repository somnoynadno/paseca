import React from "react";
import {Container, Grid, Segment, Transition} from "semantic-ui-react";
import MainMenu from "../../../components/menu/MainMenu";
import {SUPPORT_EMAIL} from "../../../globals";

/*
 Страница протухшей подписки.
 Сюда переадресует PermissionCheckWrapper.
 */
class SubscriptionExpiredPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.setState({visible: true})
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={null} history={this.props.history} />
                <Grid>
                    <Grid.Column>
                        <Transition visible={this.state.visible} animation='scale' duration={300}>
                            <Segment>
                                <h1>Подиска закончилась</h1>
                                <br />
                                <p>Срок действия вашей подписки закончен</p>
                                <hr /><br />
                                <p>
                                    Для продления подписки на сервис обратитесь к администратору: <u>{SUPPORT_EMAIL}</u>
                                </p>
                            </Segment>
                        </Transition>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    }
}

export default SubscriptionExpiredPage;
