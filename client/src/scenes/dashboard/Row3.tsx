import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';

import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from '@/state/api';

import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { Cell, Pie, PieChart } from 'recharts';

export default function Row3() {
  const { palette } = useTheme();
  const pieColors = [palette.primary[300], palette.primary[800]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const productColumns = [
    {
      field: '_id',
      headerName: 'Identifier',
      flex: 1,
    },
    {
      field: 'expense',
      headerName: 'Expense',
      flex: 0.4,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 0.25,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    {
      field: '_id',
      headerName: 'Identifier',
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: 'Buyer',
      flex: 0.6,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 0.3,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: 'productIds',
      headerName: 'Count',
      flex: 0.1,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ];

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  return (
    <>
      {/* CHART G */}
      <DashboardBox bgcolor='#fff' gridArea='g'>
        <BoxHeader
          title='List of Products'
          sideText={`${productData?.length} products`}
        />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='75%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              color: palette.grey[600],
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            rows={productData || []}
            columns={productColumns}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            style={{ margin: '0.5rem' }}
          />
        </Box>
      </DashboardBox>
      {/* CHART H */}
      <DashboardBox bgcolor='#fff' gridArea='h'>
        <BoxHeader
          title='Recent Orders'
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt='1rem'
          p='0 0.5rem'
          height='80%'
          sx={{
            '& .MuiDataGrid-root': {
              color: palette.grey[300],
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              color: palette.grey[600],
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            '& .MuiDataGrid-columnSeparator': {
              visibility: 'hidden',
            },
          }}
        >
          <DataGrid
            rows={transactionData || []}
            columns={transactionColumns}
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            style={{ margin: '0.5rem' }}
          />
        </Box>
      </DashboardBox>
      {/* CHART I */}
      <DashboardBox bgcolor='#fff' gridArea='i'>
        <BoxHeader title='Category Breakdown' sideText='3 services' />
        <FlexBetween textAlign='center'>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke='none'
                  data={data}
                  innerRadius={18}
                  outerRadius={30}
                  paddingAngle={2}
                  dataKey='value'
                >
                  {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='h5' mt={'-1rem'}>
                {data[0].name}
              </Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      {/* CHART J */}
      <DashboardBox bgcolor='#fff' gridArea='j'>
        <BoxHeader title='Summary and Explanation Data' sideText='+30%' />
        <Box
          height='15px'
          margin='1.25rem 1rem 0.4rem 1rem'
          bgcolor={palette.primary[800]}
          borderRadius='1rem'
        >
          <Box
            height='15px'
            bgcolor={palette.primary[600]}
            borderRadius='1rem'
            width='30%'
          ></Box>
        </Box>
        <Typography margin='1rem' variant='h6'>
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed.
        </Typography>
      </DashboardBox>
    </>
  );
}
