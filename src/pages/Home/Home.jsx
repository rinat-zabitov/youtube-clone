import './Home.css';
import { useState } from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Feed } from '../../components/Feed/Feed';
export const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);

  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        <Feed category={category} />
      </div>
    </>
  );
};
