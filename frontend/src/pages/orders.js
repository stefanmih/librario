import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { useEffect, useState } from 'react';
import vars, { cookies } from 'src/data/product-data';

const now = new Date();

const Page = () => {
  const [orders, setOrders] = useState(null);
  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
      };
      let data = await fetch('http://127.0.0.1:8082/getOrdersByUser/' + cookies.get("userId"),requestOptions);

      const response = await data.json();
      setOrders(response);
    })();
  }, []);
  return(
  <>
    <Head>
      <title>
        Orders
      </title>
    </Head>
    <Container maxWidth="xl">
      <Grid
        xs={12}
        md={12}
        lg={8}
      >
        <Grid>
          <br />
          <br />
          <br />
          <Typography variant="h4">
            Orders
          </Typography>
          <br />
        </Grid>
        {orders && orders.length > 0 ?
          <OverviewLatestOrders
            orders={orders}
            sx={{ height: '100%' }}
          /> : <OverviewLatestOrders
            orders={[]}
            sx={{ height: '100%' }}
          />}
      </Grid>
    </Container>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
