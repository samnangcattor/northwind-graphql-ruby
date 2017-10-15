import React, { Component } from 'react';
import { Button, Row, Col, Form } from 'reactstrap';
import { Formik, Field } from 'formik';
import TextInput from '../Forms/TextInput';
import { get, isEmpty } from 'lodash';
import { flattenErrors } from '../../utils/validations';
import CloseOnEscape from 'react-close-on-escape';

import ALL_SUPPLIERS_QUERY from './graphql/allSuppliersQuery.graphql';

const SupplierRowForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col lg={3}>
        <Field component={TextInput} name="name" />
      </Col>
      <Col lg={2}>
        <Field component={TextInput} name="first_name" />
      </Col>
      <Col lg={2}>
        <Field component={TextInput} name="last_name" />
      </Col>
      <Col lg={3}>
        <Field component={TextInput} name="email" />
      </Col>
      <Col lg={2}>
        <Button type="submit" outline color="success" size="sm">
          Save Changes
        </Button>
      </Col>
    </Row>
  </Form>
);

class SupplierListItem extends Component {
  state = {
    editing: false,
  };

  _toggleEditing = () => this.setState({ editing: !this.state.editing });

  _updateSupplier = (values, actions) => {
    const supplierId = this.props.supplier.id;
    this.props.updateSupplier({
      variables: { id: supplierId, ...values },
      // refetchQueries: [ { query: ALL_SUPPLIERS_QUERY } ],
      update: (store, { data: { updateSupplier: { errors, ...updateSupplier } } }) => {
        if (isEmpty(errors)) {
          const data = store.readQuery({ query: ALL_SUPPLIERS_QUERY });
          data.allSuppliers = data.allSuppliers.map((supplier) =>
            supplierId === supplier.id
              ? { ...supplier, ...updateSupplier } : supplier
          );
          store.writeQuery({ query: ALL_SUPPLIERS_QUERY, data });
          this._toggleEditing();
        } else {
          actions.setErrors(flattenErrors(errors));
        }
      }
    });
  };

  _deleteSupplier = (supplier) => () => {
    if (!window.confirm('Are you sure?')) { return; }

    this.props.deleteSupplier({
      variables: { id: supplier.id },
      update: (store) => {
        const data = store.readQuery({ query: ALL_SUPPLIERS_QUERY });
        data.allSuppliers = data.allSuppliers.filter(({id}) => id !== supplier.id)
        store.writeQuery({ query: ALL_SUPPLIERS_QUERY, data });
      }
    });
  };

  render() {
    const { index, supplier } = this.props;
    const { editing } = this.state;
    const initialValues = {
      name: supplier.name,
      first_name: supplier.contact.first_name,
      last_name: supplier.contact.last_name,
      email: supplier.contact.email,
    };

    return editing ?
      (<tr>
        <td colSpan={5}>
          <CloseOnEscape onEscape={this._toggleEditing}>
            <Formik key={index}
                    initialValues={initialValues}
                    onSubmit={this._updateSupplier}
                    component={SupplierRowForm}
            />
          </CloseOnEscape>
        </td>
      </tr>) :
      (<tr key={index} onDoubleClick={this._toggleEditing}>
        <td>{supplier.name}</td>
        <td>{supplier.contact.first_name}</td>
        <td>{supplier.contact.last_name}</td>
        <td>{supplier.contact.email}</td>
        <td>
          {supplier.id > 10 && // protect initial data on heroku
          <Button outline color="danger" size="sm"
                  onClick={this._deleteSupplier(supplier)}>
            Remove
          </Button>}
        </td>
      </tr>);
  }
}

export default SupplierListItem;
