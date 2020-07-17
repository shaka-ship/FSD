import * as ActionTypes from './ActionTypes';

export const Feedback = (state = {
    errMess: null,
    feedback: []
},action) => {
    switch(action.type) {
        case ActionTypes.ADD_FEEDBACK:
            var fb = action.payload;
            fb.id = state.feedback.length+1;
            return {...state,feedback: state.feedback.concat(fb)};
        default:
            return state;
    }
}