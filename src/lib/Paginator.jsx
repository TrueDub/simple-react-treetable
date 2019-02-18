import React from "react";
import PropTypes from 'prop-types';

class Paginator extends React.Component {

    constructor(props) {
        super(props);
        let data = this.performCalcs(this.props.currentPage, this.props.tableLength);
        this.state = {
            pos1Value: data.pos1Value,
            pos2Value: data.pos2Value,
            pos3Value: data.pos3Value,
            pos4Value: data.pos4Value,
            pos5Value: data.pos5Value,
            pos1Classes: data.pos1Classes,
            pos2Classes: data.pos2Classes,
            pos3Classes: data.pos3Classes,
            pos4Classes: data.pos4Classes,
            pos5Classes: data.pos5Classes,
            totalNumberOfPages: data.totalNumberOfPages,
            currentPage: data.currentPage,
            listClasses: data.listClasses,
            listItemClasses: data.listItemClasses,
            linkClasses: data.linkClasses,
            activePageClasses: data.activePageClasses

        }
    }

    componentWillReceiveProps(nextProps) {
        let data = this.performCalcs(nextProps.currentPage, nextProps.tableLength);
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
            linkClasses: data.linkClasses,
            pos1Classes: this.defineListItemClasses(data.pos1Value, data.currentPage, data.totalNumberOfPages),
            pos2Classes: this.defineListItemClasses(data.pos2Value, data.currentPage, data.totalNumberOfPages),
            pos3Classes: this.defineListItemClasses(data.pos3Value, data.currentPage, data.totalNumberOfPages),
            pos4Classes: this.defineListItemClasses(data.pos4Value, data.currentPage, data.totalNumberOfPages),
            pos5Classes: this.defineListItemClasses(data.pos5Value, data.currentPage, data.totalNumberOfPages)
        });
    }

    performCalcs(currentPage, tableLength) {
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
        let totalNumberOfPages = Math.ceil(tableLength / this.props.rowsPerPage);
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
        let activePageClasses = '';
        if (this.props.paginationClasses && this.props.paginationClasses.activePageClasses) {
            activePageClasses += this.props.paginationClasses.activePageClasses;
        }
        return {
            pos1Value: pos1Value,
            pos1Classes: this.defineListItemClasses(pos1Value, currentPage, totalNumberOfPages),
            pos2Value: pos2Value,
            pos2Classes: this.defineListItemClasses(pos2Value, currentPage, totalNumberOfPages),
            pos3Value: pos3Value,
            pos3Classes: this.defineListItemClasses(pos3Value, currentPage, totalNumberOfPages),
            pos4Value: pos4Value,
            pos4Classes: this.defineListItemClasses(pos4Value, currentPage, totalNumberOfPages),
            pos5Value: pos5Value,
            pos5Classes: this.defineListItemClasses(pos5Value, currentPage, totalNumberOfPages),
            totalNumberOfPages: totalNumberOfPages,
            currentPage: currentPage,
            listClasses: listClasses,
            listItemClasses: listItemClasses,
            linkClasses: linkClasses,
            activePageClasses: activePageClasses
        }
    }

    displayPageNumber(posValue, currentPage, totalNumberOfPages) {
        if (posValue <= 0) {
            return false;
        }
        if (posValue > totalNumberOfPages) {
            return false;
        }
        return true;
    }

    defineListItemClasses(posValue, currentPage, totalNumberOfPages) {
        if (posValue <= 0 || posValue > totalNumberOfPages) {
            return 'hidden';
        }
        let classes = this.props.paginationClasses.listItemClasses;
        if (posValue === currentPage) {
            classes += (' ' + this.props.paginationClasses.activePageClasses);
        }
        return classes;
    }


    render() {
        return (
            <div>
                <ul className={this.state.listClasses}>
                    <li className={this.state.listItemClasses}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, 1)}> First </a>
                    </li>
                    <li className={this.state.listItemClasses}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, this.state.currentPage - 1)}>Previous </a>
                    </li>
                    <li className={this.state.pos1Classes}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, this.state.pos1Value)}>{this.state.pos1Value}</a>
                    </li>
                    <li className={this.state.pos2Classes}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, this.state.pos2Value)}>{this.state.pos2Value}</a>
                    </li>
                    <li className={this.state.pos3Classes}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, this.state.pos3Value)}>{this.state.pos3Value}</a>
                    </li>
                    <li className={this.state.pos4Classes}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, this.state.pos4Value)}>{this.state.pos4Value}</a>
                    </li>
                    <li className={this.state.pos5Classes}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, this.state.pos5Value)}>{this.state.pos5Value}</a>
                    </li>
                    <li className={this.state.listItemClasses}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, this.state.currentPage + 1)}>Next </a>
                    </li>
                    <li className={this.state.listItemClasses}>
                        <a href="#!" className={this.state.linkClasses}
                           onClick={this.props.rowMover.bind(null, this.state.totalNumberOfPages)}>Last </a>
                    </li>
                </ul>
            </div>
        );
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
        activePageClasses: PropTypes.string
    })
};

export default Paginator;