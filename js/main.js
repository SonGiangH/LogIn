import { getUser, signUp, uploadAvatar } from "./api.js";
import { createAlert, homePage, loginPage, signUpPage } from "./form.js";

$(function () {
    const $userName = $('#user-name');
    const $password = $('#user-password');
    const $firstName = $('#user-firstName');
    const $lastName = $('#user-lastName');    
    const $form = $('.user-form');
    const $uploadForm = $('.upload-form');
    const $inputFile = $('#avatar');
    const $btnGetUser = $('.btn-get');    
    const $btnLogIn = $(".btn-logIn");
    const $container = $('.container');


    //form upload avatar
    $uploadForm.on('submit', (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("avatar", $inputFile[0].files[0])       
        console.log($inputFile[0].files[0]);

        // get token
        const token = localStorage.getItem("token");
        console.log(token);

        uploadAvatar(formData, token).then((resp) => console.log(resp)).catch(error => console.log(error));
    })

    // form sign up new user
    $form.on('submit', (e) => {
        e.preventDefault();
        const user = {
            username: $userName.val().trim(),
            password: $password.val().trim(),
            firstname: $firstName.val().trim(),
            lastname: $lastName.val().trim(),
        };
        signUp(user).then(({headers}) => {
            // save token (headers.authorization) into localStorage
            localStorage.setItem("token", headers.authorization);
            console.log(localStorage.getItem("token"));

            // redirect to home page
            const $pAlert = createAlert("Sign Up successfully")
            $userName.val("")
            $password.val("")
            $firstName.val("")
            $lastName.val("")
            $container.append($pAlert);

        }).catch(error => console.log(error));
    });

    // Get user information
    $btnGetUser.on('click', (e) => {
        e.preventDefault();

        // get token from localStorage
        const token = localStorage.getItem("token");
        if (token) {
            getUser(token).then(({data}) => {
                $container.empty();
                const $pAlert = createAlert(`Welcome ${data.data.firstname} ${data.data.lastname}`) 
                $container.append($pAlert);
            }).catch(error => console.log(error));
        } else {
            // redirect to log in page
            const $loginPage = loginPage();
            $container.empty();
            $container.append($loginPage);
        }      
        
    });

    // button Log In
    $btnLogIn.on('click', (e) => {
        e.preventDefault();
        // redirect to log in page
        $container.empty();
        $container.append(loginPage);
    })

})

