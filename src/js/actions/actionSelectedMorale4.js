export const SELECT_MORALE_4 = "select_morale_4";
export const RESET_SELECTED_MORALE_4 = "reset_selected_morale_4";

export function selectMorale4(abilityId) {

  return {
    type: SELECT_MORALE_4,
    payload: abilityId
  };
}

export function resetSelectedMorale4() {

  return {
    type: RESET_SELECTED_MORALE_4,
    payload: false
  };
}