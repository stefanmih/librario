import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import AlertDialog from 'src/utils/alert-dialog';
import ReactDOM from 'react-dom';
import vars, { cookies } from 'src/data/product-data';
export const Product = (props) => {
  const { k, name, genre, type, publisher, description, value } = props;
  function addToCart(id) {
    fetch('http://127.0.0.1:8082/addToCart?productId=' + id + "&userId=" + cookies.get("userId")).then((e) => {
      ReactDOM.render(<AlertDialog value='Item added to cart' title='Success' />, document.getElementById('content'))
      document.getElementById('content').innerHTML = '';
    });
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {type}
        </Typography>
        <Typography variant="h6" component="div">
          <a style={{ cursor: 'pointer' }} onClick={() => {
            window.location.href = "http://localhost:3000/product?id=" + k;
          }}>{name}</a>
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          {genre}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          {publisher ? publisher : "No author"}
          <br />
          <br />
        </Typography>
        <Typography sx={{ mb: 1 }}>
          {description}
          <br />
        </Typography>

      </CardContent>
      <CardActions sx={{
        alignSelf: "stretch",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        p: 2,
      }}>
        <Box mt={1.5} mr={32} sx={{
        }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
          }}
        >
          <Button size="large" onClick={() => addToCart(k)}>Add to cart</Button>
        </Box>
        <br />
        <br />
      </CardActions>
      <div id='content'></div>
    </Card>

  );
};

Product.prototypes = {
  k: PropTypes.number,
  name: PropTypes.string,
  genre: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  publisher: PropTypes.string,
  value: PropTypes.number,
};
