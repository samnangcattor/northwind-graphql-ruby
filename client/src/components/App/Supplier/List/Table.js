import React from 'react';
import {Button, Table} from 'reactstrap';
import countries from 'utils/countries';
import {get} from 'lodash';

import Pagination from 'components/Table/Pagination';
import SortTh from 'components/Table/SortTh';
import {withData} from 'hocs';

export default withData(
  ({data, table, nodes = [], totalCount, open, remove}) => (
    <div>
      <Table hover responsive>
        <thead>
          <tr>
            <SortTh table={table} field={'name'}>
              Supplier Name
            </SortTh>
            <SortTh table={table} field={'addresses.country'}>
              Country
            </SortTh>
            <SortTh table={table} field={'contacts.first_name'} colSpan={4}>
              First Name
            </SortTh>
          </tr>
        </thead>
        <tbody>
          {nodes.map((supplier, index) => (
            <tr key={index} onClick={open(supplier)}>
              <td>{supplier.name}</td>
              <td>
                {supplier.address &&
                  get(countries, [supplier.address.country, 'emoji'])}
              </td>
              <td>{supplier.contact.first_name}</td>
              <td>{supplier.contact.last_name}</td>
              <td>{supplier.contact.email} </td>
              <td>
                {supplier.id > 10 && ( // protect initial data on heroku
                  <Button
                    outline
                    color="danger"
                    size="sm"
                    onClick={remove(supplier)}>
                    Remove
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination table={table} totalCount={totalCount} />
    </div>
  ),
);
