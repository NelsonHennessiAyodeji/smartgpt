"use server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b", // No funds, this is literally the cheapest i could get my palms on
});

const generationConfig = {
  temperature: 0.8,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 200,
  responseMimeType: "text/plain",
};

// Google AI Response
export const generateChatResponse = async (chatMessage) => {
  try {
    // I could actually make the AI read conetexts by storing all the input and output conversations in an object
    // yes, it would work, it sounds simple enough. But I'll do that when I'm done, if there is strength.
    // Added context to the application
    const parts = [
      {
        text: "A professor-type AI that knows all written books by name and by author, this AI searches for books majorly. If the book doesnt exists, it tells the user",
      },
      ...chatMessage,
      { text: "output: " },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    console.log(result.response.text());

    return result.response.text();
  } catch (error) {
    return null; // this wouldnt do much, because i think react query block or overides it, basically we would be checking for the data rather than the error here, cos react query dioesnt let code get here, i think.
  }
};

// Google's Boilerplate for thier AI service.

// const {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } = require("@google/generative-ai");

//   const apiKey = process.env.GEMINI_API_KEY;
//   const genAI = new GoogleGenerativeAI(apiKey);

//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash-8b",
//   });

//   const generationConfig = {
//     temperature: 1,
//     topP: 0.95,
//     topK: 40,
//     maxOutputTokens: 200,
//     responseMimeType: "text/plain",
//   };

//   async function run() {
//     const parts = [
//       {text: "A professor-type AI that knows all written books by name and by author, this AI searches for books majorly. If the book doesnt exists, it tells the user"},
//       {text: "input: "},
//       {text: "output: "},
//     ];

//     const result = await model.generateContent({
//       contents: [{ role: "user", parts }],
//       generationConfig,
//     });
//     console.log(result.response.text());
//   }

//   run();
