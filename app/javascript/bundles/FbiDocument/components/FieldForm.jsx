import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Editor from './Editor';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));


function FieldForm(props) {
  const {
    saveField,
    updateField,
    existingFields,
    pageSerialNumber,
    labelValue,
    setLabelValue,
    handleSubmit,
    control,
    setValue,
    pageNumber,
    setTextBody,
    textBody,
    fieldEdit,
    cancel
  } = props;

  const existingLabels = existingFields.map(label => ({ label: label, id: -1 }))

  function onSubmit(formData, ev) {
    const { serialNumber } = formData;
    if (fieldEdit !== null) {
      updateField(fieldEdit.id, {
        ...formData,
        label: labelValue.label,
        page_number: pageNumber,
        pageSerialNumber: pageSerialNumber,
        text_body: textBody,
      });

    } else {

      saveField({
        ...formData,
        label: labelValue.label,
        page_number: pageNumber,
        pageSerialNumber: pageSerialNumber,
        text_body: textBody,
      }, ev);
    }
    setValue("serialNumber", serialNumber);
  }

  return (
    <>
      <div className="field-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Editor
              cancel={cancel}
              control={control}
              existingLabels={existingLabels}
              labelValue={labelValue}
              setLabelValue={setLabelValue}
              setTextBody={setTextBody}
              textBody={textBody} />
        </form>
        <br />
        <br />
        <br />
      </div>
    </>
  );
}

export default connect((state) => ({
  fieldEdit: state.main.fieldEdit,
}), null)(FieldForm);
