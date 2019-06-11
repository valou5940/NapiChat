import { useState, useEffect } from 'react';

//API ENDPOINT
const API = `${process.env.REACT_APP_API_URL}/`;

//GET REQUEST
export const useGetFetch = params => {
  const [data, setData] = useState([]);

  async function getData(params) {
    const response = await fetch(API + params.url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
    setData(data);
  }

  useEffect(() => {
    if (params !== undefined && params !== null) {
      getData(params);
    }
  }, [params]);
  return data;
};

// POST REQUEST
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
    if (params !== undefined && params !== null) {
      postData(params);
    }
  }, [params]);
  return data;
};
