import { bindActionCreators } from "redux";

const initialState = { category: '', difficulty: '', questions: [], loading: false, qidx:0, score: 0}

//store params in a single object and pass then to a reducer object called PARAMS(?)

const settingsReducer = (state = initialState, action) => {

  switch(action.type) {
    case 'LOAD_QUESTIONS':
      return { ...state, questions: action.payload }
    case 'LOAD_CATEGORY':
      return { ...state, category: action.payload };
    case 'LOAD_DIFFICULTY':
      return { ...state, difficulty: action.payload };
    case 'SET_QUESTIONS':
      return{...state, questions:action.payload}
    case 'SET_INDEX':
      return {...state, qidx: action.payload}
    case 'SET_ERROR':
      return { ...state, error: action.payload}
    
    default:
      return state
  }
}

// add LOAD_QUESTIONS reducer?
export default settingsReducer;
