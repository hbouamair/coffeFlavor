import { defineEventHandler, readBody, sendError, createError, H3Event } from 'h3';
import client from '../../prisma/client';

export default defineEventHandler(async (event: H3Event) => {
  const method = event.req.method;

  switch (method) {
    case 'POST':
      return await createCoffeeFlavor(event);
    case 'GET':
      if (event.req.url?.includes('/id/')) {
        return await getCoffeeFlavor(event);
      }
      return await getCoffeeFlavors();
    case 'PUT':
      return await updateCoffeeFlavor(event);
    case 'DELETE':
      return await deleteCoffeeFlavor(event);
    default:
      return sendError(event, createError({ statusCode: 405, message: 'Method Not Allowed' }));
  }
});

// Create a new coffee flavor
const createCoffeeFlavor = async (event: H3Event) => {
  try {
    const body = await readBody(event);
    return await client.coffeeFlavor.create({
      data: body,
    });
  } catch (error) {
    return sendError(event, createError({ statusCode: 400, message: 'Bad Request' }));
  }
};

// Get all coffee flavors
const getCoffeeFlavors = async () => {
  try {
    return await client.coffeeFlavor.findMany();
  } catch (error) {
    throw createError({ statusCode: 500, message: 'Internal Server Error' });
  }
};

// Get a single coffee flavor by ID
const getCoffeeFlavor = async (event: H3Event) => {
  const id = event.req.url?.split('/id/')[1];
  if (!id) {
    return sendError(event, createError({ statusCode: 400, message: 'Bad Request: ID is required' }));
  }
  try {
    return await client.coffeeFlavor.findUnique({
      where: { id: parseInt(id, 10) },
    });
  } catch (error) {
    return sendError(event, createError({ statusCode: 404, message: 'Not Found' }));
  }
};

// Update a coffee flavor by ID
const updateCoffeeFlavor = async (event: H3Event) => {
  const id = event.req.url?.split('/id/')[1];
  if (!id) {
    return sendError(event, createError({ statusCode: 400, message: 'Bad Request: ID is required' }));
  }
  try {
    const body = await readBody(event);
    return await client.coffeeFlavor.update({
      where: { id: parseInt(id, 10) },
      data: body,
    });
  } catch (error) {
    return sendError(event, createError({ statusCode: 400, message: 'Bad Request' }));
  }
};

const deleteCoffeeFlavor = async (event: H3Event) => {
    const id = event.req.url?.split('/id/')[1];
    console.log('Deleting coffee flavor with ID:', id); // Debugging log
  
    if (!id) {
      return sendError(event, createError({ statusCode: 400, message: 'Bad Request: ID is required' }));
    }
    try {
      const deletedFlavor = await client.coffeeFlavor.delete({
        where: { id: parseInt(id, 10) },
      });
      console.log('Deleted coffee flavor:', deletedFlavor); // Debugging log
      return deletedFlavor;
    } catch (error) {
      console.error('Error deleting coffee flavor:', error); // Debugging log
      return sendError(event, createError({ statusCode: 404, message: 'Not Found' }));
    }
  };