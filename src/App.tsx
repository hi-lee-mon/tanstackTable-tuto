import { Accessor } from './components/Accessor';
import { Pagination } from './components/Pagination';
import { Sort } from './components/Sort';
import './index.css';

const App = () => {
  return (
    <div>
      <h1>Accessor</h1>
      <Accessor />
      <br />
      <hr />
      <br />
      <h1>Sort</h1>
      <Sort />
      <hr />
      <br />
      <h1>Pagination</h1>
      <Pagination />
    </div>
  );
};

export default App;
