import { Box, Container, Unstable_Grid2 as Grid, Link, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Product } from 'src/sections/products/product-card';
import { React, useEffect, useState } from "react"

export const Products = (props) => {
  const [products, setProducts] = useState(null);
  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
      };
      let data = null;
      if (params.get("query") === null || params.get("query") === '') {
        data = await fetch('http://127.0.0.1:8084/getAll');
      } else {
        data = await fetch('http://127.0.0.1:8084/getByFilter/' + params.get("query"), requestOptions);
      }
      const response = await data.json();
      setProducts(response);
    })();
  }, []);
  if (products === null) {
    return null;
  }
  return (
    <>
      <Head>
        <title>
          Products
        </title>
      </Head>

      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >

          <Container maxWidth="xl">
            <Grid>
              <Typography variant="h4">
                Products
              </Typography>
              <br />
            </Grid>
            <Grid
              container
              spacing={3}
            >
              {products.length > 0 ? products.map(prod => (
                <Grid
                  xs={10}
                  sm={4}
                  lg={3}
                >
                  <Product k={prod.id}
                    name={prod.name.replace('\\\'', "'")}
                    genre={prod.genre}
                    type={prod.type}
                    value={"$" + prod.price}
                    description={prod.description.replace('\\\'', "'").substring(0, 80) + "..."}
                    publisher={prod.author.replace('\\\'', "'")} />
                </Grid>
                
              )) : <Grid> No result matching your criteria. </Grid>}
            </Grid>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  );
}

export default Products;
