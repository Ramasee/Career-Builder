export const CALCULATE_TACTIC_LIMIT = "calculate_tactic_limit";
export const RESET_TACTIC_LIMIT = "reset_tactic_limit";
export const SET_TACTIC_LIMIT = "set_tactic_limit";

export function calculateTacticLimit(level) {

  let limit = 4;

  if (Number(level) === 16) {
    limit = 4;
  } else if (Number(level) >= 12) {
    limit = 3;
  } else if (Number(level) >= 8) {
    limit = 2;
  } else if (Number(level) >= 4) {
    limit = 1;
  }

  return {
    type: CALCULATE_TACTIC_LIMIT,
    payload: limit
  };
}

export function resetTacticLimit() {
  
  return {
    type: RESET_TACTIC_LIMIT
  };
}

export function setTacticLimit(limit) {
  
  return {
    type: SET_TACTIC_LIMIT,
    payload: limit
  };
}
