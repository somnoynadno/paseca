import React from "react";
import MainMenu from "../../../components/menu/MainMenu"
import {Container, Grid, Loader, Segment} from "semantic-ui-react";
import {GET_API} from "../../../http/GET_API";
import {preprocessDataForLineChart} from "../../../helpers";
import AnalyticsLineChart from "../../../components/charts/AnalyticsLineChart";
import AnalyticsPieChart from "../../../components/charts/AnalyticsPieChart";

/*
 Страница налитики сборов
 */
class HarvestStatsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controlHarvests: null,
            controlHarvestsUnique: null,
            pollenHarvests: null,
            pollenHarvestsUnique: null,
            honeyHarvestStats: null
        }

        this.getAPI = new GET_API();
    }

    componentDidMount = async () => {
        let controlHarvests = await this.getAPI.GetUsersControlHarvests('date', 'ASC', 0, -1);
        let controlHarvestsUnique = Array.from(new Set(controlHarvests.map((v) => {return v["bee_family"].name })));

        this.setState({
            controlHarvests: preprocessDataForLineChart(controlHarvests, "bee_family"),
            controlHarvestsUnique: controlHarvestsUnique
        });

        let pollenHarvests = await this.getAPI.GetUsersPollenHarvests('date', 'ASC', 0, -1);
        let pollenHarvestsUnique = Array.from(new Set(pollenHarvests.map((v) => {return v["bee_farm"].name })));

        this.setState({
            pollenHarvests: preprocessDataForLineChart(pollenHarvests, "bee_farm"),
            pollenHarvestsUnique: pollenHarvestsUnique
        });

        let honeyHarvestStats = await this.getAPI.GetHoneyHarvestsGroupByAmount();
        this.setState({honeyHarvestStats: honeyHarvestStats})
    }

    render() {
        return <div>
            <Container>
                <MainMenu activeItem={'Медосбор'} history={this.props.history} />
                <Segment>
                    <Grid padded>
                        <Grid.Row>
                            <Grid.Column>
                                <h1>Медосбор по семьям</h1>
                            </Grid.Column>
                        </Grid.Row>
                        {this.state.honeyHarvestStats === null ? <Loader/> :
                            <Grid.Row columns={this.state.honeyHarvestStats.length}>
                                {this.state.honeyHarvestStats.map((hhs) => {
                                    return <Grid.Column>
                                        {hhs["honey_harvests"].length > 0 ?
                                            <div>
                                                <h3>{hhs["bee_farm_name"]}</h3>
                                                <AnalyticsPieChart data={hhs["honey_harvests"]} />
                                            </div>
                                            : ''
                                        }
                                    </Grid.Column>
                                })
                                }
                            </Grid.Row>
                        }
                        <Grid.Row>
                            <Grid.Column>
                                <h1>Контрольные сборы</h1>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.state.controlHarvests === null ? <Loader /> :
                                    <AnalyticsLineChart
                                        legends={this.state.controlHarvestsUnique}
                                        data={this.state.controlHarvests} />
                                }
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <h1>Сборы пыльцы</h1>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                {this.state.pollenHarvests === null ? <Loader /> :
                                    <AnalyticsLineChart
                                        legends={this.state.pollenHarvestsUnique}
                                        data={this.state.pollenHarvests} />
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Container>
        </div>
    }
}

export default HarvestStatsPage;
