import * as React from "react";
import {Link} from "react-router-dom";
// import GetPlayers from "../../services/GetPlayerService";
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
       /*  GetPlayers().then((data) => {
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
            console.log(JSON.stringify(this.state.playersInfo));
        }); */
        this.setState({
            ...this.state,
            playersInfo: JSON.parse(`
            [{"foot":"Right","fullName":"Sourabh Purkait","lastTeam":
            
            "Ultimate 7",
            "passYear":"2016","paymentStatus":false,"phone":"9123085449","position":"Defence",
            "key":"-LovNAvc0FrwZUysrt9Z"},{"foot":"Right","fullName":"KIRIT SUVRA MAJUMDER",
            "lastTeam":
            
            "Titans","passYear":"2014","paymentStatus":false,"phone":"9674510434",
            "position":"Defence","key":"-LovS6-vrbcpu4ffPJl6"},{"foot":"Left","fullName":"AFRIDI HOSSAIN",
            "lastTeam":
            
            "7 swords","passYear":"2015","paymentStatus":false,"phone":"8777077544",
            "position":"Midfield","key":"-LovcRnPA8EmhFXqjfAQ"},{"foot":"Right","fullName":"ABHRA BHADRA",
            "lastTeam":
            
            "Mouchak","passYear":"2016","paymentStatus":false,"phone":"9831198732",
            "position":"Midfield","key":"-Lox9X0l9_VCsdtAzfvV"},{"foot":"Right","fullName":"Soumik Das",
            "lastTeam":
            
            "Rock and Funn","passYear":"2015","paymentStatus":false,"phone":"8336039027",
            "position":"Midfield","key":"-LoxHiwZghZ4eQTCUL5e"},{"foot":"Right","fullName":"Nitesh Rajak",
            "lastTeam":
            
            "Bawal Company","passYear":"2012","paymentStatus":false,"phone":"9874221958",
            "position":"Midfield","key":"-LozueFrACW6AP8cCRfU"},{"foot":"Right","fullName":"Arpan Ghosh",
            "lastTeam":
            
            "La armada","passYear":"2017","paymentStatus":false,"phone":"8697214772",
            "position":"Midfield","key":"-LozueG3csC_h7J9Prah"},{"foot":"Right","fullName":"Tuhin Mukherjee",
            "lastTeam":
            
            "La Armada","passYear":"2016","paymentStatus":false,"phone":"7059263923",
            "position":"Defence","key":"-LozueG3csC_h7J9Prai"},{"foot":"Both","fullName":"Sushovan sanfui",
            "lastTeam":"Null","passYear":"2019","paymentStatus":false,"phone":"8240461455","position":"Attack",
            "key":"-LozueG4XvESxfxIplOi"},{"foot":"Right","fullName":"Joydeep Nath","lastTeam":"Rock n phunn",
            "passYear":"2015","paymentStatus":false,"phone":"7003179738","position":"Midfield",
            "key":"-LozueG4XvESxfxIplOj"},{"foot":"Left","fullName":"Sourav Ghosh","lastTeam":
            
            "Rock & Fun",
            "passYear":"2015","paymentStatus":false,"phone":"8240034947","position":"Goal Keeper",
            "key":"-LozueG4XvESxfxIplOk"},{"foot":"Right","fullName":"Rupam Chakraborty",
            "lastTeam":
            
            "Golden Tigers","passYear":"2015","paymentStatus":false,"phone":"8820372493",
            "position":"Attack","key":"-LozueG4XvESxfxIplOl"},{"foot":"Both","fullName":"Anubhab Mondal",
            "lastTeam":
            
            "Golden Tigers","passYear":"2013","paymentStatus":false,"phone":"8777459970",
            "position":"Midfield","key":"-LozueG5nTDDw59gGIdY"},{"foot":"Right","fullName":"SOUNAK SARKAR",
            "lastTeam":
            
            "Golden tigers","passYear":"2019","paymentStatus":false,"phone":"9163328344",
            "position":"Midfield","key":"-LozueG5nTDDw59gGIdZ"},{"foot":"Right","fullName":"Tamojit Dawn",
            "lastTeam":
            
            "7 swords","passYear":"2019","paymentStatus":false,"phone":"9330386518",
            "position":"Midfield","key":"-LozueG5nTDDw59gGId_"},{"foot":"Right","fullName":"Nilanjan Dey",
            "lastTeam":
            
            "Ultimate 7","passYear":"2010","paymentStatus":false,"phone":"8697237170",
            "position":"Attack","key":"-LozueG5nTDDw59gGIda"},{"foot":"Right",
            "fullName":"Trinankur Banerjee","lastTeam":
            
            "Golden Tigers","passYear":"2017",
            "paymentStatus":false,"phone":"8961376242","position":"Goal Keeper",
            "key":"-LozueG6ED-r-s0JHOUq"},{"foot":"Right","fullName":"Soumyajit Neogi",
            "lastTeam":
            
            "Mouchak","passYear":"2017","paymentStatus":false,"phone":"8697751331",
            "position":"Midfield","key":"-LozueG6ED-r-s0JHOUr"},{"foot":"Left","fullName":"Shuvam Sarkar",
            "lastTeam":
            
            "Golden Tigers","passYear":"2018","paymentStatus":false,"phone":"9051879329",
            "position":"Defence","key":"-LozueG6ED-r-s0JHOUs"},{"foot":"Left","fullName":"Nirmalyo Mondal",
            "lastTeam":
            
            "Null","passYear":"2019","paymentStatus":false,"phone":"9073440912",
            "position":"Midfield","key":"-LozueG6ED-r-s0JHOUt"},{"foot":"Right",
            "fullName":"Arpan Chakraborty","lastTeam":
            
            "Football Warriors","passYear":"2019",
            "paymentStatus":false,"phone":"9123939572","position":"Midfield","key":"-LozueG7KN1j_NOupAyj"},{"foot":"Right","fullName":"Saikat Bhattacharya","lastTeam":
            
            "Lmd","passYear":"2019","paymentStatus":false,"phone":"9163440043","position":"Defence","key":"-LozueG7KN1j_NOupAyk"},{"foot":"Right","fullName":"Trinankur Banerjee","lastTeam":
            
            "Golden Tigers","passYear":"2017","paymentStatus":false,"phone":"8961376242","position":"Goal Keeper","key":"-Lozvn5PIX7A4QBhM_QD"},{"foot":"Right","fullName":"Akash Dutta","lastTeam":
            
            "Football Warriors","passYear":"2011","paymentStatus":false,"phone":"8617779707","position":"Attack","key":"-Lp-Gp8mKNVff1OpIUjB"},{"foot":"Right","fullName":"Subhrajit Halder","lastTeam":
            
            "Football Warriors","passYear":"2018","paymentStatus":false,"phone":"7980305438","position":"Goal Keeper","key":"-Lp-PYvIjTDT011ws_FO"},{"foot":"Right","fullName":"Ayan Nag","lastTeam":
            
            "Rock & funn","passYear":"2004","paymentStatus":false,"phone":"7065233695","position":"Attack","key":"-Lp-imAibklLPQIiIYHm"},{"foot":"Right","fullName":"SOUNAK SARKAR","lastTeam":
            
            "Golden Tigers","passYear":"2019","paymentStatus":false,"phone":"91633283444","position":"Midfield","key":"-Lp1LdU7oE8c43xsKkwM"},{"foot":"Right","fullName":"PIYAS ADHIKARY ","lastTeam":
            
            "7 SWORDS","passYear":"2002","paymentStatus":false,"phone":"9681981968","position":"Attack","key":"-Lp23la_eQA5MGcyXOPc"},{"foot":"Right","fullName":"Bodhayan Sen","lastTeam":
            
            "None","passYear":"2013","paymentStatus":false,"phone":"8240558242","position":"Midfield","key":"-Lp3u_02jISmautZyTp5"},{"foot":"Right","fullName":"Antik Mondal","lastTeam":
            
            "Golden Tigers","passYear":"2016","paymentStatus":false,"phone":"8906372194","position":"Defence","key":"-Lp3uxzLw6sggpDMQ56V"},{"foot":"Right","fullName":"Ami holam Sexy Arpan","lastTeam":
            
            "La Armada","passYear":"2017","paymentStatus":false,"phone":"916290667929","position":"Midfield","key":"-Lp3v856NbiNIeobld6W"},{"foot":"Right","fullName":"Sayantan Das","lastTeam":
            
            "Ultimate7","passYear":"2016","paymentStatus":false,"phone":"7980247918","position":"Midfield","key":"-Lp3wSIgcGAdT8zlLyIV"},{"foot":"Right","fullName":"ARGHADEEP MONDAL","lastTeam":
            
            "Rock & Fun (🤟 & ✌)","passYear":"2013","paymentStatus":false,"phone":"9674187266","position":"Defence","key":"-Lp3y7Sk3ogmZ98828gQ"},{"foot":"Right","fullName":"Sourav Baidya","lastTeam":
            
            "Falcon arrow","passYear":"2015","paymentStatus":false,"phone":"9051882632","position":"Defence","key":"-Lp4ClSsClcuOH0haTr5"},{"foot":"Right","fullName":"Soumava Bhusan Chakraborty","lastTeam":
            
            "La armada","passYear":"2019","paymentStatus":false,"phone":"9874255738","position":"Midfield","key":"-Lp4XN5JcEKDw4IEXK28"},{"foot":"Left","fullName":"Sahil Reza","lastTeam":
            
            "7 Swords","passYear":"2015","paymentStatus":false,"phone":"8910084200","position":"Attack","key":"-Lp4ucwfbmB5nEutWndI"},{"foot":"Right","fullName":"Atanu Bose","lastTeam":
            
            "La Armada","passYear":"2004","paymentStatus":false,"phone":"8697614797","position":"Midfield","key":"-Lp7ctTU4m_7tD5Psi9W"},{"foot":"Right","fullName":"Rupak Mandal","lastTeam":
            
            "Bawal Company","passYear":"2019","paymentStatus":false,"phone":"7872837909","position":"Goal Keeper","key":"-Lp9FECQjOBZb1e4Y9Ej"},{"foot":"Both","fullName":"My Name Is Rick -- Somrick","lastTeam":
            
            "Falcon Arrows","passYear":"2015","paymentStatus":false,"phone":"7980899440","position":"Attack","key":"-Lp9PKnaj3JZZNfvArKT"},{"foot":"Both","fullName":"Ritwik Majumder","lastTeam":
            
            "FC Bawal ","passYear":"2016","paymentStatus":false,"phone":"7980170920","position":"Midfield","key":"-LpIJTcJDJRD9PqMasSS"},{"foot":"Right","fullName":"Meenhaj Sahir","lastTeam":
            
            "","passYear":"2014","paymentStatus":false,"phone":"7003064153","position":"Attack","key":"-LpIPhaAT1NwLztGtMUA"},{"foot":"Right","fullName":"Souhardya Pal","lastTeam":
            
            "Bawal company","passYear":"2013","paymentStatus":false,"phone":"9038003260","position":"Attack","key":"-LpJJBefKCtCHbSKB1Ee"},{"foot":"Both","fullName":"Saikat Mistri","lastTeam":
            
            "7 swords","passYear":"2015","paymentStatus":false,"phone":"9748489443","position":"Attack","key":"-LpJTV0jyMh_m9xilU9D"},{"foot":"Right","fullName":"Mrinmoy mandal","lastTeam":
            
            "Fresher 🙃","passYear":"2012","paymentStatus":false,"phone":"7980471798","position":"Midfield","key":"-LpMnjsk1DbnFca9LReN"},{"foot":"Right","fullName":"SUKALYAN GUPTA","lastTeam":
            
            "LA AMRADA",
            "passYear":"2002","paymentStatus":false,"phone":"9051634998","position":"Goal Keeper","key":"-LpNRyDirT_71imDojzO"}]`)
        })
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
                <Paginate 
                    pageLength = {Math.round(this.state.playersInfo.length/this.state.pageLength)}
                    onPageClick = {this.handlePaginationChange}
                    onPageLengthChange = {this.handlePageLengthChange}
                />
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