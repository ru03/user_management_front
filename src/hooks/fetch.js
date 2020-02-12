import { useReducer, useCallback } from "react";

const initState = {
  data: null,
  error: null,
  isLoading: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUESTED':
      return { ...state, isLoading: true }
    case 'FETCH_FAILED':
      const { error } = action.payload;
      return { data: null, isLoading: false, error }
    case 'FETCH_SUCCEEDED':
      const { data } = action.payload;
      return { ...state, isLoading: false, data }
    default:
      return state;
  }
}

const useFetch = () => {
  const [fetchState, dispatch] = useReducer(reducer, initState);

  const sendRequest = useCallback((url, config) => {
    dispatch({ type: 'FETCH_REQUESTED' });
    fetch(url, config)
      .then(res => res.json())
      .then(data => dispatch({ type: 'FETCH_SUCCEEDED', payload: { data } }))
      .catch(err => dispatch({ type: 'FETCH_FAILED', payload: { error: err.message } }))
  }, []);

  return {
    error: fetchState.error,
    isLoading: fetchState.isLoading,
    data: fetchState.data,
    sendRequest,
  }
}

export default useFetch;