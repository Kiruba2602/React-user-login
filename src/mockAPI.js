
export const mockAPI = (email,password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        if(email === "test@example.com" && password === "password"){
            resolve({message: "Login Successfull"})
        }
        else{
            reject({message: "Invalid email or password"})
        }
    }, 1000);
  });
};
