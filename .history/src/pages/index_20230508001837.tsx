import { Footer } from '@whoiscoming-ui/ui/molecules';
import { Layout } from '@whoiscoming-ui/ui/templates';
import { DatePicker, Slider,  Col, Row } from 'antd';
import type { SliderMarks } from 'antd/es/slider';


const marks: SliderMarks = {
  '9:00' : '9:00',
  '10:00' : '10:00',
  '11:00' : '11:00',
  '12:00' : '12:00',
  '13:00' : '13:00',
  '14:00' : '14:00',
  '15:00' : '15:00',
  '16:00' : '16:00',
  '17:00': '17:00',
  '18:00': '18:00',
};

export default function Home() {
  return <Layout footer={<Footer />}> 
   <Row>
      <Col span={12}><DatePicker open inputReadOnly /></Col>
      <Col span={12}><Slider vertical range   defaultValue={[0, 6]} /></Col>
    </Row>

        </Layout>;
}
