const initialState = { category: '', difficulty: '', type: '', loading: false}

const settingsReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'LOADING':
      return { ...state, type: action.payload, loading: true };
    case 'LOAD_CATEGORY':
      return { ...state, category: action.payload, loading: false };
    case 'LOAD_DIFFICULTY':
      return { ...state, difficulty: action.payload, load: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default settingsReducer;
