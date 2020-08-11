import {createStore} from "redux";

const initialState = {
    count : 0
}
const rootReducer = (state = initialState, action )=> {
    switch(action.type){
        case "ADD":
            return Object.assign(state,state.count + 1);
        default:
            return state;
    }
}

const store = createStore(rootReducer);
console.log("store----",store.getState());

export {
    store
}