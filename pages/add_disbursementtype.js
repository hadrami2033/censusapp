import React, { useState } from "react";
import {
  Grid,
  Stack,
  Button,
  CircularProgress
} from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import apiService from "../src/services/apiService";
import { Form } from "../src/components/Form";
import Controls from "../src/components/controls/Controls";

const DisbursementTypeForm = (props) => {
  const {DisbursementType, push, update, showSuccessToast, showFailedToast} = props;

  const defaultValues = DisbursementType === null ? {
    code: null,
    label: null,
  } : DisbursementType

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = React.useState(false);


  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("code" in fieldValues)
      temp.code = fieldValues.code ? "" : "Le code est requis";
    if ("label" in fieldValues)
      temp.label = fieldValues.label ? "" : "Libelé requis";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = Form(formValues, true, validate);
    

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    if (validate()) {
      setLoading(true)
      console.log(values);
      if(DisbursementType === null){
        apiService.addDisbursementType(values).then(
          (res) => {
            console.log("added => " ,res);
            if(res.data){
              if(push)
              push(res.data)
              resetForm();
              showSuccessToast()
            }else{
              showFailedToast()
            }
          },
          (error) => {
            console.log(error);
            showFailedToast()
          } 
        ).then(() => {
          setLoading(false)
        });
      }else{
        apiService.updateDisbursementType(values).then(
          (res) => {
            console.log("updated => ", res);
            if(!res.data){
              showFailedToast()
            }else{
              if(update)
              update(values)
              showSuccessToast()
            }
          },
          (error) => {
            console.log(error);
            showFailedToast()
          } 
        ).then(() => {
          setLoading(false)
        });
      }
    } 
    //console.log(formValues);
  };

  const titleName = () => {
    if(DisbursementType == null) 
      return "Ajouter un type de décaissement" 
    else
      return "Modifier un type de décaissement"
  }

  return (
    
        <BaseCard titleColor={"secondary"} title= {titleName()}>
        {values &&
          <form onSubmit={handleSubmit}>
          <br/>
          <Stack style={styles.stack} spacing={2} direction="row">
            <Controls.Input
              style={{width:'460px'}}
              id="code-input"
              name="code"
              type='number'
              label="Code"
              value={values.code}
              onChange={handleInputChange}
              error={errors.code}
            />
            <Controls.Input
              style={{width:'460px'}}
              id="label"
              name="label"
              label="Libelé"
              value={values.label}
              onChange={handleInputChange}
              error={errors.label}
            />
          </Stack>
          <br />
          <Button
            type="submit"
            style={{ fontSize: "25px" }}
            variant="contained"
            disabled={loading}
            mt={4}
          >
             Sauvegarder
            {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: 'primary',
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
          </Button>
          </form>
        }
        </BaseCard>
      
  );
};

const styles = {
  stack: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
};
export default DisbursementTypeForm;