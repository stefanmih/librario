import { Box, Container, Unstable_Grid2 as Grid, Typography } from '@mui/material';
import Head from 'next/head';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Product } from 'src/sections/products/product-card';
import { React, useEffect, useState } from "react"
import { SingleProduct } from 'src/sections/products/single-product-card';
import { ReviewCard } from 'src/sections/review/review-card';
import { LeaveReviewCard } from 'src/sections/review/leave-review-card';

export const Products = (props) => {
  const { productName } = props;
  const [products, setProducts] = useState(null);
  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
      };
      let data = null;
      if (params.get("id") !== null && params.get("id") !== '') {
        data = await fetch('http://127.0.0.1:8083/getProduct/' + params.get("id"), requestOptions);
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
          Product
        </title>
      </Head>
      <DashboardLayout>
        {products[0] !== null ?

          <Grid
            xs={10}
            sm={4}
            lg={3}
          >
            <SingleProduct k={products[0].id}
              name={products[0].name.replace('\\\'', "'")}
              genre={products[0].genre}
              type={products[0].type}
              value={"$" + products[0].price}
              pageNum={products[0].pageNumber}
              publishDate={products[0].publishDate}
              description={products[0].description.replace('\\\'', "'").replace('\\\'', "'")}
              publisher={products[0].author.replace('\\\'', "'").replace('\\\'', "'")} />
            <br />
            <Typography variant="h4" component="div" sx={{ marginLeft: "50px" }}>
              Leave a review
            </Typography>
            <br />
            <LeaveReviewCard />
            <br />
            <Typography variant="h4" component="div" sx={{ marginLeft: "50px" }}>
              Reviews
            </Typography>
            <br />
            {products[1].length > 0 ?
              products[1].map(p => (
                <ReviewCard stars={p.revMark} date={p.revDate.substring(0,10)} text={p.revText} title={p.revTitle}></ReviewCard>
              ))
              : ""}
          </Grid>
          : <Grid> No result matching your criteria. </Grid>}

      </DashboardLayout>
    </>
  );
}

export default Products;
