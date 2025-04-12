import axios from 'axios';
const serverAddress = "http://localhost:3500";

export async function getUser(requestBody) {
   try {
      console.log("getting user with id number " + requestBody.idNumber + " and password " + requestBody.password);
      const response = await axios.post(`${serverAddress}/user/getUser`, requestBody,{
         withCredentials: true,
      });
      console.log(response)
      return response;
   } catch (error) {
      console.log("Error fetching user: " + error.message);
      return error;
   }
}


export async function addUser(newUser){
   try{
    const response = await axios.post(`${serverAddress}/user/adduser`,newUser);
    return response
   }catch(error){
    console.log("error adding new user "+error.message);
    return error
   }
}

export async function getDepartment(newUser){
   try{
    const response = await axios.get(`${serverAddress}/getDepartment`);
    return response
   }catch(error){
    console.log("error fetching department "+error.message);
    return error
   }
}

export async function getLoggedInUser(){
   try{
      console.log("Getting logged-in user with cookies inside backend operations...");
      const response = await axios.get(`${serverAddress}/user/getLoggedInUser`, {
         withCredentials: true,
      });
      
      console.log("User data received:", response.data);
      return response.data; // Ensure only the user data is returned

   } catch (error) {
      console.log("Error fetching user:", error.message);
      return null; // Return null instead of the error object
   }
}


