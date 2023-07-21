import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox';

import { useGetKpisQuery } from '@/state/api';

import { useTheme } from '@mui/material';

import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function Row1() {
  const { palette } = useTheme();
  const { data: kpiData } = useGetKpisQuery();

  const revenueExpenses = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue.toFixed(0),
          expenses: expenses.toFixed(0),
        };
      })
    );
  }, [kpiData]);

  const revenueProfit = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue.toFixed(0),
          profit: (revenue - expenses).toFixed(0),
        };
      })
    );
  }, [kpiData]);

  const revenueMonthly = useMemo(() => {
    return (
      kpiData &&
      kpiData[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue.toFixed(0),
        };
      })
    );
  }, [kpiData]);

  return (
    <>
      {/* CHART A */}
      <DashboardBox bgcolor='#fff' gridArea='a'>
        <BoxHeader
          title='Revenue and Expenses'
          subtitle='Here we have a line representing revenue and expenses for the last 12 months.'
          sideText='+4%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -8,
              bottom: 60,
            }}
          >
            {/* <CartesianGrid strokeDasharray='3 3' /> */}
            <defs>
              <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset='95%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id='colorExpenses' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset='95%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey='name'
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              tickLine={false}
              axisLine={{ strokeWidth: '0' }}
              style={{ fontSize: '10px' }}
              domain={[8000, 'dataMax']}
            />
            <Tooltip
              contentStyle={{
                fontSize: '10px',
                border: `1px solid ${palette.grey[600]}`,
                backgroundColor: palette.grey[800],
                borderRadius: '15px',
              }}
            />
            <Area
              type='monotone'
              dataKey='revenue'
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill='url(#colorRevenue)'
            />
            <Area
              type='monotone'
              dataKey='expenses'
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill='url(#colorExpenses)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* CHART B */}
      <DashboardBox bgcolor='#fff' gridArea='b'>
        <BoxHeader
          title='Profit and Revenue'
          subtitle='Here we have a line representing profit and revenue for the last 12 months.'
          sideText='+8%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
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
            <Legend
              height={20}
              wrapperStyle={{
                margin: '0 0 5px 0',
                fontSize: '10px',
              }}
            />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='profit'
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* CHART C */}
      <DashboardBox bgcolor='#fff' gridArea='c'>
        <BoxHeader
          title='Revenue Month by Month'
          subtitle='A bar chart representing revenue for the last 12 months.'
          sideText='+4%'
        />
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={500}
            height={300}
            data={revenueMonthly}
            margin={{
              top: 17,
              right: 15,
              left: -8,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey='name'
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: '10px' }}
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
            />
            <Bar dataKey='revenue' fill='url(#colorRevenue)' />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
}
