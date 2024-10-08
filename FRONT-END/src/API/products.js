import { BaseApiUrl } from "../constants";

export const GetProducts = async () => {
    try { 
        const response = await fetch(`${BaseApiUrl}/products`, {
            method:"GET",
            headers:{
                "accept":"application/json"
            }
        })

        if (response.ok) {
            const data = await response.json();
            console.log('products', data);
            return data;
          } else {
            throw new Error('Failed to fetch any product');
          }

    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const ShowProduct = async (id) => {
    try {
     const response = await fetch(`${BaseApiUrl}/products/${id}`, {
        method:"GET",
        headers: {
            "accept":"application/json"
        },
     });
     const data = await response.json();
     console.log('show', data)
     return data;
    
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};

export const FilterProductsByCategory = async (categoryId) => {
    try {
        const response = await fetch(`${BaseApiUrl}/products?category_id=${categoryId}`);
        const data = await response.json();
        console.log('filterd products by category:', data);
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const FilterProductByPrice = async (priceMin, priceMax) => {
    try {
        const response = await fetch(`${BaseApiUrl}/products?priceMin=${priceMin}&priceMax=${priceMax}`);
        const data = await response.json();
        console.log('filterd products by price:', data)
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const FilterProductByName = async (name) => {
    try {
        const response = await fetch(`${BaseApiUrl}/products?name=${name}`);
        const data = await response.json();
        console.log('filterd products by name:', data)
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

export const FilterProductBySort = async (sort) => {
    try {
        const response = await fetch(`${BaseApiUrl}/products?sort=${sort}`);
        const data = await response.json()
        console.log('sorted data ', data)
        return data;

    } catch (error) {
        console.error(error.message)
    }
}

export const PostProducts = async (formData) => {
    try { 
        const AdminToken = localStorage.getItem('AdminToken')
        const response = await fetch(`${BaseApiUrl}/products`, {
            method:"POST",
            headers: {
                 'accept': 'application/json',
                 "Authorization": `Bearer ${AdminToken}`
            },
            body:formData
        })

        if (response.ok) {
            const data = await response.json();
            console.log('added product', data);
            return data;
          } else {
            console.log('Failed to add any product');
          }

    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const EditProduct = async (formData, id) => {
    try {
        const AdminToken = localStorage.getItem('AdminToken')
        const response = await fetch(`${BaseApiUrl}/products/${id}`, {
            method: "PUT",
            headers: {
                 "accept":"application/json",
                 "Authorization": `Bearer ${AdminToken}`
            },
            body: formData,
        });

        const data = await response.json();

        // Check if the response is not ok
        if (!response.ok) {
            console.error(data.message || 'Failed to update product');
        }

        console.log('Updated data:', data);
        return data;

    } catch (error) {
        console.error('Error updating product:', error.message);
    }
};

export const DestroyProduct = async (id) => {
 try {
     const AdminToken = localStorage.getItem('AdminToken')
     const response = await fetch(`${BaseApiUrl}/products/${id}`, {
        method: "delete",
        headers: {
            "accept":"application/json",
            "Authorization": `Bearer ${AdminToken}`
        },
  });

    const data = await response.json();
    console.log('the product is deleted ', data);
    return data;

 } catch (error) {
  console.log(error.message)
 }
}



