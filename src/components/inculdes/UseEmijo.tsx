import { useState } from "react";

export const useEmoji = () => {
  //   type Emoji = {
  //     symbol: string;
  //     name: string;
  //     // Other properties if any
  //   };
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [emojiCounts, setEmojiCounts] = useState<Record<string, number>>({});

  const addEmoji = (emoji: string) => {
    if (!selectedEmojis.includes(emoji)) {
      setSelectedEmojis((prev) => [...prev, emoji]);
      setEmojiCounts((prev) => ({
        ...prev,
        [emoji]: (prev[emoji] || 0) + 1,
      }));
    } else {
      setEmojiCounts((prev) => ({
        ...prev,
        [emoji]: (prev[emoji] || 0) + 1,
      }));
    }
  };

  return { selectedEmojis, emojiCounts, addEmoji };
};
