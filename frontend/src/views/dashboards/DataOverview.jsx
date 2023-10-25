import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Fab,
  Grid,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { NavLink } from "react-router-dom";

const DataOverview = ({ data = [], isLoading }) => {
  console.log("-1-", data);
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  let link = "/";

  const MobileComponent = ({ data }) => (
    <Card
      sx={{
        width: "100%",
        p: 0,
      }}
    >
      <CardContent style={{ height: "100%", paddingBottom: 0}}>
        <Grid container spacing={2} height="100%">
          {data?.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12 / data.length}
              justifyContent="center"
              display="flex"
            >
              <Grid container justifyContent="center" height="100%" spacing={1}>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
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
                    <FeatherIcon
                      icon={item.icon || ""}
                      width="25"
                      height="25"
                    />
                  </Button>
                </Grid>
                <Grid item display="flex" justifyContent="center">
                  <Typography variant="h1" align="center">
                    {isLoading ? <CircularProgress /> : item.total}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignSelf="flex-end"
                >
                  <Typography
                    variant="h5"
                    color="textSecondary"
                    sx={{
                      wordBreak: "break-word",
                    }}
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

  const RegularComponent = ({ data }) => (
    <>
      {data?.map((item, index) => (
        <Card key={index} style={{ height: "150px", width: "100%" }}>
          <CardContent style={{ padding: 0, height: "100%" }}>
            <Grid container height="100%">
              <Grid item>
                <Fab
                  component={NavLink}
                  to={link}
                  size="small"
                  aria-label="add"
                  color="primary"
                >
                  {
                    <FeatherIcon
                      icon={item.icon || ""}
                      component={NavLink}
                      to={link}
                    />
                  }
                </Fab>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h1" align="center">
                  {isLoading ? <CircularProgress /> : item.total}
                </Typography>
              </Grid>
              <Grid item xs={12} display="flex" alignItems="flex-end">
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{
                    mt: "1px",
                    mb: "0px",
                  }}
                  gutterBottom
                >
                  {item.subtitle}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </>
  );

  return (
    <>
      {mobile ? (
        <MobileComponent data={data} />
      ) : (
        <RegularComponent data={data} />
      )}
    </>
  );
};

export default DataOverview;
