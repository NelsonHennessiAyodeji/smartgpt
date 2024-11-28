"use client";

import { generateChatResponse } from "@/utils/actions";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

const chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { mutate, isPending } = useMutation({
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
        {messages.map((message, index) => {
          // I'll us the input-output text from the responses to differenciate user text from AI response
          const AI = index % 2;
          const avatar = AI ? "👨🏾‍🏫" : "👨🏾";
          const responseBackground = AI ? "bg-base-100" : "bg-base-200";

          return (
            <div
              key={index}
              className={`${responseBackground} flex py-6 -mx-8 px-8 text-xl leading-loose border-b border-base-300`}
            >
              <span className="mr-4">{avatar}</span>
              <p className="max-w-3xl">
                {AI
                  ? message.text.replace("output:", "")
                  : message.text.replace("input:", "")}
              </p>
            </div>
          );
        })}
        {isPending ? <span className="loading"></span> : null}
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
          <button
            className="btn bg-teal-600 join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "please wait" : "ask question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default chat;
