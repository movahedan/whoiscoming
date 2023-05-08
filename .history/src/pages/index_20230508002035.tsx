import { Footer } from '@whoiscoming-ui/ui/molecules';
import { Layout } from '@whoiscoming-ui/ui/templates';
import { DatePicker, Slider,  Col, Row } from 'antd';
import type { SliderMarks } from 'antd/es/slider';

const style: React.CSSProperties = {
  display: 'inline-block',
  height: 300,
  marginLeft: 70,
};



const marks: SliderMarks = {
  9 : '9:00',
  10 : '10:00',
  11 : '11:00',
  12 : '12:00',
  13 : '13:00',
  14 : '14:00',
  15 : '15:00',
  16 : '16:00',
  17: '17:00',
  18: '18:00',
};

export default function Home() {
  return <Layout footer={<Footer />}> 
   <Row>
      <Col span={12}><DatePicker open inputReadOnly /></Col>
      <Col span={12}><Slider vertical range step={1} defaultValue={[9, 18]} /></Col>
    </Row>

        </Layout>;
}
