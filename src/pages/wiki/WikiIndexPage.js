import React from "react";
import MainMenu from "../../components/menu/MainMenu"
import {Container, Segment, Menu} from "semantic-ui-react";
import {GET_API} from "../../http/GET_API";
import WikiInnerContent from "./WikiInnerContent";

/*
 Главная страница справочника
 */
class WikiIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            wikiSections: null,
            selectedSectionID: null,
            activeItem: null
        }

        this.getAPI = new GET_API();
    }

    componentDidMount = async () => {
        let sections = await this.getAPI.GetWikiSections();
        this.setState({wikiSections: sections});
    }

    handleItemClick = (e, { name, id }) => {
        this.setState({
            activeItem: (this.state.activeItem === name ? null : name),
            selectedSectionID: (this.state.selectedSectionID === id ? null : id)
        });
    }

    render() {
        if (this.state.wikiSections === null) return <Container>
            <MainMenu activeItem={'Справочник'} history={this.props.history} />
            <Segment style={{minHeight: "100px"}} loading />
        </Container>
        else return <div>
            <Container>
                <MainMenu activeItem={'Справочник'} history={this.props.history} />
                <Segment>
                    <h1>Справочник пчеловода</h1>
                    <Menu size={"huge"} secondary stackable>
                        {this.state.wikiSections.map((ws, i) => {
                            return <Menu.Item
                                key={i}
                                id={ws.id}
                                name={ws.name}
                                active={this.state.activeItem === ws.name}
                                onClick={this.handleItemClick}
                            />
                        })
                        }
                    </Menu>
                    {this.state.selectedSectionID ?
                        <WikiInnerContent selectedSectionID={this.state.selectedSectionID} />
                        : ''
                    }
                </Segment>
            </Container>
        </div>
    }
}

export default  WikiIndexPage;
