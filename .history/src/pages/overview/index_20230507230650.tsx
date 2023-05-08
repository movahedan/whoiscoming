import { homepageContent } from '@whoiscoming-ui/contents/home-page';
import { Footer } from '@whoiscoming-ui/ui/molecules';
import { Layout } from '@whoiscoming-ui/ui/templates';

export default function Home() {
  return <Layout footer={<Footer />}>{homepageContent.title}</Layout>;
}
