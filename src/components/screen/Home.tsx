import React, { ChangeEvent, useState } from "react";
import CommentBox from "../inculdes/CommentBox";
import { useTextStyles } from "../help/useTextStyles";
import { useAppDispatch, useAppSelector } from "../../sotre/hooks";
import { addComment } from "../../sotre/commentSlice";
import { Comment } from "../help/type";
import { useCurrentUser } from "../help/currentUser";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [text, setText] = useState<string>();
  const dispatch = useAppDispatch();
  const { comments } = useAppSelector((state) => state.commets);
  console.log(comments, "set text");

  // Handler for image input change
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  // Handler to trigger file input click
  const handleImageClick = () => {
    document.getElementById("fileInput")?.click();
  };
  // Handler for image input change end

  //handle text style
  const { styles, toggleBold, toggleItalic, getClassNames, toggleUnderline } =
    useTextStyles();
  //handle text style end
  console.log(styles, "style");
  // curretUser
  const currentUser = useCurrentUser();
  // curretUser end

  // generateUniqueID
  function generateUniqueID() {
    return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
  }
  // generateUniqueID end

  // sumbit chat
  const handleSubmit = () => {
    if (!currentUser) {
      console.log("User is not logged in.");
      return;
    }
    const id = uuidv4();
    // Construct the comment object
    const newComment: Comment = {
      id: id,
      userName: currentUser.displayName,
      textType: [styles], // Assuming `styles` is defined elsewhere
      text,
      image: imagePreview,
      profile: currentUser.photoURL,
      createDate: Timestamp.now(),
      reply: [],
      reaction: [],
    };

    // Dispatch the addComment action
    dispatch(addComment(newComment));

    // Reset form fields
    setText("");
    setImagePreview("");
  };
  // sumbit chat
  return (
    <div className="p-5">
      <div className="border border-gray-200 rounded-lg p-[30px] shadow-2xl">
        <div className="flex justify-between">
          <h2 className="font-semibold">Comments</h2>
          <ul className="flex gap-1 items-center bg-[#e5e7eb] p-2 w-[150px] justify-between rounded-md">
            <li>Latest</li>
            <li>Popular</li>
          </ul>
        </div>
        <div className="border  border-gray-200 rounded-lg p-[30px] shadow-2xl my-10">
          <h2 className={getClassNames()}>{text}</h2>
          <input
            type="text"
            placeholder="Enter The Comment.."
            value={text}
            className="w-full h-[20px] border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2"
            onChange={(event: any) => setText(event.target.value)}
          />
          <div className="flex justify-between items-center mt-3">
            <ul className="flex items-center gap-1">
              <li onClick={toggleBold}>
                <img
                  className="w-[30px] "
                  src={require("../../assets/image/format_bold.png")}
                  alt="Bold"
                />
              </li>
              <li onClick={toggleItalic}>
                <img
                  className="w-[30px]"
                  src={require("../../assets/image/format_italic.png")}
                  alt="Italic"
                />
              </li>
              <li onClick={toggleUnderline}>
                <img
                  className="w-[30px]"
                  src={require("../../assets/image/format_underlined.png")}
                  alt="Underline"
                />
              </li>
              <li>
                <div>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <div onClick={handleImageClick}>
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected"
                        style={{ width: "100%", height: "100%" }}
                      />
                    ) : (
                      <img
                        className="w-[20px]"
                        src={require("../../assets/image/cloud_upload.png")}
                        alt="icon"
                      />
                    )}
                  </div>
                </div>
              </li>
            </ul>
            <button
              onClick={handleSubmit}
              className={`bg-black text-white text-sm px-3 py-1 rounded-md hover:bg-gray-800 
                 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Send
            </button>
          </div>
        </div>
        <CommentBox />
      </div>
    </div>
  );
}
