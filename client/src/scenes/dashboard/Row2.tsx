import { useMemo } from 'react';

import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';

import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';

import FlexBetween from '@/components/FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

const pieData = [
  { name: 'Group A', value: 600 },
  { name: 'Group B', value: 400 },
];

export default function Row2() {
  const { palette } = useTheme();
  const pieColors = [palette.primary[300], palette.primary[800]];

  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            'Operational Expenses': operationalExpenses,
            'Non Operational Expenses': nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const productExpense = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      {/* CHART D */}
      <DashboardBox bgcolor='#fff' gridArea='d'>
        <BoxHeader
          title='Operational vs Non-Operational Expenses'
          sideText='+8%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId='left'
              orientation='left'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              yAxisId='right'
              orientation='right'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '10px' }}
            />
            <Tooltip
              contentStyle={{
                fontSize: '10px',
                border: `1px solid ${palette.grey[600]}`,
                backgroundColor: palette.grey[800],
                borderRadius: '15px',
              }}
            />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='Operational Expenses'
              stroke={palette.primary.main}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='Non Operational Expenses'
              stroke={palette.tertiary[500]}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* CHART E */}
      <DashboardBox bgcolor='#fff' gridArea='e'>
        <BoxHeader title='Campaigns and Targets' sideText='+4%' />
        <FlexBetween mt='0.25rem' gap='1rem' pr='1rem'>
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: -12,
              bottom: 0,
            }}
          >
            <Tooltip
              contentStyle={{
                fontSize: '10px',
                border: `1px solid ${palette.grey[600]}`,
                backgroundColor: palette.grey[800],
                borderRadius: '15px',
              }}
              cursor={{
                stroke: palette.primary[300],
                strokeWidth: 2,
                opacity: 0.1,
              }}
            />
            <Pie
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey='value'
              stroke='none'
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml='-0.7rem' flexBasis='40%'>
            <Typography m='0.3rem 0' variant='h3' color={palette.primary[300]}>
              220
            </Typography>
            <Typography variant='h5'>Target Sales</Typography>
            <Typography variant='h6'>Finance goals of campaign</Typography>
          </Box>
          <Box flexBasis='40%'>
            <Typography variant='h5'>Revenue Losses</Typography>
            <Typography variant='h6'>Losses are down 25%</Typography>
            <Typography mt='0.4rem' variant='h5'>
              Profit Margins
            </Typography>
            <Typography variant='h6'>Margins up by 40%</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      {/* CHART F */}
      <DashboardBox bgcolor='#fff' gridArea='f'>
        <BoxHeader title='Product Prices vs Expenses' sideText='+5%' />
        <ResponsiveContainer width='100%' height='100%'>
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -20,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type='number'
              dataKey='price'
              name='price'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type='number'
              dataKey='expense'
              name='expense'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                fontSize: '10px',
                border: `1px solid ${palette.grey[600]}`,
                backgroundColor: palette.grey[800],
                borderRadius: '15px',
              }}
              cursor={{
                stroke: palette.primary[300],
                strokeWidth: 2,
                opacity: 0.1,
              }}
              formatter={(v) => `$${v}`}
            />
            <ZAxis type='number' range={[20]} />
            <Scatter
              name='Product Expense Ratio'
              data={productExpense}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}
