import React, { useState } from "react";
import { useEmoji } from "./UseEmijo";
import useFirestore from "../help/useFirestore";
import { PostTitm } from "../help/postTime";
import { useAppDispatch } from "../../sotre/hooks";

import { Comment } from "../help/type";

export default function CommentBox() {
  const [showOptions, setShowOptions] = useState(false);
  const { emojiCounts, selectedEmojis, addEmoji } = useEmoji();
  const dispatch = useAppDispatch();
  const handleOptionClick = (emoji: string) => {
    addEmoji(emoji); // Update emoji state using the hook's method

    setShowOptions(false);
  };
  const { data, error, loading } = useFirestore("Comments");
  console.log(data);

  return (
    <>
      {data &&
        data.map((item) => {
          return (
            <div className="flex flex-col  mb-5 border-b h:[120px]">
              <div className="flex items-center gap-2">
                <div className="w-[30px] rounded-full">
                  <img
                    className="block w-full rounded-full"
                    src={item.profile ?? ""}
                    alt="Profile"
                  />
                </div>
                <h4 className="font-bold">{item.userName} </h4>
              </div>
              <div>
                <p
                  className={`my-3 ${
                    item?.textType?.[0]?.bold ? "font-bold" : ""
                  }${item?.textType?.[0]?.italic ? "italic" : ""}${
                    item?.textType?.[0]?.underline ? "underline" : ""
                  } `}
                >
                  {item.text}
                </p>
                {item.image && (
                  <img className="my-3" src={item.image} alt="Image-Comment" />
                )}
              </div>
              <div>
                <ul className="flex items-center gap-2 text-sm mb-3 h-[34px]">
                  <span onClick={() => setShowOptions(!showOptions)}>😀</span>
                  {/* <FaSmile  /> */}
                  <li>
                    <div
                      className={` transition-all duration-300 ease-in-out ${
                        !showOptions && "opacity-0 "
                      } transform`}
                    >
                      <div
                        className={`opacity-100 rounded-full bg-gray-200 p-2 flex gap-3 ${
                          !showOptions && "hidden"
                        }  `}
                      >
                        <span onClick={() => handleOptionClick("😀")}>😀</span>
                        <span onClick={() => handleOptionClick("😍")}>😍</span>
                        <span onClick={() => handleOptionClick("👿")}>👿</span>
                      </div>
                    </div>
                  </li>
                  <div className="flex gap-3 ">
                    {selectedEmojis.map(
                      (emoji, index) => (
                        console.log(emoji),
                        (
                          <span key={index}>
                            {emoji}
                            {/* or emoji.name if that's the correct property */}
                            ({emojiCounts[emoji]})
                          </span>
                        )
                      )
                    )}
                  </div>
                  <li className="flex items-center border-l-2 border-gray-400 pl-2 h-3">
                    Reply
                  </li>
                  <li className="flex items-center border-l-2 border-gray-400 pl-2 h-3">
                    {item.createDate
                      ? PostTitm(item.createDate)
                      : "No date available"}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
    </>
  );
}
