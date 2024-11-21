import { Route, RouteObject } from 'react-router';

const nested = (tree?: RouteObject[]) => {
  if (!tree) {
    return null;
  }

  return tree?.map(leaf => (
    <Route key={leaf.path} path={leaf.path} element={leaf.element}>
      {nested(leaf?.children)}
    </Route>
  ));
};

export default nested;
