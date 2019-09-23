import * as React from "react";
import "./Paginate.scss";

class Paginate extends React.Component {
   state = {
       page: 0,
   } 

   pageClick = (index) => {
       this.setState({
           page: index,
       },this.props.onPageClick(index))
   }

   onPageLengthChange = (value) => {
       this.setState({
           page: 0,
       },this.props.onPageLengthChange(value))
   }

    render() {
        const { pageLength} = this.props;
        return (
            <div className="pagination-container">
                <ul className="page-list">
                    {
                        [...Array(pageLength).keys()].map((index) => {
                            return <li
                                className={`page-link ${index === this.state.page ? "active": ""}`}
                                key={index}
                                onClick={() => this.pageClick(index)}
                            >
                                {index+1}
                            </li>
                        })
                    }
                </ul>
                <div className="paginate-desc">
                    <p>Showing {this.state.page+1} of {pageLength} pages</p>
                    Show <select 
                        onChange={(e) => this.onPageLengthChange(e.target.value)}
                        value={this.pageLength}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select> entries per page
                </div>
            </div>
        )
    }
}

export default Paginate;