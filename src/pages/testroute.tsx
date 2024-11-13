import React from "react";

const TestPage = (): React.JSX.Element => {
  return (
    <div>
      <p>Test page</p>
      <p>Sample public Vite env val: {import.meta.env.VITE_ENV_VALUE}</p>
    </div>
  );
};

export default TestPage;
