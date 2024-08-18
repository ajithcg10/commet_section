import React from "react";
import { useAppDispatch, useAppSelector } from "../../sotre/hooks";
import { googleSigin, logout } from "../../sotre/authSlice";
import { useCurrentUser } from "../help/currentUser";

export default function Header() {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.user);
  console.log(user);
  const handleGoogleSignIn = () => {
    dispatch(googleSigin());
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
  };

  const currentUser = useCurrentUser();

  return (
    <div className="p-5">
      {currentUser?.uid ? (
        <div
          className="flex justify-end items-center gap-3"
          onClick={handleLogout}
        >
          <div>
            <img
              className="w-[50px] rounded-full"
              src={currentUser?.photoURL as string}
              alt="Google"
            />
          </div>
          <h3 className="font-semibold">{currentUser.displayName}</h3>
        </div>
      ) : (
        <div
          className="flex justify-end items-center"
          onClick={handleGoogleSignIn}
        >
          <div>
            <img
              className="w-[50px]"
              src={require("../../assets/image/google.webp")}
              alt="Google"
            />
          </div>
          <h3 className="font-semibold">sign with the google</h3>
        </div>
      )}
    </div>
  );
}
