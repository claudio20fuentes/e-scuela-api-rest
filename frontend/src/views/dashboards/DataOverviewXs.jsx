import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

const DataOverview = ({ data = [], isLoading }) => {
  return (
    <Card
      sx={{
        width: "100%",
        p: 0,
      }}
    >
      <CardContent >
        <Grid container spacing={2} height="150px">
          {data.map((item, index) => (
            <Grid
              key={index}
              item
              xs={4}
              justifyContent="center"
              display="flex"
            >
              <Grid container justifyContent="center" spacing={1}>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  height="40px"
                >
                  <Button
                    sx={{
                      color: (theme) => theme.palette.primary.main,
                      boxShadow: "none",
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                    }}
                  >
                    <FeatherIcon icon={item.icon} width="25" height="25" />
                  </Button>
                </Grid>
                <Grid item display="flex" justifyContent="center" height="50px">
                  <Typography variant="h1" align="center">
                    {isLoading ? <CircularProgress /> : item.total}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  justifyItems="center"
                >
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    sx={{
                      mt: "1px",
                      mb: "0px",
                      wordBreak: "break-word",
                    }}
                    gutterBottom
                  >
                    {item.subtitle}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DataOverview;
