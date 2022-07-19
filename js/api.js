// get user information with token from api
export const getUser = (token) => {
    return axios.get("https://todo-api-with-auth.herokuapp.com/api/auth/user", {
        headers: {
            Authorization: token,
        }
    });
}

// sign up user 
export const signUp = (user) => { 
    return axios.post("https://todo-api-with-auth.herokuapp.com/api/auth/signup", {
        username: user.username,
        password: user.password,
        firstname: user.firstname,
        lastname: user.lastname
    });
}  

// sign in user
export const signIn = (user) => {
    return axios.post("https://todo-api-with-auth.herokuapp.com/api/auth/signin", {
        username: user.username,
        password: user.password
    });
}

//upload avatar
export const uploadAvatar = (formData, token) => {
    return axios.put("https://todo-api-with-auth.herokuapp.com/api/user/avatar", {
        headers: {
            Authorization: token,
        },
        data: formData,
    })
}