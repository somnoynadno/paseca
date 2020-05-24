import React from "react";
import MainMenu from "../components/MainMenu"
import {Container, Message, Segment} from "semantic-ui-react";
import {GET_API} from "../http/GET_API";


class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            news: null
        }

        this.api = new GET_API();
    }

    componentDidMount = async () => {
        let news = await this.api.GetLastNews();
        this.setState({
            news: news
        });
    };

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={null} />
                    <Segment><h1 style={{textAlign: "center"}}>Новости платформы</h1>
                        {this.state.news === null ? <Segment style={{minHeight: "100px"}} loading /> :
                            this.state.news.map((n) => {
                            return <Message size="large">
                                <Message.Header>{n.title}</Message.Header>
                                <p>{(new Date(n["updated_at"])).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</p>
                                <p>
                                    {n.text}
                                </p>
                            </Message>
                        })}
                    </Segment>
            </Container>
        </div>
    }
}

export default Index;
