import DashboardBox from '@/components/DashboardBox';

type Props = {};

export default function Row2(props: Props) {
  return (
    <>
      <DashboardBox bgcolor='#fff' gridArea='d'></DashboardBox>
      <DashboardBox bgcolor='#fff' gridArea='e'></DashboardBox>
      <DashboardBox bgcolor='#fff' gridArea='f'></DashboardBox>
    </>
  );
}
