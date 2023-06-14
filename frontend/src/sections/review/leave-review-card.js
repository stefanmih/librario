import { Avatar, Button, Card, CardActions, CardContent, Divider, Grid, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import vars, { cookies } from 'src/data/product-data';

export const LeaveReviewCard = (props) => {
  let value = {
    bookId: 0,
    userId: cookies.get("userId"),
    revMark: 4,
    revTitle: "",
    revText: "",
  };
  const params = new URLSearchParams(window.location.search);
  function leaveReview() {
    value.revTitle = document.getElementById(":rd:").value;
    value.revText = document.getElementById(":rf:").value;
    value.bookId = params.get("id")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(value)
    };
    fetch('http://127.0.0.1:8083/addReview', requestOptions).then(window.location.href = "http://localhost:3000/product?id=" + params.get("id"));
  }
  return (
    <form autoComplete="off">
      <Card sx={{ marginLeft: "30px", marginRight: "30px", marginTop: "50px", marginBottom: "50px" }}>
        <CardContent sx={{ pt: 0, m: 10 }}>
          <Box sx={{ m: -1.5 }}>
          <Rating
                  sx={{ marginLeft: "-25px" }}
                />
                <br/>
                <br/>
                <br/>
                <br/>
                
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  className='title'
                  fullWidth
                  label="Review title"
                  name="revTitle"
                  required
                />
                <br />
                <br />
                <br />
              </Grid>

              <TextField
                className='text'
                fullWidth
                multiline
                rows={10}
                label="Review Text"
                name="revText"
                required
              />
            </Grid>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ m: 2 }} onClick={() => leaveReview()}>
            Leave review
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
