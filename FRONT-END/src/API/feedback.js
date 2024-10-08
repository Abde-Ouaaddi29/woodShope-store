import { BaseApiUrl } from "../constants";

export const GetFeedback = async () => {
 try {
   const response = await fetch(`${BaseApiUrl}/feedback`, {
    method: "GET",
    headers: {
        "Content-Type" : "application/json"
    }
   });

   if(!response.ok){
     console.log('could not fetch any feedback')
   }

   const data = await response.json()
   console.log('fetch', data)
   return data;

 } catch (error) {
    console.log(error.message)
 }
}

export const GetFeedbackByStatus = async (status) => {
    try {
      const response = await fetch(`${BaseApiUrl}/feedback?status=${status}`);
      const data = await response.json()
      console.log('fetch', data)
      return data;
   
    } catch (error) {
       console.log(error.message)
    }
   }

   export const PostFeedback = async (Data) => {
    try {
      const response = await fetch(`${BaseApiUrl}/feedback`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify(Data)
      });
  
      if (!response.ok) {
        console.log('Could not post the feedback');
      } else {
        const data = await response.json();
        console.log('Posted successfully', data);
        return data;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
export const UpdateFeedback = async (id) => {
  try {
    const AdminToken = localStorage.getItem('AdminToken')
     const response = await fetch(`${BaseApiUrl}/feedback/${id}`, {
        method: "PUT",
        headers: {
            'accept': 'application/json',
            "Authorization": `Bearer ${AdminToken}`
        }
     });

     const data = await response.json();
     console.log('it is updated successuffly', data)
     return data;

  } catch (error) {
    console.log(error.message)
  }
}

export const DestroyFeedback = async (id) => {
    try {
       const AdminToken = localStorage.getItem('AdminToken')
       const response = await fetch(`${BaseApiUrl}/feedback/${id}`, {
          method: "DELETE",
          headers: {
            'accept': 'application/json',
            "Authorization": `Bearer ${AdminToken}`
        }
       });
  
       const data = await response.json();
       console.log('it is deleted successuffly', data)
       return data;
  
    } catch (error) {
      console.log(error.message)
    }
}