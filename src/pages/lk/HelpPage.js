import React from "react";
import {Container, Message, Grid, Segment} from "semantic-ui-react";
import MainMenu from "../../components/menu/MainMenu";
import {SUPPORT_EMAIL} from "../../globals";

/*
 Страница помощи по сервису
 */
class HelpPage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Личный кабинет'} history={this.props.history} />
                <Grid>
                    <Grid.Column>
                        <Segment>
                            <h1>Нужна помощь</h1>
                            <br />
                            <p>Данная страница находится на этапе разработки</p>
                            <hr /><br />
                            <p>
                                По любым вопросам и проблемам, возникшим в ходе использования сервиса,
                                можно писать на почту <u>{SUPPORT_EMAIL}</u>
                            </p>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    }
}

export default HelpPage;
