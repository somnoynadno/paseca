import React from "react";
import {Cell, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";
import {getRandomColor} from "../../helpers";
import PropTypes from "prop-types";


class AnalyticsPieChart extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);

        console.log(this.props.data)
    }

    render() {
        return <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={this.props.data}
                        dataKey="amount"
                        nameKey={"bee_family_name"}
                    >
                        {
                            this.props.data.map((entry, index) => {
                                return <Cell key={`cell-${index}`} fill={getRandomColor()} />
                            })
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    }
}

export default AnalyticsPieChart;
