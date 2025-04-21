async function runChat(prompt) {
  const token = localStorage.getItem('token');

  const res = await fetch('http://localhost:5000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // JWT token
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Chat request failed');
  }

  return data.response;
}

export default runChat;


// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   } from "@google/generative-ai"
  
//   const MODEL_NAME = "gemini-2.0-flash-thinking-exp-01-21";
//   const API_KEY = "AIzaSyClIaNTNkOrCvm6m-aBB-FkrpIBLAz3E7M"; 
  
//   async function runChat(prompt) {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };
  
//     const safetySettings = [
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ];
  
//     const chat = model.startChat({
//       generationConfig,
//       safetySettings,
//       history: [],
//     });
  
//     //const userInput = "Hello, Gemini!"; // Replace with your actual user input
//     const result = await chat.sendMessage(prompt);
//     const response = result.response;
//     console.log(response.text());
//     return response.text();
//   }
  
//   export default runChat;
