import axios from 'axios';

// Create a new order
// export const createOrder = async (order) => {
//   try {
//     const { data } = await axios.post('/api/orders/place', order);
//     return data;
//   } catch (error) {
//     console.error('Create order error:', error);
//     throw new Error('Failed to create order. Please try again later.');
//   }
// };
// // export const createOrder = async (orderData) => {
//   try {
//     const response = await axios.post('/api/orders/place', orderData);
//     return response.data;
//   } catch (error) {
//     throw new Error('Failed to create order: ' + error.response?.data?.message || error.message);
//   }
// };

export const createOrder = async (order) => {
  try {
    const { data } = await axios.post('/api/orders/place', {
      user: order.user,  // User ID
      items: order.items.map(item => ({
        food: item.food,
        price: item.price,
        quantity: item.quantity
      })),
      totalPrice: order.totalPrice,
      amount: order.totalPrice,
      name: order.name,
      address: order.address,
      addressLatLng: order.addressLatLng ? {
        lat: order.addressLatLng.lat,
        lng: order.addressLatLng.lng
      } : null,
    });
    return data;
  } catch (error) {
    console.error('Create order error:', error);
    throw new Error('Failed to create order. Please try again later.');
  }
};
// Get the new order for the current user
export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
    return data;
  } catch (error) {
    console.error('Get new order error:', error);
    throw new Error('Failed to retrieve new order. Please try again later.');
  }
};
// Capture payment
export const capturePayment = async (data) => {
  try {
    const { response } = await axios.post('/api/orders/capture', data);
    return response.data;
  } catch (error) {
    console.error('Capture payment error:', error);
    throw new Error('Failed to capture payment. Please try again later.');
  }
};

// Pay for an order
export const pay = async (paymentId) => {
  try {
    const { data } = await axios.put('/api/orders/pay', { paymentId });
    return data;
  } catch (error) {
    console.error('Payment error:', error);
    throw new Error('Payment failed. Please try again later.');
  }
};

// Track an order by its ID
export const trackOrderById = async (orderId) => {
  try {
    const { data } = await axios.get(`/api/orders/track/${orderId}`);
    return data;
  } catch (error) {
    console.error('Track order error:', error);
    throw new Error('Failed to track order. Please try again later.');
  }
};

// Get all orders based on state
export const getAll = async (state = '') => {
  try {
    const { data } = await axios.get(`/api/orders/${state}`);
    return data;
  } catch (error) {
    console.error('Get all orders error:', error);
    throw new Error('Failed to retrieve orders. Please try again later.');
  }
};

// Get all order statuses
export const getAllStatus = async () => {
  try {
    const { data } = await axios.get('/api/orders/allstatus');
    return data;
  } catch (error) {
    console.error('Get all statuses error:', error);
    throw new Error('Failed to retrieve order statuses. Please try again later.');
  }
};
