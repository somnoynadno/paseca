import React from "react";
import MainMenu from "../components/MainMenu"
import {Container} from "semantic-ui-react";


class Index extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={null} />
            </Container>
        </div>
    }
}

export default Index;
