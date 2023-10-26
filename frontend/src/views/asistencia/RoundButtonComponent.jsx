import { Grid, Fab } from "@mui/material";
import FeatherIcon from "feather-icons-react";

const RoundButton = ({
  color = { backgroundColor: "primary", color: "white" },
  icon = "",
  onClick,
}) => (
  <Grid item>
    <Fab
      size="small"
      aria-label="add"
      style={{
        backgroundColor: color.backgroundColor,
        color: color.color,
      }}
      onClick={onClick}
    >
      {<FeatherIcon icon={icon} />}
    </Fab>
  </Grid>
);

export default RoundButton;
