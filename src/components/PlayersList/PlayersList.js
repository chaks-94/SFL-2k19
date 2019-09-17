import * as React from "react";
import {Link} from "react-router-dom";
import GetPlayers from "../../services/GetPlayerService";
import "./PlayersList.scss";

class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersInfo:[],
        }
    }
    componentDidMount() {
        GetPlayers().then((data) => {
            const keys = Object.keys(data);
            let players = [];
            for(let i = 0; i< keys.length; i++) {
                data[keys[i]] = {
                    ...data[keys[i]],
                    key: keys[i],
                }
                players.push(data[keys[i]]);
            }
            this.setState({
                playersInfo: players.map((player) => {
                    return this.formatPlayerInfo(player);
                }),
            })
        });
    }

    formatPlayerInfo = (player) => {
        const formatFoot = (foot) => {
            const footMapper = {
                l: "Left",
                r: "Right",
                both: "Both"
            }
            return footMapper[foot];
        }

        const formatPosition = (position) => {
            const postionMapper = {
                mid: "Midfield",
                def: "Defence",
                att: "Attack",
                gk: "Goal Keeper"
            }
            return postionMapper[position];
        }

        return {
            ...player,
            foot: formatFoot(player.foot),
            position: formatPosition(player.position),
            paymentStatus: player.paymentStatus ? "Complete": "Not Complete"
        }
    }

    columnData = () => {
        return [
            {
                id: "fullName",
                name: "Name",
            },
            {
                id: "lastTeam",
                name: "Last Team",
            },
            {
                id: "passYear",
                name: "Pass out Year",
            },
            {
                id: "phone",
                name: "Phone",
            },
            {
                id: "foot",
                name: "Preferred Foot",
            },
            {
                id: "position",
                name: "Playing Position"
            },
            {
                id: "paymentStatus",
                name: "Payment Status",
                render: true,
            }
        ]
    }
    
    render() {
        return(
            <div className="container registration-table">
                <table className="simple-table">
                    <thead>
                       <tr>
                        {this.columnData().map((cell) => {
                            const {id,name} = cell;
                            return (
                                <th key={id}>
                                    {name}
                                </th>
                            )
                        })}
                        </tr> 
                    </thead>
                    <tbody>
                    {this.state.playersInfo.map((player,index) =>{
                        return(
                            <tr key={index}>
                                {this.columnData().map((cell) => {
                                    const {id} = cell;
                                    return (
                                        <td key={id}>
                                            {player[id]}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <div className="registration-message has-success">
                    Dont see your Name here? Because you have not registered yet<br></br>
                    <Link to="/register">Please register now!!</Link>
                </div>
            </div>
        )
    }
}
export default PlayersList;