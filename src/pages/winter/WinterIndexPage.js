import React from "react";
import {Container, Message, Grid, Transition} from "semantic-ui-react";
import MainMenu from "../../components/menu/MainMenu";


/*
 Главная страница зимовки
 */
class WinterIndexPage extends React.Component {
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
                <MainMenu activeItem={'Зимовка'} history={this.props.history} />
                <Grid centered columns={4}>
                    <Grid.Column>
                        <Transition visible={this.state.visible} animation='scale' duration={300}>
                            <Message compact>
                                <Message.Header>В разработке</Message.Header>
                                <hr />
                                <p>
                                    Данная страница находится на этапе разработки.
                                </p>
                            </Message>
                        </Transition>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    }
}

export default WinterIndexPage;
