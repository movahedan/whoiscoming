import { Footer } from '@whoiscoming-ui/ui/molecules';
import { Layout } from '@whoiscoming-ui/ui/templates';
import { DatePicker, Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';


const marks: SliderMarks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: { color: '#f50' },
    label: <strong>100°C</strong>,
  },
};

export default function Home() {
  return <Layout footer={<Footer />}> 
         
          <DatePicker open inputReadOnly />
           

        </Layout>;
}
