import React from "react";

import {
  Card,
  CardContent,
  Box,
  Typography,
} from "@mui/material";

const BaseCard = (props) => {
  return (
    <Card style={{backgroundColor:'#fbfbfa'}} >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography color={props.titleColor} fontSize="20px" fontWeight={'600'} variant="h4" >{props.title}</Typography>
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default BaseCard;
