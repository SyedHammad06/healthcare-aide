import { NextPage } from 'next';
import { Navbar } from '../components/Navbar';
import { Counter } from '../components/Counter';
import { Hero } from '../components/Hero';

const HomePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Counter />
    </>
  );
};

export default HomePage;
