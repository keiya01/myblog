import React from 'react';
import { storiesOf } from '@storybook/react';
import FormEditor from '../src/components/FormEditor';
import { StyleSheet, css } from 'aphrodite';

storiesOf('Form', module)
  .add('FormEditor', () => {
    return (
      <div className={css(styles.formContainer)}>
        <FormEditor />
      </div>
    )
  });

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    maxWidth: 600,
    height: "100%",
    minHeight: "100vh",
    margin: "0 auto"
  }
})