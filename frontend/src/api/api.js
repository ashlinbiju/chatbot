const API_URL = 'http://localhost:5000/api/chat';

export const sendMessage = async (message) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: message }),  // Send the user input as 'prompt'
    });

    const data = await response.json();
    return data.response;  // Return the chatbot's response
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I couldn't generate a response at this time.";
  }
};
