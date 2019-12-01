import * as React from "react";
import "./Teams.scss";

class Teams extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            teamsInfo: [
                {
                    groupName: "Group A",
                    teams: [
                        {
                            ownerInfo: [
                                {
                                    ownerNumber: 7278576695,
                                    ownerName: "Debarshi"
                                }
                            ],
                            teamName: "7 Swords",
                            players: [
                                "Atanu Bose",
                                "Subham Sarkar",
                                "Arnab Mandal",
                                "Saikat Bhattacharya",
                                "Soumik Chatterjee",
                                "Snehasis Jana",
                                "Ayan Nag",
                                "Souhardya Pal",
                                "Samannay Bhattacharya"
                            ]
                        },
                        {
                            ownerInfo: [
                                {
                                    ownerNumber: 9903132336,
                                    ownerName: "Soumyajit"
                                },
                                {
                                    ownerName: "Alarka"
                                }
                            ],
                            teamName: "Falcon Arrows",
                            players: [
                                "Sourav Baidya",
                                "Arghadeep Nandi",
                                "Sahil Reza",
                                "Kaushik Bhattacharya",
                                "Arpan Roy",
                                "Afridi Hossain",
                                "Avishek Rajak",
                                "Anubhab Mitra",
                                "Sayan Das"
                            ]
                        },
                        {
                            ownerInfo: [
                                {
                                    ownerNumber: 7044672913,
                                    ownerName: "Bivas"
                                },
                                {
                                    ownerName: "Sohan"
                                }
                            ],
                            teamName: "Velki",
                            players: [
                                "Nilanjan Dey",
                                "Akash Chakraborty",
                                "Arkprabha Giri",
                                "Nirmalya Mondal",
                                "Somrick Chakraborty",
                                "Tuhin Mukherjee",
                                "Shayan Mahato",
                                "Trinankur Banerjee",
                                "Sayntan Sen"
                            ]
                        },
                        {
                            ownerInfo: [
                                {
                                    ownerNumber: 8583049099,
                                    ownerName: "Soumabha",
                                }
                            ],
                            teamName: "Mouchak",
                            players: [
                                "Subhodeep Sarkar",
                                "Sourav Purkait",
                                "Amit Bhattacharya",
                                "Saraj Mondal",
                                "Sourav Ghosh",
                                "Saraswata Sen",
                                "Abhirup Sen",
                                "Soumik Das",
                                "Akash Dutta"
                            ]
                        }
                    ]
                },
                {
                    groupName: "Group B",
                    teams: [
                        {
                            ownerInfo: [
                                {
                                    ownerNumber: 8334865452,
                                    ownerName: "Archita",
                                },
                                {
                                    ownerName: "Sounak",
                                },
                                {
                                    ownerName: "Subir",
                                }
                            ],
                            teamName: "Amanush",
                            players: [
                                "Joydeep Nath",
                                "Tamojit Dawn",
                                "Sukalyan Gupta",
                                "Sayantan Das",
                                "Indrajit Gayen",
                                "Rupam Chakraborty",
                                "Bodhayan Sen",
                                "Nitesh Rajak",
                                "Deep Sengupta"
                            ]
                        },
                        {
                            ownerInfo: [
                                {
                                    ownerNumber: 7044799917,
                                    ownerName: "Suvarthi"
                                }
                            ],
                            teamName: "Bawal Company",
                            players: [
                                "Arpan Ghosh",
                                "Sayan Das",
                                "Anubhab Mondal",
                                "Mrinmoy Mondal",
                                "Sankha Bhattacharya",
                                "Sushovan Sanpui",
                                "Debayan Sardar",
                                "Rupak Mal",
                                "Dhritish Barman"
                            ]
                        },
                        {
                            ownerInfo: [
                                {
                                    ownerNumber: 8902699254,
                                    ownerName: "Riju"
                                }
                            ],
                            teamName: "Rock & Phunn",
                            ownerNumber: 123,
                            players: [
                                "Saikat Mistri",
                                "Pintu Das",
                                "Arghadeep Mondal",
                                "Arnab Roy",
                                "Ritwik Majumder",
                                "Subhabrata Samanta",
                                "Ayan Mondal",
                                "Kinjal Chakraborty",
                                "Soumyajit Pramanik"
                            ]
                        },
                        {
                            ownerInfo: [
                                {
                                    ownerNumber: 9903081566,
                                    ownerName: "Parag"
                                },
                                {
                                    ownerName: "Arnab"
                                }
                            ],
                            teamName: "Titans FC",
                            ownerNumber: 123,
                            players: [
                                "Kirit Majumdar",
                                "Jishnu Mukhejee",
                                "Sayak Halder",
                                "Nitun Bhadra",
                                "Piyas Adhikary",
                                "Subhrajit Halder",
                                "Subhrajit Pal",
                                "Arpan Chakraborty",
                                "Debrit Bhattacharya"
                            ]
                        }
                    ]
                }
            ]
        }
    }
    render() {
        const {teamsInfo} = this.state;
        return (
            <>
                <div className = "welcome-container">
                    <h1>Team list for SFL 2k19</h1>
                </div>
                <div className="teams-container">
                    {teamsInfo.map((group, index) => {
                        return (
                            <div key={index} className="group-container">
                                <div className="group-name">
                                    <h1>{group.groupName}</h1>
                                </div>
                                {group.teams.map((team, index) => {
                                    return (
                                        <div key={index} className="teams">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>{team.teamName}</th>
                                                        <th>Owner: &nbsp;
                                                        {team.ownerInfo.map((owner, index) => {
                                                            const ownerDisplay = owner.ownerNumber ?
                                                                <a
                                                                    href={`https://wa.me/91${owner.ownerNumber}`}
                                                                    rel="noopener noreferrer"
                                                                    target="_blank"
                                                                >{owner.ownerName}</a>
                                                                :
                                                                owner.ownerName;
                                                            return (
                                                                <span key={index}>
                                                                    {ownerDisplay} &nbsp;
                                                                </span>
                                                            )
                                                        })}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {team.players.map((player, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td colSpan="2">{player}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    )
                                })}
                            </div>
                        );
                    })
                    }
                </div>
            </>
        )
    }
};

export default Teams;