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
  maxOutputTokens: 600,
  responseMimeType: "text/plain",
};

// Google AI Response for chat
export const generateChatResponse = async (chatMessage) => {
  try {
    // I could actually make the AI read conetexts by storing all the input and output conversations in an object
    // yes, it would work, it sounds simple enough. But I'll do that when I'm done, if there is strength.
    // Added context to the application

    // I did this already, I'm leaving the comment because i don't know how to rephrase the sentence to help
    // you see what I with regards to contexting right now
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

    return result.response.text();
  } catch (error) {
    console.log(error);

    return null; // this wouldnt do much, because i think react query block or overides it or something, I'm not sure, basically we would be checking for the data rather than the error here, cos react query doesn't let code get here, I think.
  }
};

export const getExistingBook = async ({ author, book }) => {
  return null;
};

export const generateBookResponse = async ({ author, book }) => {
  // The carefully curated request to the AI to give us what we want.
  const requestForBookandAuthor = `input: Find a ${book} written by this ${author}.
If the ${book} written by this ${author} exists, create a list of things that readers can look forward to in this ${book}, by ${author}. 
Once you have a list, create a pseudo scheduled time for the day to read at least 1 chapter for me to try it out. You have one of two responses, whereby if you provide one of them, you shouldn't bother providing the other... one of them should be in the following JSON format: 
{
  "bookInfo": {
    "book": "${book}",
    "author": "${author}",
    "scheduledTime": "write me your recommeded schedule, assuminig i have nothing to do for the day without tabbing, write it all on one line",
    "description": "description of the book and author without tabbing, write it all on one line",
    "highlights": ["short paragraph on the higlight 1 ", "short paragraph on the highlight 2","short paragraph on the highlight 3"]
  }
}
tht other response If you can't find info on exact ${book}, or ${book} does not exist, or it is not written by the following author ${author} return { "bookInfo": null }, with no additional characters. Just to clarify, some examples of characters that are not needed are back ticks before and after the json brackets. to clarify again, only return a json format, not other characters should be added before nor after the json format, i do not need your commentary on whether the format is a json format, just present me with the approrpiate json format, need and raw, nothing else. again do not add \`\`\`json before the json file, please;
`;

  try {
    const parts = [
      {
        text: "A professor-type AI that knows all written books by name and by author, this AI searches for books majorly. If the book doesnt exists, it tells the user by returning one of two requested JSON format",
      },
      {
        text: requestForBookandAuthor,
      },
      { text: "output: " },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });

    // Cleaning up the response, cos this AI is not normal
    const cleanedUpResponse = result.response
      .text()
      .replace(/^```json\s*|\s*```$/g, "")
      .replace("```", "")
      .trim();

    const bookData = JSON.parse(cleanedUpResponse.replace("```", "").trim());
    // Either it throws an error message, tells us if cant find the book, or returns bookInfo: null, I
    // want to be able to catch the result wihtout harming the application flow
    if (!bookData.bookInfo) {
      return null;
    }
    return bookData.bookInfo;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const createNewBook = async (book) => {
  return null;
};
