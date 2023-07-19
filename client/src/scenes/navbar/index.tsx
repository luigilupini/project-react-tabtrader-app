import FlexBetween from '@/components/FlexBetween';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { Box, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

export default function Navbar(props: Props) {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('dashboard');
  return (
    <FlexBetween mb='0.25rem' p='0.5rem 0rem' color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap='0.75rem'>
        <ShowChartIcon sx={{ fontSize: '28px' }} />
        <Typography variant='h4' fontSize='16px'>
          tabtrader
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap='2rem'>
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to='/'
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            Dashboard
          </Link>
        </Box>
        <Box sx={{ '&:hover': { color: palette.primary[100] } }}>
          <Link
            to='/predictions'
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
}
