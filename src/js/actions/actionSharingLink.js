export const SET_SHARING_LINK = "set_sharing_link";

export function setSharingLink(link) {

  return {
    type: SET_SHARING_LINK,
    payload: link
  };
}