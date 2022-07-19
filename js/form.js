import { signIn, getUser } from "./api.js";

export const homePage = () => {
    const $div = $("<div/>", {class: "home-page"});
    const $h3 = $("<h3 />", {class:"align-center", text: "HOME PAGE"})
    const $contentDiv = $("<div />", {class: "content d-flex j-around"}).append(            
        $("<div/>", {class: "get-user"}).append(
            $("<button/>", {class:"btn-get", text: "Get User"}).on("click", () => {
                const $container = $('.container');
                
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
            })
        ),

        $("<div />", {class: "log-in"}).append(
            $("<button/>", {class:"btn-logIn", text:"Log In"})
        )
    )
    $div.append($h3, $contentDiv);      
    return $div;
}

export const loginPage = () => {
    const $form = $("<form/>", {class:"login-form"});
    const $div1 = $("<div/>", {class:"d-flex mbot-10"}).append(
        $("<div/>", {class: "label"}).append(
                $("<label/>", {text: "Username"})
        ), $("<div/>", {class: "input-area"}).append(
                $("<input/>", {type: "text", id: "user-name",value: "", placeholder:""})
        )
    );
    const $div2 = $("<div/>", {class:"d-flex mbot-10"}).append(
        $("<div/>", {class: "label"}).append(
                $("<label/>", {text: "Password"})
        ), $("<div/>", {class: "input-area"}).append(
                $("<input/>", {type: "text", id: "user-password",value: "", placeholder:""})
        )
    );   

    // log in button
    const $btnSubmit = $("<button>Log In</button></button", {class: "btn-submit"}).
        on("click", (e) => {
            e.preventDefault();
            const $username = $("#user-name");
            const $password = $("#user-password");
            const user = {
                username: $username.val(),
                password: $password.val()
            }            
            signIn(user).then(({headers, data}) => {
                // save token (headers.authorization) into localStorage
                localStorage.setItem("token", headers.authorization);
                console.log(localStorage.getItem("token"));
                // redirect to home page
                const $container = $('.container');
                $container.empty();
                const $pAlert = createAlert(`Log in successfully ! Welcome ${data.data.firstname} ${data.data.lastname}`)
                const $homePage = homePage();
                $container.append($homePage, $pAlert);
            }).catch(error => console.log(error.message));
        }
    )
    $form.append($div1, $div2, $btnSubmit);

    return $form;    
}

export const signUpPage = () => {
    return `
    <h3>Sign Up</h3>
    <!-- Form sign up -->
    <form action="" class="user-form">
        <div class="d-flex mbot-10">
            <div class="label">
                <label for="">User Name</label>
            </div>

            <div class="input-area">
                <input type="text" id="user-name" value="" placeholder>
            </div>
        </div>
        <div class="d-flex mbot-10">
            <div class="label">
                <label for="">Password</label>
            </div>

            <div class="input-area">
                <input type="text" id="user-password" value="" placeholder>
            </div>
        </div>
        <div class="d-flex mbot-10">
            <div class="label">
                <label for="">First Name</label>
            </div>

            <div class="input-area">
                <input type="text" id="user-firstName" value="" placeholder>
            </div>
        </div>
        <div class="d-flex mbot-10">
            <div class="label">
                <label for="">Last Name</label>
            </div>
            <div class="input-area">
                <input type="text" id="user-lastName" value="" placeholder>
            </div>
        </div>     
        <button class="btn-submit">Sign up new user</button>
    </form>
    `
}

export const createAlert = (text) => {
    return `
    <p class="alert">${text}</p>
    `
}
