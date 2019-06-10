import { usePostFetch } from '../Utils/Fetch';

// save user with nickname and returns logged user
export const useLogin = query => {
  const user = usePostFetch(query);
  return user;
};

// change user channel
export const useChangeChannel = query => {
  const user = usePostFetch(query);
  return user;
};
