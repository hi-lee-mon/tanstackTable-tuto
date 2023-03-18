import { useState } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>テンプレートタイトル</h1>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        count is {count}
      </button>
      <div>test</div>
      <div>test</div>
      <div>test</div>
    </div>
  );
};

export default App;
