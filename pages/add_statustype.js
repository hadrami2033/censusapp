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
import states from '../src/helper/states'

const StatusTypeForm = (props) => {
  const {StatusType, push, update, showSuccessToast, showFailedToast} = props;

  const defaultValues = StatusType === null ? {
    label: null,
    code: null
  } : StatusType

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = React.useState(false);


  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("code" in fieldValues)
      temp.code = fieldValues.code ? "" : "Libelé requis";
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
      let stateSelcted = states.filter(e => e.id === values.code)
      let value = {...values, label: stateSelcted[0].label}
      console.log(value);
      if(StatusType === null){
        apiService.addStatusType(value).then(
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
        apiService.updateStatusType(value).then(
          (res) => {
            console.log("updated => ", res);
            if(!res.data){
              showFailedToast()
            }else{
              if(update)
              update(value)
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
    if(StatusType == null) 
      return "Ajouter un type de status" 
    else
      return "Modifier un type de status"
  }

  const handleLabelChange = e =>{
    let v = e.target.value;
        let selected = categories.filter(e => e.id === v );
        console.log(selected[0]);
        selected[0].commitments && setCommitments(selected[0].commitments)
    handleInputChange(e)
  }

  return (
    
        <BaseCard titleColor={"secondary"} title= {titleName()}>
        {values &&
          <form onSubmit={handleSubmit}>
          <br/>
          <Stack style={styles.stack} spacing={2} direction="row">
            <Controls.Select
                style={{ width:'460px'} }
                name="code"
                label="Libelé"
                value={values.code}
                onChange={handleInputChange}
                options={states}
                error={errors.code}
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
export default StatusTypeForm;