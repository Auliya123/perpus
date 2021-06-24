import * as React from "react";

export const setNavigator = React.createRef();

export function navigate(name, params) {
  setNavigator.current?.navigate(name, params);
}
