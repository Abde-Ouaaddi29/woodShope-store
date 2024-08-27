import { json } from "react-router-dom";

export const GetCategorie = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/categories', {
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
    const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
      method: "GET",
      headers:{
        "Content-Type" : "application/json"
      },
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
    const response = await fetch('http://127.0.0.1:8000/api/categories', {
      method: 'POST',
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
    const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
      method : "PUT",
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
   const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
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
  