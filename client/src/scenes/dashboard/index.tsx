import { Box, useMediaQuery } from '@mui/material';
import Row1 from './Row1';
import Row2 from './Row2';
import Row3 from './Row3';

// 10x3 grid for large screens
const areaLarge = `
  "a b c"
  "a b c"
  "a b c"
  "a b f"
  "d e f"
  "d e f"
  "d h i"
  "g h i"
  "g h j"
  "g h j"
`;
// 1x30 grid for small screens
const areaSmall = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

export default function Dashboard() {
  const isAboveMediumScreens = useMediaQuery('(min-width: 1290px)');
  return (
    <Box
      width='100%'
      height='100%'
      display='grid'
      gap='1.5rem'
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: 'repeat(3, minmax(370px, 1fr))',
              gridTemplateRows: 'repeat(10, minmax(60px, 1fr))',
              gridTemplateAreas: areaLarge,
            }
          : {
              gridAutoColumns: '1fr',
              gridAutoRows: '80px',
              gridTemplateAreas: areaSmall,
            }
      }
      pb={1}
    >
      {/* KPI INDICATOR ROW */}
      <Row1 />
      {/* PRODUCTS ROW */}
      <Row2 />
      {/* TRANSACTIONS ROW */}
      <Row3 />
    </Box>
  );
}
