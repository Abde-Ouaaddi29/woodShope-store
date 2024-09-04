import { BaseApiUrl } from "../constants";

export const GetCategorie = async () => {
    try {
      const response = await fetch(`${BaseApiUrl}/categories`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        throw new Error('Failed to fetch any categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  };
  
export const ShowCategory = async (id) => {
  try {
    const response = await fetch(`${BaseApiUrl}/categories/${id}`, {
      method: "GET",
      headers:{
        "Content-Type" : "application/json"
      },
      credentials: "include" 
    });
    
    const data = await response.json();
    console.log("show",data)
    return data;

  } catch (error) {
    console.log(error.message)
  }
}

export const PostCategorie = async (formData) => {
  try {
    const response = await fetch('${BaseApiUrl}/categories', {
      method: 'POST',
      credentials: "include" ,
      body: formData
      // we should add {name} as the origin name in backend or we can use this methode {name:value}
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      return data;
    } else {
      throw new Error('Failed to post categories');
    }
  } catch (error) {
    console.error(error);
  }
};

export const EditCategory = async ({formData, id}) => {
  try {
    const response = await fetch(`${BaseApiUrl}/categories/${id}`, {
      method : "PUT",
      credentials: "include",
      body: JSON.stringify({formData:formData}) 
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Updated category data:", data);
      return data;
  } else {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Failed to update category");
  }  
    
  } catch (error) {
    console.log(error.message)
  }
}

export const DestroyCategory = async (id) => {
 try {
   const response = await fetch(`${BaseApiUrl}/categories/${id}`, {
    method: "delete",
   });

   if(response.ok){
    const data = await response.json();
    console.log(data)
    return data;
   }

 } catch (error) {
  console.log(error.message)
 }
}
  