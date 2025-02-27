import axios from 'axios';
const serverAddress = "http://192.168.15.54:3500"

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