import React from "react";
import {Segment, List} from "semantic-ui-react";
import {GET_API} from "../../http/GET_API";
import PropTypes from "prop-types";


/*
 Внутренний контент страницы справочника
 */
class WikiInnerContent extends React.Component {
    static propTypes = {
        selectedSectionID: PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            wikiPages: null,
            selectedPage: null
        }

        this.getAPI = new GET_API();
    }

    componentDidMount = async () => {
        await this.fetchPagesBySection();
    }

    fetchPagesBySection = async () => {
        let pages = await this.getAPI.GetWikiPagesBySectionID(this.props.selectedSectionID);
        this.setState({wikiPages: pages});
    }

    fetchPage = async (wikiPageID) => {
        let page = await this.getAPI.GetWikiPageByID(wikiPageID);
        this.setState({selectedPage: page});
    }

    componentDidUpdate = async (prevProps) => {
        if (this.props.selectedSectionID !== prevProps.selectedSectionID) {
            await this.fetchPagesBySection();
            this.setState({selectedPage: null});
        }
    }

    handleItemClick = async (e, { name }) => {
        await this.fetchPage(name);
    }

    render() {
        if (this.state.wikiPages === null) return <Segment style={{minHeight: "100px"}} loading />
        if (this.state.selectedPage) return <Segment>
            <div style={{overflow: "scroll"}}
                 dangerouslySetInnerHTML={{__html: this.state.selectedPage.content}} />
            <hr /><br />
            <p>Опубликовано: {
            (new Date(this.state.selectedPage["created_at"]))
                .toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',})
            }</p>
            <p>Автор: {this.state.selectedPage["author"]}</p>
        </Segment>
        return <Segment>
            <List divided relaxed size={"large"}>
                {this.state.wikiPages.map((wp, i) => {
                    return <List.Item key={i} name={wp.id} onClick={this.handleItemClick.bind(this)}>
                        <List.Icon name='book' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>{wp.title}</List.Header>
                            <List.Description as='a'>{wp.description}</List.Description>
                        </List.Content>
                    </List.Item>
                })}
            </List>
        </Segment>
    }
}

export default WikiInnerContent;
