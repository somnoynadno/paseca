import React from "react";
import MainMenu from "../../components/menu/MainMenu"
import {Container, Message, Segment} from "semantic-ui-react";
import {GET_API} from "../../http/GET_API";

/*
 Стартовая страница с новостями платформы.
 */
class IndexPage extends React.Component {
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
                <MainMenu activeItem={"Главная"} history={this.props.history} />
                    <Segment><h1 style={{textAlign: "center"}}>Новости платформы</h1>
                        {this.state.news === null ? <Segment style={{minHeight: "100px"}} loading /> :
                            this.state.news.map((n) => {
                            return <Message key={n.id} size="large">
                                <Message.Header>{n.title}</Message.Header>
                                <p>{(new Date(n["updated_at"])).toLocaleString('ru', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}</p>
                                <p>
                                    {n.text.split('\n').map((text, index) => {
                                        return <span key={index}>{text}<br /></span>
                                    })}
                                </p>
                            </Message>
                        })}
                    </Segment>
            </Container>
        </div>
    }
}

export default IndexPage;
