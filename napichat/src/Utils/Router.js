import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const useRouter = newRoute => {
  const [route, setRoute] = useState('/');

  useEffect(() => {
    if (newRoute.newRoute !== null) {
      setRoute(newRoute.currenRoute);
      console.log(route);
    }
  }, [newRoute.currenRoute, newRoute.newRoute, route]);
  if (newRoute.props != null) {
    return newRoute.props.history.push(route);
  }
};

export default useRouter;
