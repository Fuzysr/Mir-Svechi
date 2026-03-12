import { memo } from 'react';
import type { Product } from '../../types';
import HeroSlider from './components/HeroSlider';
import CategoriesSection from './components/CategoriesSection';
import HitsSection from './components/HitsSection';
import AdvantagesSection from './components/AdvantagesSection';

interface HomeProps {
  onAddToCart: (product: Product) => void;
}

const Home = memo(function Home({ onAddToCart }: HomeProps) {
  return (
    <>
      <HeroSlider />
      <CategoriesSection />
      <HitsSection onAddToCart={onAddToCart} />
      <AdvantagesSection />
    </>
  );
});

export default Home;
