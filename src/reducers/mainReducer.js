import initialState from "./initialState";
import * as Types from "../constants/ActionTypes";

export const mainReducer = (nextState = initialState, action) => {
  let clonedState = { ...nextState };

  switch (action.type) {
    case Types.FETCH_GLOBAL_STAT_SUCESS:
      const { cases, recovered, deaths, updated, active } = action.data;
      clonedState = {
        ...clonedState,
        confirmed: cases,
        recovered,
        deaths,
        lastUpdate: updated,
        active
      };

      nextState = clonedState;
      return nextState;
    case Types.FETCH_GLOBAL_STAT_FAILED:
      console.error(action.data);
      return nextState;
    default:
      return nextState;
  }
};
