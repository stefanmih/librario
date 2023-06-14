import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import vars, { cookies } from 'src/data/product-data';

export const SingleProduct = (props) => {
  const { k, name, genre, type, publisher, description, value, pageNum, publishDate } = props;
  function addToCart(id) {
    fetch('http://127.0.0.1:8082/addToCart?productId=' + id + "&userId="+cookies.get("userId"));
  }
  return (
    <Card sx={{ maxWidth: "700px", marginLeft: "auto", marginRight: "auto", marginTop: "50px" }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {name}
        </Typography>
        <br />
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          <b>Type:</b> {type}
        </Typography>
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          <b>Genre:</b> {genre}
        </Typography>
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          <b>Page number: </b> {pageNum}
        </Typography>
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          <b>Publish date: </b> {publishDate.substring(0, 10)}
        </Typography>
        <Typography sx={{ fontSize: 16 }} gutterBottom>
          <b>Author:</b> {publisher ? publisher : "No author"}
          <br />
          <br />
        </Typography>
        <Typography sx={{ fontSize: 16 }}>
          <b>Description: </b><br /><br />{description}
          <br />
        </Typography>
        <CardActions>
          <Typography variant="body1" sx={{ fontWeight: "bold" , marginLeft:"-9px"}}>
            <b>Price: </b>{value}
          </Typography>
          <Button variant="contained" size="large" sx={{ marginLeft: "auto" }} onClick={() => addToCart(k)}>Add to cart</Button>
        </CardActions>
      </CardContent>

    </Card>
  );
};

SingleProduct.prototypes = {
  k: PropTypes.number,
  name: PropTypes.string,
  genre: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  publisher: PropTypes.string,
  value: PropTypes.number,
};
