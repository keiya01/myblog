import 'es6-shim';
import React from 'react';
import { storiesOf } from '@storybook/react';
import FormEditor from '../src/commons/FormEditor';

storiesOf('Form', module)
  .add('FormEditor', () => <FormEditor />);