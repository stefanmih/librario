import { Avatar, Card, CardContent, Rating, Typography } from '@mui/material';

export const ReviewCard = (props) => {
  const { stars, text, title, date } = props;
  return (
    <Card sx={{ marginLeft: "30px", marginRight: "30px", marginTop: "50px", marginBottom:"50px"}}>
      <Avatar sx={{ margin: "20px" }} />
      <br />
      <Typography variant='h5' sx={{ marginLeft: "20px" }}>
        {title}
      </Typography>
      <br/>
      <Typography sx={{ marginLeft: "20px", fontSize:"12px"}}>
        {date}
      </Typography>
      <CardContent>
          <Rating
            name="read-only"
            readOnly
            value={stars}
            sx={{marginLeft:"-5px"}}
          />
          <br/>
          <br/>
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};
