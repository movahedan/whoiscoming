import { Footer } from '@whoiscoming-ui/ui/molecules';
import { Layout } from '@whoiscoming-ui/ui/templates';

import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
 



export default function Home() {
  return <Layout footer={<Footer />}> 
          <DatePicker open />
        </Layout>;
}
