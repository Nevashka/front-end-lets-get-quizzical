import { bindActionCreators } from "redux";

const initialState = { category: '', difficulty: '', questions: [], loading: false,qidx:0}

//store params in a single object and pass then to a reducer object called PARAMS(?)

const settingsReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'LOAD_QUESTIONS':
      return { ...state, questions: action.payload, loading: false }
    case 'LOAD_CATEGORY':
      return { ...state, category: action.payload, loading: false };
    case 'LOAD_DIFFICULTY':
      return { ...state, difficulty: action.payload, load: false };
    case 'SET_QUESTIONS':
      return{...state, questions:action.payload,}
    case 'SET_INDEX':
      return {...state, qidx: action.payload}
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

// add LOAD_QUESTIONS reducer?
export default settingsReducer;
