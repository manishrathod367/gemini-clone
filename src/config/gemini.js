
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"
  
  const MODEL_NAME = "gemini-2.0-flash-thinking-exp-01-21";
  const API_KEY = "AIzaSyClIaNTNkOrCvm6m-aBB-FkrpIBLAz3E7M"; 
  
  async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });
  
    //const userInput = "Hello, Gemini!"; // Replace with your actual user input
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
  }
  
  export default runChat;
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = "AIzaSyClIaNTNkOrCvm6m-aBB-FkrpIBLAz3E7M";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-pro-preview-03-25",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 65536,
//   responseModalities: [],
//   responseMimeType: "text/plain",
// };

// export async function generateGeminiResponse(inputText) {
//   const chatSession = model.startChat({
//     generationConfig,
//     history: [],
//   });

//   const result = await chatSession.sendMessage(inputText);
//   const textResponse = result.response.text();

//   return textResponse;
// }

// // Example usage if testing manually:
//  generateGeminiResponse("Tell me a joke").then(console.log);
