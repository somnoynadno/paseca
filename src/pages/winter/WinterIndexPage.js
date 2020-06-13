import React from "react";
import {Container, Message, Grid} from "semantic-ui-react";
import MainMenu from "../../components/menu/MainMenu";


/*
 Главная страница зимовки
 */
class WinterIndexPage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Зимовка'} history={this.props.history} />
                <Grid centered columns={4}>
                    <Grid.Column>
                        <Message compact>
                            <Message.Header>В разработке</Message.Header>
                            <hr />
                            <p>
                                Данная страница находится на этапе разработки.
                            </p>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    }
}

export default WinterIndexPage;
