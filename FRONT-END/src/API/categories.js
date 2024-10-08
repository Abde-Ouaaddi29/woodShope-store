import { BaseApiUrl } from "../constants";

export const GetCategorie = async () => {
  try {
      const response = await fetch(`${BaseApiUrl}/categories`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          }
      });

      if (response.ok) {
          const data = await response.json();
          console.log(data);
          return data;
      } else {
          console.error('Error fetching categories:');
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
    const AdminToken = localStorage.getItem('AdminToken');
    const response = await fetch(`${BaseApiUrl}/categories`, {
      method: "POST",
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${AdminToken}`
      },
      body: formData
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(data);
        return data;
    } else {
        console.error('Error fetching categories:', response.statusText);
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const EditCategory = async (formData, id) => {
  try {
    const AdminToken = localStorage.getItem('AdminToken');
    const response = await fetch(`${BaseApiUrl}/categories/${id}`, {
      method: "PUT",
      headers: {
        'accept': 'application/json', 
        'Authorization': `Bearer ${AdminToken}`
      },
      body: formData 
    });

    if (response.ok) {
      const data = await response.json();
      console.log('updated data', data);
      return data;
    } else {
      console.error('Error fetching categories:', response.statusText);
    }
  } catch (error) {
    console.log(error.message);
  }
};


export const DestroyCategory = async (id) => {
 try {
   const AdminToken = localStorage.getItem('AdminToken');
   const response = await fetch(`${BaseApiUrl}/categories/${id}`, {
    method: "delete",
    headers: {
      // 'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${AdminToken}`
    },
   });

   if (response.ok) {
    const data = await response.json();
    console.log(data);
      return data;
  } else {
      console.error('Error fetching categories:', response.statusText);
  }

 } catch (error) {
  console.log(error.message)
 }
}
  