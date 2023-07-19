import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';

type Props = {};

export default function Row1(props: Props) {
  const { data } = useGetKpisQuery();
  console.log('data: ', data);
  return (
    <>
      <DashboardBox bgcolor='#fff' gridArea='a'></DashboardBox>
      <DashboardBox bgcolor='#fff' gridArea='b'></DashboardBox>
      <DashboardBox bgcolor='#fff' gridArea='c'></DashboardBox>
    </>
  );
}
