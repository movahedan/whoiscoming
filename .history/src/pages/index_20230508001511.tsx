import { Footer } from '@whoiscoming-ui/ui/molecules';
import { Layout } from '@whoiscoming-ui/ui/templates';
import { DatePicker, Slider } from 'antd';
import type { SliderMarks } from 'antd/es/slider';


const marks: SliderMarks = {
  0: '9:00',
  5: '17:00',
  6: '18:00',
};

export default function Home() {
  return <Layout footer={<Footer />}> 
         <div>
         <DatePicker open inputReadOnly />
         </div>
         <div>
         <Slider vertical range step={10} defaultValue={[0, 6]} />
         </div>

        </Layout>;
}
