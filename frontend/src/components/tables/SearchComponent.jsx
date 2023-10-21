import CustomTextField from "@customElements/CustomTextField";
import CustomFormLabel from "@customElements/CustomFormLabel";

import { Card, CardContent, Grid } from "@mui/material";

const SearchComponent = ({ setSearchValue }) => {
  return (
    <Card style={{ width: "100%" }}>
      <CardContent>
        <Grid container rowSpacing={{ xs: 2, md: 1 }}>
          <Grid item xs={12} height="100%">
            <CustomFormLabel
              htmlFor="outlined-multiline-static"
              style={{ marginTop: "0" }}
            >
              Buscar
            </CustomFormLabel>
            <CustomTextField
              id="outlined-search"
              placeholder=""
              size="small"
              type="search"
              variant="outlined"
              inputProps={{ "aria-label": "Search Contacts" }}
              fullWidth
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SearchComponent;
