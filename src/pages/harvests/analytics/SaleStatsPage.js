import React from "react";
import {Container, Grid, Segment, Loader} from "semantic-ui-react";
import MainMenu from "../../../components/menu/MainMenu";
import {GET_API} from "../../../http/GET_API";
import {preprocessDataForLineChart} from "../../../helpers";
import AnalyticsLineChart from "../../../components/charts/AnalyticsLineChart";


/*
 Страница аналитики продаж
 */
class SaleStatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            honeySales: null,
            honeySalesUnique: null,
        }

        this.getAPI = new GET_API();
    }

    componentDidMount = async () => {
        let honeySales = await this.getAPI.GetUsersHoneySales('date', 'ASC', 0, -1);
        let honeySalesUnique = Array.from(new Set(honeySales.map((v) => {return v["bee_farm"].name })));

        this.setState({
            honeySales: preprocessDataForLineChart(honeySales, "bee_farm", "total_price"),
            honeySalesUnique: honeySalesUnique
        });
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Медосбор'} history={this.props.history} />
                <Segment>
                    <Grid padded>
                        <Grid.Row>
                            <Grid.Column>
                                <h1>Статистика продаж мёда</h1>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.state.honeySales === null ? <Loader /> :
                                    <AnalyticsLineChart
                                        legends={this.state.honeySalesUnique}
                                        data={this.state.honeySales} />
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        </div>
    }
}

export default SaleStatsPage;
