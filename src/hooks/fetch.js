import { useReducer, useCallback } from "react";

const initState = {
  data: null,
  error: null,
  isLoading: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUESTED':
      return { ...initState, isLoading: true }
    case 'FETCH_FAILED':
      const { error } = action.payload;
      return { data: null, isLoading: false, error }
    case 'FETCH_SUCCEEDED':
      const { data } = action.payload;
      return { ...state, isLoading: false, data }
    case 'CLEAR':
      return initState;
    default:
      return state;
  }
}

const useFetch = () => {
  const [fetchState, dispatch] = useReducer(reducer, initState);

  const clear = useCallback(() => dispatch({ type: 'CLEAR' }), [dispatch]);
  const sendRequest = useCallback((url, config) => {
    dispatch({ type: 'FETCH_REQUESTED' });
    fetch(url, config)
      .then(res => Promise.all([res.ok, res.json()]))
      .then(([isOk, data]) => {
        if (isOk) {
          dispatch({ type: 'FETCH_SUCCEEDED', payload: { data } })
        } else {
          dispatch({ type: 'FETCH_FAILED', payload: { error: data.message } });
        }
      })
      .catch(err => dispatch({ type: 'FETCH_FAILED', payload: { error: err.message } }))
  }, []);

  return {
    error: fetchState.error,
    isLoading: fetchState.isLoading,
    data: fetchState.data,
    clear,
    sendRequest,
  }
}

export default useFetch;