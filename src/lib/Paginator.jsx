import React from "react";
import PropTypes from 'prop-types';

class Paginator extends React.Component {

    constructor(props) {
        super(props);
        let data = this.performCalcs(this.props.currentPage);
        this.state = {
            pos1Value: data.pos1Value,
            pos2Value: data.pos2Value,
            pos3Value: data.pos3Value,
            pos4Value: data.pos4Value,
            pos5Value: data.pos5Value,
            totalNumberOfPages: data.totalNumberOfPages,
            currentPage: data.currentPage,
            listClasses: data.listClasses,
            listItemClasses: data.listItemClasses,
            linkClasses: data.linkClasses
        }
    }

    componentWillReceiveProps(nextProps) {
        let data = this.performCalcs(nextProps.currentPage);
        this.setState({
            pos1Value: data.pos1Value,
            pos2Value: data.pos2Value,
            pos3Value: data.pos3Value,
            pos4Value: data.pos4Value,
            pos5Value: data.pos5Value,
            totalNumberOfPages: data.totalNumberOfPages,
            currentPage: data.currentPage,
            listClasses: data.listClasses,
            listItemClasses: data.listItemClasses,
            linkClasses: data.linkClasses
        });
    }

    performCalcs(currentPage) {
        let pos1Value = 1;
        let pos2Value = 2;
        let pos3Value = 3;
        let pos4Value = 4;
        let pos5Value = 5;
        if (currentPage > 3) {
            pos1Value = currentPage - 2;
            pos2Value = currentPage - 1;
            pos3Value = currentPage;
            pos4Value = currentPage + 1;
            pos5Value = currentPage + 2;
        }
        let totalNumberOfPages = Math.ceil(this.props.tableLength / this.props.rowsPerPage);
        if (totalNumberOfPages - currentPage === 0) {
            pos1Value = currentPage - 4;
            pos2Value = currentPage - 3;
            pos3Value = currentPage - 2;
            pos4Value = currentPage - 1;
            pos5Value = currentPage;
        } else if (totalNumberOfPages - currentPage === 1) {
            pos1Value = currentPage - 3;
            pos2Value = currentPage - 2;
            pos3Value = currentPage - 1;
            pos4Value = currentPage;
            pos5Value = currentPage + 1;
        }
        let listClasses = '';
        if (this.props.paginationClasses && this.props.paginationClasses.listClasses) {
            listClasses = this.props.paginationClasses.listClasses;
        }
        let listItemClasses = '';
        if (this.props.paginationClasses && this.props.paginationClasses.listItemClasses) {
            listItemClasses = this.props.paginationClasses.listItemClasses;
        }
        let linkClasses = '';
        if (this.props.paginationClasses && this.props.paginationClasses.linkClasses) {
            linkClasses += this.props.paginationClasses.linkClasses;
        }
        return {
            pos1Value: pos1Value,
            pos2Value: pos2Value,
            pos3Value: pos3Value,
            pos4Value: pos4Value,
            pos5Value: pos5Value,
            totalNumberOfPages: totalNumberOfPages,
            currentPage: currentPage,
            listClasses: listClasses,
            listItemClasses: listItemClasses,
            linkClasses: linkClasses
        }
    }

    render() {
        return (<div>
            <ul className={this.state.listClasses}>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, 1)}>First
                    </button>
                </li>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, this.state.currentPage - 1)}>Previous
                    </button>
                </li>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, this.state.pos1Value)}>{this.state.pos1Value}</button>
                </li>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, this.state.pos2Value)}>{this.state.pos2Value}</button>
                </li>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, this.state.pos3Value)}>{this.state.pos3Value}</button>
                </li>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, this.state.pos4Value)}>{this.state.pos4Value}</button>
                </li>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, this.state.pos5Value)}>{this.state.pos5Value}</button>
                </li>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, this.state.currentPage + 1)}>Next
                    </button>
                </li>
                <li className={this.state.listItemClasses}>
                    <button className={this.state.linkClasses}
                            onClick={this.props.rowMover.bind(null, this.state.totalNumberOfPages)}>Last
                    </button>
                </li>
            </ul>
            )
        </div>);
    }
}

Paginator.propTypes = {
    currentPage: PropTypes.number,
    tableLength: PropTypes.number,
    rowsPerPage: PropTypes.number,
    rowMover: PropTypes.func,
    paginationClasses: PropTypes.shape({
        listClasses: PropTypes.string,
        listItemClasses: PropTypes.string,
        linkClasses: PropTypes.string,
    })
};

export default Paginator;