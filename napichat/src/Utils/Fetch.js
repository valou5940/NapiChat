import { useState, useEffect } from 'react';

// const Utils = {
// const useGetFetch = url => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetch(url, {
//       method: 'get',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.log(error));
//   }, [url]);
//   return data;
// };
const API = `${process.env.REACT_APP_API_URL}/`;

export const usePostFetch = params => {
  const [data, setData] = useState([]);

  async function postData(params) {
    const response = await fetch(API + params.url, {
      method: 'post',
      body: JSON.stringify(params.body),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    setData(data);
  }

  useEffect(() => {
    if (params !== undefined) {
      postData(params);
    }
  }, [params]);
  return data;
};
