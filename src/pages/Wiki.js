import React from "react";
import MainMenu from "../components/MainMenu"
import {Container, Message, Grid} from "semantic-ui-react";


class Wiki extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Вики'} />
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

export default Wiki;
