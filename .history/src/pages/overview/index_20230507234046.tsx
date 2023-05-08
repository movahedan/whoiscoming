export default function Overview() {
  return <Layout footer={<Footer />}> 
  <Input placeholder="Basic usage" value='danjelashehi@gmail.com' />
    <DatePicker open inputReadOnly />
  </Layout>;
}
