import { BaseApiUrl } from "../../constants";

export const UserRegister = async (formData) => {
    try {
        const response = await fetch(`${BaseApiUrl}/user/register`, {
            method: "POST",
            // headers: {
            //     'Accept': 'application/json',
            //   },
            body: formData,
            // credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('you have been registered successefully', data);
        return data;

    } catch (error) {
        console.error(error.message);
    }
}


export const UserLogin = async (formData) => {
    try {
        const response = await fetch(`${BaseApiUrl}/user/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
              },
            body: formData,
            // credentials: "include",
        });

        const data = await response.json();
        console.log(data)

        if (response.ok) {
            localStorage.setItem('UserToken', data.UserToken);
            console.log(data.userToken)
            console.log('logged in')
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error.message);
    }
};


