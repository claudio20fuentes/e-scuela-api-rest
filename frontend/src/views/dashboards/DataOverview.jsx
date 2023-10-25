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

const DataOverview = ({data=[], isLoading }) => {
  console.log('-1-',data)
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  let link = "/";

  const MobileComponent = ({data}) => (
      <Card
        sx={{
          width: "100%",
          p: 0,
        }}
      >
        <CardContent >
          <Grid container spacing={2} height="150px">
            {data?.map((item, index) => (
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

  const RegularComponent = ({data}) => (
    <>
      {data?.map((item, index) => (    
        <Card key={index} style={{ height: "150px", width: "100%"}} >
          <CardContent style={{padding: 0}}>
            <Box>
              <Fab
                component={NavLink}
                to={link}
                size="small"
                aria-label="add"
                color="primary"
              >
                {<FeatherIcon icon={item.icon} component={NavLink} to={link} />}
              </Fab>
            </Box>
            <Grid container display="flex" spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h1" align="center">
                  {isLoading ? <CircularProgress /> : item.total}
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
  )
};

export default DataOverview;
