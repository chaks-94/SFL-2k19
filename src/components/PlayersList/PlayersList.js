import * as React from "react";
import {Link} from "react-router-dom";
import GetPlayers from "../../services/GetPlayerService";
import "./PlayersList.scss";
import EditableCell from "../common/EditableCell/EditableCell";
import PaymentUpdate from "../../services/paymentUpdate";
import RemoveModal from "../content/RemoveModal";
import RemovePlayerService from "../../services/removePlayerService";
import Paginate from "../common/Pagination/Paginate";

class PlayersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playersInfo:[],
            showRemoveModal: false,
            playerToRemove: {},
            pageLength: 5,
            cutStart: 0,
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
        }
    }

    columnData = () => {
        return [
            {
                id: "index",
                name: "Sl No"
            },
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
            },
            ...this.props.isAdmin ? [{
                id: "key",
                name: "Remove",
            }] : []
        ]
    }

    toggleRemoveModal= (player) => {
        const {showRemoveModal} = this.state;
        const playerToRemove = showRemoveModal ? {} : player;
        this.setState({
            ...this.state,
            showRemoveModal: !this.state.showRemoveModal,
            playerToRemove
        })
    }

    removePlayer = () => {
        const {playerToRemove, playersInfo} = this.state;
        RemovePlayerService(playerToRemove)
            .then((message) => {
                let players = playersInfo.filter((playerIterator) => {
                    return playerIterator.key !== playerToRemove.key;
                })
                this.setState({
                    ...this.state,
                    playersInfo: players,
                    playerToRemove: {},
                    showRemoveModal: false,
                })
            })
            .catch((error) => {
                alert("Something went wrong! Try again later");
                console.log(error);
            })
    }

    changeStatus = (event,player) => {
        PaymentUpdate(player.key,"paymentStatus",event.target.value.toLowerCase() === "true")
                    .then((message) => {
                        let players = this.state.playersInfo
                                .map((playerNew) => {
                                    if(player.key === playerNew.key) {
                                        return {
                                            ...playerNew,
                                            paymentStatus: !playerNew.paymentStatus,
                                        }
                                    } else {
                                        return playerNew;
                                    }
                                });
                        this.setState({
                            playersInfo: players,
                        })
                    })
                    .catch((error) => {
                        alert("Something went wrong! Try again later");
                        console.log(error);
                    })
    }

    handlePaginationChange = (index) => {
        const {pageLength} = this.state;
        const cutStart = index*pageLength;
        this.setState({
            ...this.state,
            cutStart
        })
    }

    handlePageLengthChange = (value) => {
        this.setState({
            ...this.state,
            pageLength: value*1,
            cutStart: 0,
        })
    }
    
    render() {
        return(
            <div className="container registration-table">
                <h1>Players List</h1>
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
                    {this.state.playersInfo
                        .slice(this.state.cutStart,this.state.cutStart+this.state.pageLength)
                        .map((player,index) =>{
                        return(
                            <tr key={index}>
                                {this.columnData().map((cell) => {
                                    const {id,render} = cell;
                                    return (
                                        render ? 
                                        <td key={id}>
                                            <EditableCell
                                                isEditable={this.props.isAdmin}
                                                handleChange = {this.changeStatus}
                                                data={player}
                                                field={id}
                                                />
                                        </td>
                                        :
                                        <td key={id}>
                                            {id === "key" ? 
                                                <button 
                                                    className="btn-remove"
                                                    onClick={() => this.toggleRemoveModal(player)}
                                                >
                                                    Remove
                                                </button>
                                                : (id === "index" ? 
                                                    index+this.state.cutStart+1 :
                                                    player[id]
                                                )}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {this.state.playersInfo.length > 0 && 
                <Paginate 
                    pageLength = {Math.ceil(this.state.playersInfo.length/this.state.pageLength)}
                    onPageClick = {this.handlePaginationChange}
                    onPageLengthChange = {this.handlePageLengthChange}
                />
                }
                <div className="registration-message has-success">
                    Dont see your Name here? Because you have not registered yet<br></br>
                    <Link to="/register">Please register now!!</Link>
                </div>
                {this.state.showRemoveModal && 
                    <RemoveModal 
                        onModalClose = {this.toggleRemoveModal}
                        onModalAction = {this.removePlayer}       
                    />
                }
            </div>
        )
    }
}
export default PlayersList;