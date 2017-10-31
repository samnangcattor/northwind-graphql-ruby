import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { compose, graphql } from 'react-apollo';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

import ALL_SUPPLIERS_QUERY from '../../graphql/AllSuppliers.graphql';
import UPDATE_SUPPLIER_MUTATION from '../../graphql/UpdateSupplier.graphql';
import DELETE_SUPPLIER_MUTATION from '../../graphql/DeleteSupplier.graphql';

class SupplierList extends Component {
  _openDetails = ({ id }) => () =>
    this.props.history.push(`/suppliers/${id}/edit`);

  _deleteSupplier = ({ id }) => (event) => {
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) { return; }

    this.props.deleteSupplier({
      variables: { id },
      refetchQueries: [{query: ALL_SUPPLIERS_QUERY }],
    });
  };

  render() {
    const { loading, error, allSuppliers } = this.props.allSuppliers;

    if (loading && !allSuppliers) {
      return (<div>Loading</div>)
    }

    if (error) {
      return (<div>An unexpected error occurred</div>)
    }

    if (!allSuppliers) {
      return (<div>No suppliers</div>)
    }

    return (
      <div>
        <Link to="/suppliers/new">
          <Button outline color="success">Add supplier</Button>
        </Link>
        <Table hover>
          <tbody>
          {allSuppliers.map((supplier, index) =>
            <tr key={index} onClick={this._openDetails(supplier)}>
              <td>{supplier.name}</td>
              <td>{supplier.contact.first_name}</td>
              <td>{supplier.contact.last_name}</td>
              <td>{supplier.contact.email} { JSON.stringify(this.context.history, null, 2) } </td>
              <td>
                {supplier.id > 10 && // protect initial data on heroku
                <Button outline color="danger" size="sm"
                        onClick={this._deleteSupplier(supplier)}>
                  Remove
                </Button>}
              </td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default compose(
  graphql(ALL_SUPPLIERS_QUERY, { name: 'allSuppliers'}),
  graphql(UPDATE_SUPPLIER_MUTATION, { name: 'updateSupplier'}),
  graphql(DELETE_SUPPLIER_MUTATION, { name: 'deleteSupplier'}),
  withRouter,
)(SupplierList);
