"use client";

import { generateChatResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

const chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate } = useMutation({
    // Send all messages
    mutationFn: (query) => generateChatResponse([...messages, query]),
    // Setting the error toast, just in case
    onSuccess: (data) => {
      if (!data) {
        toast.error("Something went wrong");
        return;
      }
      // This part was very bloody believe it or not...
      // And for some reason that I'm too lazy to go into, this code below was necessary, i spent Literally 4hrs on this 🤦‍♂️
      const newData = data.replace("/\n/g", "");

      data = { text: `output: ${newData}` };
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = { text: `input: ${text}` }; //{ role: "user", parts: text };
    mutate(query); // Pass the query to the actions file
    setMessages((prev) => [...prev, query]);
    setText("");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-5xl">messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Message SmartGPT"
            className="input input-bordered join-item w-full"
            value={text}
            required // This default prompt  checker is good enough
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button className="btn bg-teal-600 join-item" type="submit">
            Ask question
          </button>
        </div>
      </form>
    </div>
  );
};

export default chat;
