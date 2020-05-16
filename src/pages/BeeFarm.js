import React from "react";
import MainMenu from "../components/MainMenu"
import {Container, Grid, Segment} from "semantic-ui-react";
import PasecaModel from "../components/PasecaModel";


class BeeFarm extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Мои пасеки'} />
                <Grid columns='equal'>
                    <Grid.Column>
                        <Segment>
                            <h1>Пример пасеки</h1>
                            <PasecaModel maxX={70} maxY={20} />
                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    }
}

export default BeeFarm;
