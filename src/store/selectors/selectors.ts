 
import {  stateInterf } from "../interface";

export const getExampleValue = ({ ...state }) => {
  const Configurations: stateInterf = state["Configurations"];
  return Configurations.exampleValue;
} 