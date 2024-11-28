"use client";

import React, { useState } from "react";

const chat = () => {
  const [text, setText] = useState("");
  const [message, setMessage] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(text);
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
