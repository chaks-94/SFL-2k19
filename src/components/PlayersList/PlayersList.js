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
            filterInfo: {
                filters: [
                     {
                        text: "Payment Status",
                        field: "payementStatus",
                        type: "dropdown",
                    }
                ],
                selectedFilter: "",
                filterValue: "",
                filterField: "",
                filterType: "",
            }
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

    changeFilter = (e) => {
        const field = e.target.value;
        const {state} = this;

        const filterType = state.filterInfo.filters.filter((singleFilter) => {
            return singleFilter.field === field;
        })[0].type;

        this.setState({
            ...state,
            filterInfo: {
                ...state.filterInfo,
                selectedFilter: field,
                filterType
            }
        })
    }

    addFilter = (e) => {
        console.log(e.target.value);
        
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

    getTableContent = (index,player,id) => {
        let content;
        switch(id) {
            case "key" :
                content = 
                        <button 
                            className="btn-remove"
                            onClick={() => this.toggleRemoveModal(player)}
                        >
                            Remove
                        </button>
                break;
            case "index" : 
                content = index+this.state.cutStart+1;
                break;
            case "phone" : 
                content = this.props.isAdmin ? 
                            <a href={`tel:+${player[id]}`}>{player[id]}</a> :
                            player[id];

                break;  
            default: 
                content = player[id];
                break; 
        }
        return content;
    }
    
    render() {
        const {state} = this;
        return(
            <div className="container registration-table">
                <h1>Players List</h1>
                <div className="filter-container">
                    <div className="filter-section">
                        <span className="filter-label">Filter By:</span>
                        <div className="filter-heading">
                            <select 
                                value = {state.filterInfo.selectedFilter}
                                onChange={this.changeFilter}>
                                    <option value="">Select a filter</option>
                                    {state.filterInfo.filters.map((filter) => {
                                       return <option key={filter.field} value={filter.field}>{filter.text}</option>
                                    })}
                            </select>
                        </div>
                        <div className="filter-body">
                            {state.filterInfo.filterType === "dropdown" &&
                                <select
                                    value = {state.filterInfo.filterValue}
                                    onChange={this.addFilter}
                                >
                                    <option value={true}>Complete</option>
                                    <option value={false}>Not Complete</option>
                                </select>
                            }
                        </div>
                    </div>
                    <div className="filter-list">

                    </div>
                </div>
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
                    {state.playersInfo
                        .slice(state.cutStart,state.cutStart+state.pageLength)
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
                                            {this.getTableContent(index,player,id)}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                {state.playersInfo.length > 0 && 
                <Paginate 
                    pageLength = {Math.ceil(state.playersInfo.length/state.pageLength)}
                    onPageClick = {this.handlePaginationChange}
                    onPageLengthChange = {this.handlePageLengthChange}
                />
                }
                <div className="registration-message has-success">
                    Dont see your Name here? Because you have not registered yet<br></br>
                    <Link to="/register">Please register now!!</Link>
                </div>
                {state.showRemoveModal && 
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