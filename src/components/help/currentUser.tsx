import { UserProps } from "./type";

export const useCurrentUser = () => {
  const storedUser = localStorage?.getItem("user");
  const currentUser = storedUser ? (JSON.parse(storedUser) as UserProps) : null;

  return currentUser;
};
