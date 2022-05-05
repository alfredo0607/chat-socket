import { useContext } from "react";
import { messageContext } from "../context/MessageContext";

export const useMessage = () => {
  return useContext(messageContext);
};
