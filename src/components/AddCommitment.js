import React, { useState } from "react";
import {
  Grid,
  Stack,
  Button,
  CircularProgress,
  Box
} from "@mui/material";
import BaseCard from "./baseCard/BaseCard";
import apiService from "../services/apiService";
import { Form } from "./Form";
import Controls from "./controls/Controls";



const CommitmentForm = (props) => {
  const {Commitment, showSuccessToast, showFailedToast} = props;

  const defaultValues = Commitment === null ? {
    reference: "",
    status: "active",
    start_date: "",
    end_date: "",
    close_date: "",
    description: "",
    contractor_id: null,
    categorie: null
  } : {...Commitment, contractor_id:Commitment.contractor.id}

  const [formValues, setFormValues] = useState(defaultValues);
  const [loading, setLoading] = React.useState(false);
  const [contractors, setContractors] = React.useState([]);
  const [conventions, setConventions] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const commitmentSatus = [
    {
        id:"active",
        label:"Active" 
    },
    {
        id:"Cloturé",
        label:"Cloturé" 
    },
    {
        id:"Suspendu",
        label:"Suspendu" 
    }
  ]

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("reference" in fieldValues)
      temp.reference = fieldValues.reference ? "" : "La référence est requise";
/*     if ("status" in fieldValues)
      temp.status = fieldValues.status ? "" : "Statut requise"; */
    if ("start_date" in fieldValues)
      temp.start_date = fieldValues.start_date ? "" : "Date début requise";
    if ("end_date" in fieldValues)
      temp.end_date = fieldValues.end_date ? "" : "Date fin requise";
    if ("close_date" in fieldValues)
      temp.close_date = fieldValues.close_date ? "" : "Date clôture requise";
    if ("categorie" in fieldValues)
      temp.categorie = fieldValues.categorie ? "" : "Une catégorie est requise";   
    if ("contractor_id" in fieldValues)
      temp.contractor_id = fieldValues.contractor_id ? "" : "Un prestataire est requis";  
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };



  React.useEffect(() => {
    apiService.getContractors().then(
      res => {
        console.log(res.data);
        setContractors(res.data);
      },  
      error => console.log(error)
    ). then(() => {
      apiService.getConventions().then(
        res => {
          console.log(res.data);
          setConventions(res.data);
        },  
        error => console.log(error)
      )
    })
  }, [])

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } = Form(formValues, true, validate);
    

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    if (validate()) {
      setLoading(true)
      console.log(values);
      if(Commitment === null){
        apiService.addCommitment(values).then(
          (res) => {
            console.log("added => " ,res);
            if(res.data){
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
        apiService.updateCommitment(values).then(
          (res) => {
            console.log("updated => ", res);
            if(!res.data){
              resetForm();
              showFailedToast()
            }else{
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


  const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const titleName = () => {
    if(Commitment == null) 
      return "Ajouter un engagement" 
    else
      return "Modifier un engagement"
  }


  const conventionChange = e =>{
    let v = e.target.value;
    let selected = conventions.filter(e => e.id === v );
    console.log(selected[0]);
    (selected[0] && selected[0].categories) && setCategories(selected[0].categories)
    //handleInputChange(e)
  }

  return (
    
        <BaseCard titleColor={"secondary"} title= {titleName()}>
          {values &&
          <form onSubmit={handleSubmit}>
          <br/>
          <Stack style={styles.stack} spacing={2} direction="row">
            <Controls.Input
              id="reference-input"
              style={{width:'460px'}}
              name="reference"
              label="Reférence"
              value={values.reference}
              onChange={handleInputChange}
              error={errors.reference}
            />

            <Controls.Select
              name="contractor_id"
              style={{width:'460px'}}
              label="Prestateur"
              value={values.contractor_id}
              onChange={handleInputChange}
              options={contractors}
              error={errors.contractor_id}
            />
            
          </Stack>
          {!Commitment &&
          <Stack style={styles.stack} spacing={2} direction="row">
            <Controls.Select
              style={{width:'460px'}}
              label="Convention"
              onChange={conventionChange}
              options={conventions}
            />
            <Controls.Select
              name="categorie"
              style={{width:'460px'}}
              label="Catégorie"
              value={values.categorie}
              onChange={handleInputChange}
              options={categories}
              error={errors.categorie}
            />
          </Stack>
          }
          <Stack style={styles.stack} spacing={2} direction="row">
            
          <Controls.DatePiccker
              style={{width:'460px'}}
              id="start_date"
              name="start_date"
              label="Date début"
              value={formatDate(values.start_date)}
              onChange={handleInputChange}
              error={errors.start_date}
            />
            <Controls.DatePiccker
              style={{width:'460px'}}
              id="end_date"
              name="end_date"
              label="Date fin"
              value={formatDate(values.end_date)}
              onChange={handleInputChange}
              error={errors.end_date}
            />
          </Stack>
          <Stack style={styles.stack} spacing={2} direction="row">
            <Controls.DatePiccker
              style={{width:'935px'}}
              id="close_date-input"
              name="close_date"
              label="Date clôture"
              value={formatDate(values.close_date)}
              onChange={handleInputChange}
              error={errors.close_date}
            />
          </Stack>
        
          <Stack style={styles.stack} spacing={2} direction="row">
            <Controls.Input
              style={Commitment ? {width:'460px'} : {width:'935px'}}
              id="description-input"
              name="description"
              label="Description"
              value={values.description}
              onChange={handleInputChange}
              error={errors.description}
            />
            {Commitment &&
            <Controls.Select
              style={{width:'460px'}}
              name="status"
              label="Statut"
              value={values.status}
              onChange={handleInputChange}
              options={commitmentSatus}
              error={errors.status}
            />
          }
          </Stack>

          <br />
          <Box style={{width:'100%', display:'flex', justifyContent:"end" }}>
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
                marginLeft: '-12px'
              }}
            />
          )}
          </Button>
          </Box>
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
export default CommitmentForm;