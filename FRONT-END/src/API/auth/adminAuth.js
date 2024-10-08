import { BaseApiUrl } from "../../constants";
// export const AdminRegister = async (formData) => {
//     try {
//         const response = await fetch(`http://127.0.0.1:8000/api/user/register`, {
//             method: "POST",
//             body: formData,
//             // credentials: "include",
//         });


//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('you have been registered successefully', data);
//         return data;

//     } catch (error) {
//         console.error(error.message);
//     }
// }


export const AdminLogin = async (formData) => {
    try {
        const response = await fetch(`${BaseApiUrl}/admin/login`, {
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
            localStorage.setItem('AdminToken', data.AdminToken);
            console.log(data.AdminToken)
            console.log('logged in')
            
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error(error.message);
    }
};


