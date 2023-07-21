import { useMemo, useState } from 'react';

import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery } from '@/state/api';

import { Box, Button, Typography, useTheme } from '@mui/material';

import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

/* https://tom-alexander.github.io/regression-js/

Regression-js is a js module containing a collection of linear least-squares
fitting methods for simple data analysis. It can be found on github. 

```js
// Pass the data into the model as an array of arrays:
const result regression.linear([[0, 1], [32, 67], [12, 79]]);
const gradient = result.equation[0]; // optional
const yIntercept = result.equation[1]; // optional
```

Data is passed into the model as an array.

A second parameter can be used to configure the model. The configuration
parameter is optional. `null` values are ignored. The precision option will set
the number of significant figures the output is rounded to. */
import regression, { DataPoint } from 'regression';

export default function Predictions() {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;

    const formatted: Array<DataPoint> = monthData.map(({ revenue }, index) => {
      return [index, revenue];
    });
    const regressionLine = regression.linear(formatted);

    return monthData.map(({ month, revenue }, index) => {
      console.table({
        name: month,
        'Actual Revenue': revenue,
        'Regression Line': regressionLine.points[index][1],
        'Predicted Revenue': regressionLine.predict(index + 12)[1],
      });
      return {
        name: month,
        'Actual Revenue': revenue,
        'Regression Line': regressionLine.points[index][1],
        'Predicted Revenue': regressionLine.predict(index + 12)[1],
      };
    });
  }, [kpiData]);

  return (
    <DashboardBox width='100%' height='100%' p='1rem' overflow='hidden'>
      {/* HEADER */}
      <FlexBetween m='1rem 2.5rem' gap='1rem'>
        <Box>
          <Typography variant='h3'>Revenue and Predictions</Typography>
          <Typography variant='h6'>
            Charted revenue and predicted based on linear regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: '0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)',
            '&:hover': {
              backgroundColor: palette.grey[600],
            },
          }}
        >
          Show Predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      {/* LINEAR CHART WITH PREDICTIONS */}
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' stroke={palette.grey[800]} />
          <XAxis dataKey='name' tickLine={false} style={{ fontSize: '10px' }}>
            <Label value='Month' offset={-5} position='insideBottom' />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            axisLine={{ strokeWidth: '0' }}
            style={{ fontSize: '10px' }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value='Revenue in USD'
              angle={-90}
              offset={-5}
              position='insideLeft'
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              fontSize: '10px',
              border: `1px solid ${palette.grey[600]}`,
              backgroundColor: palette.grey[800],
              borderRadius: '15px',
            }}
          />
          <Legend verticalAlign='top' />
          <Line
            type='monotone'
            dataKey='Actual Revenue'
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            type='monotone'
            dataKey='Regression Line'
            stroke='#8884d8'
            dot={false}
            strokeWidth={2}
          />
          {/* PREDICTION REGRESSION LINE */}
          {isPredictions && (
            <Line
              strokeDasharray='5 5'
              dataKey='Predicted Revenue'
              stroke={palette.secondary[500]}
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
}
