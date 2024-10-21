import { authFetch , isTokenValid} from './utils/ProviderAuth';
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = 'https://gamify-near-backend.highcoiny.com';

/**
 * this for extract user id from token by jwt-decode library
 * @returns userId from token
 */
const getUserIdFromToken = () => {
  const token = localStorage.getItem('accessToken'); 

  if (!token) {
    console.error("Token is missing. User may not be logged in.");
    return null; // Return null if token is missing
  }

  try {
    const decodedToken = jwtDecode(token); // Decode the token
    return decodedToken.id; // Extract id from the token
  } catch (error) {
    console.error("Error decoding token:", error);
    return null; // Return null if there's an error decoding
  }
}

/**
 * this function for update profile and wizard 
 * @param userData This parameter holds the data that will be transferred to the back end.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const updateUserProfile = async (userData) => {

    if(!isTokenValid()){
      return;
    }
  try {
    const userId = getUserIdFromToken(); // Get the user ID from the token

    const response = await authFetch(`${API_BASE_URL}/users/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    return response;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw error;
  }
};


/**
 * this function for get profile By id
 * @param userId This parameter for user id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const getUserProfile = async () => {

  if(!isTokenValid()){
    return;
  }
try {
  const userId = getUserIdFromToken(); // Get the user ID from the token

  const response = await authFetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    
  });

  if (response.message !== "find one user") {
    throw new Error('Error GET User');
  }
  return response;

} catch (error) {
  console.error('Error in getUserProfile:', error);
  throw error;
}
};

/**
 * this function for get all Course 
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const getAllCourse = async () => {
  if(!isTokenValid()){
    return;
  }
  try {
    const userId = getUserIdFromToken();
    const response = await authFetch(`${API_BASE_URL}/courses/teacher/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.message !== "findAll") {
      throw new Error('Error GET course');
    }
    return response;
  } catch (error) {
    console.error('Error in GET course:', error);
    throw error;
  }
};

/**
 * this function for get Course By Id 
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getCourseById = async (courseId) => {
  if(!isTokenValid()){
    return;
  }
  try {
    const response = await authFetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.message !== "findOne") {
      throw new Error('Error GET course');
    }
    return response;
  } catch (error) {
    console.error('Error in GET course:', error);
    throw error;
  }
};

/**
 * this function for create course 
 * @param courseData This parameter holds the data that will be transferred to the back end. 
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const createCourse = async (courseData) => {

  if(!isTokenValid()){
    return;
  }

  try {

    const response = await authFetch(`${API_BASE_URL}/courses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (response.message !== "created") {
      throw new Error('Error creating course');
    }
    return response;
  } catch (error) {
    console.error('Error in creating course:', error);
    throw error;
  }
};

/**
 * this function for update course 
 * @param courseData This parameter holds the data that will be transferred to the backend.
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const updateCourse = async (courseData,courseId) => {

  if(!isTokenValid()){
    return;
  }

  try {

    const response = await authFetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (response.message !== "updated") {
      throw new Error('Error creating course');
    }
    return response;
  } catch (error) {
    console.error('Error in creating course:', error);
    throw error;
  }
};


/**
 * this function for create lesson 
 * @param lessonData This parameter holds the data that will be transferred to the backend. 
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const createLesson = async (lessonData ,courseId) => {
  if(!isTokenValid()){
    return;
  }

  try {

    const response = await authFetch(`${API_BASE_URL}/course/${courseId}/lectures`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    });

    if (response.message !== "created") {
      throw new Error('Error creating lesson');
    }
    return response;
  } catch (error) {
    console.error('Error in creating lesson:', error);
    throw error;
  }
};

/**
 * this function for update Lesson 
 * @param lessonData This parameter holds the data that will be transferred to the backend.
 * @param lessonId this parameter for Lesson id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const updateLesson = async (lessonData,courseId,lessonId) => {
  if(!isTokenValid()){
    return;
  }

  try {

    const response = await authFetch(`${API_BASE_URL}/course/${courseId}/lectures/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    });

    if (response.message !== "updated") {
      throw new Error('Error creating lesson');
    }
    return response;
  } catch (error) {
    console.error('Error in creating lesson:', error);
    throw error;
  }
};

/**
 * this function for get all Lesson 
 * @param courseId this parameter for Lesson id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const getAllLesson = async (courseId) => {
  if(!isTokenValid()){
    return;
  }

  try {

    const response = await authFetch(`${API_BASE_URL}/course/${courseId}/lectures`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.message !== "findAll") {
      throw new Error('Error GET lesson');
    }
    return response;
  } catch (error) {
    console.error('Error in GET lesson:', error);
    throw error;
  }
};

/**
 * this function for get Lesson By Id 
 * @param courseId this parameter for course id.
 * @param lessonId this parameter for lesson id.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getLessonById = async (courseId , lessonId) => {
  if(!isTokenValid()){
    return;
  }

  try {
    const response = await authFetch(`${API_BASE_URL}/course/${courseId}/lectures/${lessonId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.message !== "found") {
      throw new Error('Error GET course');
    }
    return response;
  } catch (error) {
    console.error('Error in GET course:', error);
    throw error;
  }
};

/**
 * this function for create QA 
 * @param qaData This parameter holds the data that will be transferred to the backend. 
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const createQA = async (qaData ,courseId , lessonId) => {

    if(!isTokenValid()){
      return;
    }
  try {

    const response = await authFetch(`${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(qaData),
    });

    if (response.message !== "created") {
      throw new Error('Error creating lesson');
    }
    return response;
  } catch (error) {
    console.error('Error in creating lesson:', error);
    throw error;
  }
};

/**
 * this function for update QA 
 * @param qaData This parameter holds the data that will be transferred to the backend.
 * @param qaId this parameter for QA id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const updateQA = async (qaData,courseId,lessonId,qaId) => {
  if(!isTokenValid()){
    return;
  }

  try {

    const response = await authFetch(`${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions/${qaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(qaData),
    });

    if (response.message !== "updated") {
      throw new Error('Error creating lesson');
    }
    return response;
  } catch (error) {
    console.error('Error in creating lesson:', error);
    throw error;
  }
};


/**
 * this function for found QA by id
 * @param lessonId this parameter for lesson id.
 * @param qaId this parameter for QA id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const findQA = async (courseId,lessonId,qaId) => {
  if(!isTokenValid()){
    return;
  }

  try {

    const response = await authFetch(`${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions/${qaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      
    });

    if (response.message !== "found") {
      throw new Error('Error found QA');
    }
    return response;
  } catch (error) {
    console.error('Error in found QA:', error);
    throw error;
  }
};


/**
 * this function for update order lesson 
 * @param data This parameter holds the data that will be transferred to the backend.
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const updateOrderLesson = async (data,courseId) => {
  if(!isTokenValid()){
    return;
  }

  try {

    const response = await authFetch(`${API_BASE_URL}/course/${courseId}/lectures/orders`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.message !== "updated") {
      throw new Error('Error creating order');
    }
    return response;
  } catch (error) {
    console.error('Error in creating order:', error);
    throw error;
  }
};