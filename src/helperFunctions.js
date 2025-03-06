import {toast} from "react-toastify"

export function getWelcomeMessage(name) {
    const messages = [
      `Hello, ${name}! Glad to Have You Here!`,
      `Welcome Back, ${name}! Let’s Get Started!`,
      `Hey ${name}, Ready to Dive In?`,
      `Great to See You, ${name}!`,
      `${name}, Your Dashboard Awaits!`,
      `Welcome Aboard, ${name}!`,
      `${name}, Let's Make Today Productive!`,
      `Good to Have You Here, ${name}!`,
      `Hope You're Having a Great Day, ${name}!`,
      `Welcome, ${name}! Let's Make Things Happen!`,
      `Hey ${name}, Let's Achieve Something Great Today!`,
      `Nice to See You Again, ${name}!`,
      `We Missed You, ${name}! Let’s Get to Work!`,
      `${name}, You’re All Set for Success!`,
      `A New Day, A New Opportunity, ${name}!`,
      `Let’s Make Magic Happen, ${name}!`,
      `You’re in the Right Place, ${name}! Let’s Go!`
    ];
  
    // Select a random message
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  export function truncateString(str, maxLength = 25) {
    console.log(str)
    if (typeof str !== "string") {
      toast.error("Invalid input: Expected a string");
      return "";
    }
    return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
  }
  
  