import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewBestProducts, OverviewLatestProducts } from 'src/sections/overview/overview-best-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewMatchingItems, OverviewTasksProgress, OverviewTotalOrders } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers, OverviewUserGenre } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalBalance, OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewGenres, OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { useEffect, useState } from 'react';
import vars, { cookies } from 'src/data/product-data';

const now = new Date();

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    (async () => {
      let data = await fetch('http://127.0.0.1:8085/getUser/' + cookies.get("userId"));

      let response = await data.json();
      setUserData(response);


      data = await fetch('http://127.0.0.1:8084/getAll');

      response = await data.json();
      setProducts(response);
    })();
  }, []);
  return (
    <>
    <Head>
      <title>
        Overview
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      {
        products && products.length > 0 ? 
        <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={16}
            sm={8}
            lg={4}
          >
            <OverviewUserGenre
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value={userData.defGenre}
            />
          </Grid>
          <Grid
            xs={16}
            sm={8}
            lg={4}
          >
            <OverviewMatchingItems
              sx={{ height: '100%', width: '100%' }}
              value={products.length}
            />
          </Grid>
          <Grid
            xs={16}
            sm={8}
            lg={4}
          >
            <OverviewTotalBalance
              sx={{ height: '100%' }}
              value= {"$ " + userData.balance}
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewBestProducts sx={{ height: '100%' }} products={products.splice(0,5)}/>
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewGenres
              chartSeries={[40, 30, 30]}
              labels={['Sci-fi', 'Adventure', 'Romance']}
              sx={{ height: '100%' }}
            />
          </Grid>

        </Grid>
        <br />
        
      </Container>: ""
      }
    </Box>
  </>
  
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
