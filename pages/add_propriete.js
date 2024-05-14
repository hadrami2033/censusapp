import * as React from 'react';
import { useRouter } from 'next/router';
import ProprieteForm from '../src/components/AddPropriete';
import { Alert, Box, CircularProgress, Snackbar } from '@mui/material';
import BaseCard from '../src/components/baseCard/BaseCard';
import { useEffect } from 'react';
import useAxios from '../src/utils/useAxios';

export default function AddPropriete(){
  const router = useRouter()
  const { id, } = router.query

  const [Propriete, setPropriete] = React.useState(null);
  const [openFailedToast, setOpenFailedToast] = React.useState(false);
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if(id){
      setLoading(true)
      fetch(
        `${origin}/api/propriete${
          `?id=${id}&limit=20` 
        }`,
        {
          method: 'GET',
        }
      )
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          if (data.message === 'Query failed: planning failure') {
            throw new Error(
              `Query Failed. Be sure to run \`npm run build-indexes\`!`
            );
          }
          if (
            data.message === 'Query failed: bucket not found' ||
            data.message === 'Query failed: parsing failure'
          ) {
            throw new Error(
              data.message +
                '\n' +
                'Be sure to use a bucket named `_default`, a scope named `_default`, and a collection named `_default`' +
                '\n' +
                'See the "Common Pitfalls and FAQ" section of the README for more information.'
            );
          }

          throw new Error(data.message);
        }   
        console.log("update : ", data[0]);   
        setPropriete(data[0])
      })
      .then(() => {
        setLoading(false)
      })
    }
  }, [])

  const closeFailedToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFailedToast(false);
  };

  const closeSuccessToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessToast(false);
  };

  const showFailedToast = () => {
    setOpenFailedToast(true);
  };

  const showSuccessToast = () => {
    setOpenSuccessToast(true);
  };


  return( 
    <>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openSuccessToast} autoHideDuration={6000} onClose={closeSuccessToast}>
        <Alert onClose={closeSuccessToast} severity="success" sx={{ width: '100%' }} style={{fontSize:"24px",fontWeight:"bold"}}>
        L'oppération réussie
        </Alert>
      </Snackbar>

      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openFailedToast} autoHideDuration={6000} onClose={closeFailedToast}>
        <Alert onClose={closeFailedToast} severity="error" sx={{ width: '100%' }} style={{fontSize:"24px",fontWeight:"bold"}}>
          L'oppération a échoué !
        </Alert>
      </Snackbar>

       

      {loading ?
        <BaseCard>
          <Box style={{width:'100%', display:'flex', justifyContent:"center" }}>
            <CircularProgress
              size={24}
                sx={{
                color: 'primary',
                position: 'absolute',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          </Box>
        </BaseCard>
      :
        <ProprieteForm
          propriete={Propriete} 
          showSuccessToast={showSuccessToast}
          showFailedToast={showFailedToast}
        />
      }

      

    </>
    )
}