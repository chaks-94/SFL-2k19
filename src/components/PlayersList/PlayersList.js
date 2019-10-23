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
            filteredPlayers: [],
            showRemoveModal: false,
            playerToRemove: {},
            pageLength: 5,
            cutStart: 0,
            filterInfo: {
                filters: [
                    {
                        text: "Select a Filter",
                        field: "",
                        type: "",
                    },
                    {
                        text: "Payment Status",
                        field: "paymentStatus",
                        type: "dropdown",
                        options: [
                            {
                                value: true,
                                display: "Complete",
                            },
                            {
                                value: false,
                                display: "Not Complete",
                            }
                        ],
                    },
                    {
                        text: "Preferred Foot",
                        field: "foot",
                        type: "dropdown",
                        options: [
                            {
                                value: "Left",
                                display: "Left"
                            },{
                                value: "Right",
                                display: "Right"
                            },{
                                value: "Both",
                                display: "Both"
                            }
                        ]
                    },
                    {
                        text: "Playing Position",
                        field: "position",
                        type: "dropdown",
                        options: [
                            {
                                value: "Goal Keeper",
                                display: "Goal Keeper"
                            },{
                                value: "Defence",
                                display: "Defence"
                            },{
                                value: "Midfield",
                                display: "Midfield"
                            },{
                                value: "Attack",
                                display: "Attack"
                            }
                        ]
                    }
                ],
                selectedFilter: {
                    text: "",
                    field: "",
                    type: "",
                    options: "",
                    value: "",
                    displayValue: "",
                },
                list: []
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
            const allPlayers = players.map((player) => {
                return this.formatPlayerInfo(player);
            });
            this.setState({
                playersInfo: allPlayers,
                filteredPlayers: allPlayers
            });
        });
        
    }

    changeFilter = (e) => {
        const field = e.target.value;
        const {state} = this;

        const filter = state.filterInfo.filters.filter((singleFilter) => {
            return singleFilter.field === field;
        })[0];

        this.setState({
            ...state,
            filterInfo: {
                ...state.filterInfo,
                selectedFilter: filter
            }
        })
    }

    addFilter = (field,filterValue) => {
        const {state} = this;
        let list = state.filterInfo.list;
        let value, displayValue;
        if(filterValue === "true") {
            value = true;
            displayValue = "Complete";
        } else if(filterValue === "false") {
            value = false;
            displayValue = "Not Complete";
        } else {
            displayValue = value = filterValue;
        }
        const index = list.findIndex(filter => filter.field === field);
        if(index === -1) {
            list.push({...state.filterInfo.selectedFilter,value,displayValue});
        } else {
            list[index]["value"] = value;
            list[index]["displayValue"] = displayValue;
        }
        this.setState({
            ...state,
            filterInfo: {
                ...state.filterInfo,
                filterValue,
                list
            }
        });
        this.applyFilter()
    }

    applyFilter = () => {
        const {filterInfo, playersInfo} = this.state;
        let filteredPlayers = playersInfo;
        filterInfo.list.forEach((filter) => {
            const {field, value} = filter;
            filteredPlayers = filteredPlayers.filter((player) => {
                return player[field] === value;
            })
        });
        this.setState({
            filterInfo: {
                ...this.state.filterInfo,
                selectedFilter: {
                    text: "",
                    field: "",
                    type: "",
                    value: "",
                    displayValue: "",
                },
                filterValue: "",
                filterType: "",
            },
            filteredPlayers,
        });
    }

    removeFilter = (filter) => {
        let {list} = this.state.filterInfo;
        list = list.filter((appliedFilter) => {
            return appliedFilter.field !== filter.field;
        });
        this.setState({
            ...this.state,
            filterInfo : {
                ...this.state.filterInfo,
                list
            }
        });
        setTimeout(() => {
            this.applyFilter()
        }, 200);
    }

    clearFilter = () => {
        this.setState({
            ...this.state,
            filterInfo: {
                ...this.state.filterInfo,
                list: []
            }
        });
        setTimeout(() => {
            this.applyFilter();
        }, 200);
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
                });
                this.applyFilter();
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
                        });
                        this.applyFilter();
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
                                value = {state.filterInfo.selectedFilter.field}
                                onChange={this.changeFilter}>
                                    {state.filterInfo.filters.map((filter) => {
                                       return <option key={filter.field} value={filter.field}>{filter.text}</option>
                                    })}
                            </select>
                        </div>
                        <div className="filter-body">
                            {state.filterInfo.selectedFilter.type === "dropdown" &&
                                <select
                                    value = {state.filterInfo.selectedFilter.value}
                                    onChange={(e) => this.addFilter(state.filterInfo.selectedFilter.field,e.target.value)}
                                >
                                    <option value="">Please Select One</option>
                                    {
                                        state.filterInfo.selectedFilter.options.map((option, index) => {
                                            return (
                                                <option key={index} value={option.value}>{option.display}</option>
                                            )
                                        })
                                    }
                                </select>
                            }
                        </div>
                    </div>
                    <div className="filter-list">
                        {state.filterInfo.list.map((filter,index) => {
                            return (
                                <div key={index} className="filter-applied">
                                    <span className="filter-applied--heading">{filter.text}</span>:&nbsp;
                                    <span className="filter-applied--value">{filter.displayValue}</span>
                                    <span
                                        className="filter-applied--close"
                                        onClick={() => this.removeFilter(filter)}
                                    >
                                        <i className="fa fa-times"></i>
                                    </span>
                                </div>
                            )
                        })}
                        {state.filterInfo.list.length > 0 &&
                        <div className="filter-applied">
                            <span className="filter-applied--heading">Clear all Filters</span>
                            <span
                                    className="filter-applied--close"
                                    onClick={() => this.clearFilter()}
                                >
                                    <i className="fa fa-times"></i>
                            </span>
                        </div>
                        }
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
                    {state.filteredPlayers
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
                    pageLength = {Math.ceil(state.filteredPlayers.length/state.pageLength)}
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