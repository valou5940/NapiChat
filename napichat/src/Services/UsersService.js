import { usePostFetch, useGetFetch } from '../Utils/Fetch';

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

// get users list
export const useGetUsersList = query => {
  const usersList = useGetFetch(query);
  return usersList;
};
