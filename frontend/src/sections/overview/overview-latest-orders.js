import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  "PENDING": 'warning',
  "DELIVERED": 'success',
  "REFUNDED": 'error'
};

export const OverviewLatestOrders = (props) => {
  const { orders = [], sx } = props;

  function removeOrder(id) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
    };
    fetch('http://127.0.0.1:8082/removeOrder/'+id, requestOptions).then(window.location.href='http://localhost:3000/orders');
  }

  function returnOrder(id) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
    };
    fetch('http://127.0.0.1:8082/returnToCart/'+id, requestOptions).then(window.location.href='http://localhost:3000/cart');
  }

  return (
    <Card sx={sx}>
      <CardHeader title="All Orders" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Order ID
                </TableCell>
                <TableCell>
                  Address
                </TableCell>
                <TableCell sortDirection="desc">
                  Date
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                const createdAt = order.initDate ? order.initDate.substring(0, 10) : null;

                return (
                  <TableRow
                    hover
                    key={order.orderId}
                  >
                    <TableCell>
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      {order.selectedAddress}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[order.status]}>
                        {order.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" sx={{ marginRight: "10px" }} disabled={order.status !== 'DELIVERED'} onClick={()=>removeOrder(order.orderId)}>
                        Delete
                      </Button>
                      <Button variant="contained" disabled={order.status !== 'PENDING' && order.status !== 'REFUNDED'} onClick={()=>returnOrder(order.orderId)}>
                        Return to cart
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
