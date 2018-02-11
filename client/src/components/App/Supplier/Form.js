import React from 'react';
import {Form, Button} from 'reactstrap';
import {Field} from 'formik';

import TextInput from 'components/Form/TextInput';
import SelectInput from 'components/Form/SelectInput';
import getCountyOptions from 'components/Form/getCountyOptions';

export default ({handleSubmit, values}) => (
  <Form onSubmit={handleSubmit}>
    <Field component={TextInput} name="name" label="Name" />
    <Field
      component={SelectInput}
      name="country"
      label="Country"
      options={getCountyOptions({includeBlank: true})}
    />
    <Field component={TextInput} name="first_name" label="First Name" />
    <Field component={TextInput} name="last_name" label="Last Name" />
    <Field component={TextInput} name="email" label="Email" />
    <Button type="submit" color="success" size="sm">
      {values.id ? 'Save Changes' : 'Create'}
    </Button>
  </Form>
);
