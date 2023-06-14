import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CartTable } from 'src/sections/cart/cart-table';
import { applyPagination } from 'src/utils/apply-pagination';
import { cart_products, cookies, userId } from 'src/data/product-data';
import { OverviewCheckout } from 'src/sections/overview/overview-checkout';

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(cart_products, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};
function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
const useCustomerIds = (p) => {
  return useMemo(
    () => {
      return p.map((product) => makeid(25));
    },
    [p]
  );
};
const Page = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let products = useCustomers(page, rowsPerPage);
  const productsIds = useCustomerIds(products);
  const productSelection = useSelection(productsIds);
  useEffect(() => {
    (async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" }
      };
      let d = await fetch("http://127.0.0.1:8082/getCartItemsByUser/" + cookies.get("userId"), requestOptions);
      const response = await d.json();
      while(cart_products.length != 0){
        cart_products.pop();
      }
      for (let i = 0; i < response.length; i++) {
        cart_products.push(response[i]);
      }
      setData(response);
    })();
  }, []);
  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );
  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  return (
    <>
      <Head>
        <title>
          Cart
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Cart
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )} onClick={() => window.location = "/products"}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            {data && data.length > 0 ?
             <CartTable
              count={cart_products.length}
              items={products.length > 0 ? products : cart_products.slice(0,5)}
              onDeselectAll={productSelection.handleDeselectAll}
              onDeselectOne={productSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={productSelection.handleSelectAll}
              onSelectOne={productSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={productSelection.selected}
            /> : <CartTable/>
            
            }
            
          </Stack>
          {
            cart_products && cart_products.length > 0 ? 
            <OverviewCheckout total = {cart_products.reduce((a,v) =>  a = a + v.price , 0 )}/>
            : ""
          }
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
