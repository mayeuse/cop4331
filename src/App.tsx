import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";

function App(): React.JSX.Element {
  return <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>;
}

export default App;
