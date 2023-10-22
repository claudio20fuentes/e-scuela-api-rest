import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Fab,
  Grid,
  CircularProgress,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";

const DataOverview = ({ icon, total, subtitle, isLoading }) => {
  let link = "/";

  return (
    <Card style={{ height: "150px", width: "100%"}} >
      <CardContent style={{padding: 0}}>
        <Box>
          <Fab
            component={NavLink}
            to={link}
            size="small"
            aria-label="add"
            color="primary"
          >
            {<FeatherIcon icon={icon} component={NavLink} to={link} />}
          </Fab>
        </Box>
        <Grid container display="flex" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" align="center">
              {isLoading ? <CircularProgress /> : total}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              color="textSecondary"
              sx={{
                mt: "1px",
                mb: "0px",
              }}
              gutterBottom
            >
              {subtitle}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DataOverview;
