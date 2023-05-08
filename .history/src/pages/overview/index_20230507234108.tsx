import { Footer } from '@whoiscoming-ui/ui/molecules';
import { Layout } from '@whoiscoming-ui/ui/templates';
import { DatePicker, Input } from 'antd';

export default function Overview() {
  return <Layout footer={<Footer />}> 
  Overview
  <Input placeholder="Basic usage" value='danjelashehi@gmail.com' />
    <DatePicker open inputReadOnly />
  </Layout>;
}
