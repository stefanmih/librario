import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Button, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import vars, { cookies } from 'src/data/product-data';

export const OverviewCheckout = (props) => {
  const { sx, total } = props;
  function addOrder() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
    };
    fetch('http://127.0.0.1:8082/addOrder/' + cookies.get("userId"), requestOptions).then(window.location.href='http://localhost:3000/orders');
  }
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Checkout
            </Typography>
            <Typography variant="h6">
              Total price:
            </Typography>
            <Typography variant="h4">
              ${total}
            </Typography>
            <br />
            <Button variant="contained" sx={{ marginRight: "10px" }} onClick={()=>addOrder()}>Pay with balance</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewCheckout.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
