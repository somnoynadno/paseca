import React from "react";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {getRandomColor} from "../../helpers";
import PropTypes from "prop-types";


class AnalyticsLineChart extends React.Component {
    static propTypes = {
        legends: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired,
    }

    render() {
        return <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={this.props.data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {this.props.legends.map((v, i) => {
                        return <Line connectNulls key={i} type="monotone"
                                     dataKey={v} stroke={getRandomColor()} />
                    })
                    }
                </LineChart>
            </ResponsiveContainer>
        </div>
    }
}

export default AnalyticsLineChart;
