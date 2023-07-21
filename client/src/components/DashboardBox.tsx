import { Box } from '@mui/material';
import { styled } from '@mui/system';

const DashboardBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.light,
  borderRadius: '1rem',
  boxShadow: '0.2rem 0.2rem 0.15rem 0.1rem rgba(0, 0, 0, .6)',
  transition: 'all .2s ease-in-out',
  ':hover': {
    boxShadow: '0.4rem 0.4rem 0.15rem 0.15rem rgba(0, 0, 0, .45)',
    transform: 'scale(1.01)',
  },
}));

export default DashboardBox;
