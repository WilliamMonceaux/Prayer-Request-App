import '../index.css';
import { HeroArea } from '../components/HeroArea';

function Home() {
  return (
    <HeroArea
      heading="Where healing and community is built"
      paragraph="Join a community dedicated to lifting one another up. Share your prayer request and experience the strength of being known and supported"
      button="Create an Account"
    />
  );
}

export { Home };
