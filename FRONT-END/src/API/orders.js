import { BaseApiUrl } from "../constants"

export const PostOrderItems = async (Data) => {
  try {
    const response = await fetch(`${BaseApiUrl}/orderItems`, {
      method:'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Data)
    });
    
    if(response.ok) {
      const data = response.json()
      console.log(data)
      return data;
    } else {
        console.log('could not post the items')
    }

  } catch (e) {
    console.log(e.message)
  }
}