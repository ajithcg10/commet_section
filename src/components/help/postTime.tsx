import React from "react";
import { Timestamp } from "firebase/firestore";

export const PostTitm = (item: Timestamp) => {
  const now = new Date();
  const postTime = item.toDate();

  if (!postTime) {
    return null;
  }

  const timeDiff = now.getTime() - postTime.getTime();

  // Convert milliseconds to seconds, minutes, hours, days, etc.
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  let timeString = "";
  if (days > 0) {
    timeString = `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    timeString = `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    timeString = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    timeString = "just now";
  }

  return <span className="opacity-40 text-sm"> {timeString}</span>;
};
