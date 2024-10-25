import { authFetch, isTokenValid } from "./utils/ProviderAuth";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = "https://gamify-near-backend.highcoiny.com";

/**
 * this for extract user id from token by jwt-decode library
 * @returns userId from token
 */
const getUserIdFromToken = () => {
  const token = localStorage.getItem("accessToken");

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
};

/**
 * this function for update profile and wizard
 * @param userData This parameter holds the data that will be transferred to the back end.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const updateUserProfile = async (userData) => {
  if (!isTokenValid()) {
    return;
  }
  try {
    const userId = getUserIdFromToken(); // Get the user ID from the token

    const response = await authFetch(`${API_BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response;
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
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
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const getAllCourse = async () => {
  if(!isTokenValid()){
    return;
  }
  try {
    const userId = getUserIdFromToken(); // Get the user ID from the token

    const response = await authFetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.message !== "find one user") {
      throw new Error("Error GET User");
    }
    return response;
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    throw error;
  }
};

/**
 * this function for get all Course by status for Admin
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const getAllCourseByStatus = async () => {
  if(!isTokenValid()){
    return;
  }
  try {
    const response = await authFetch(`${API_BASE_URL}/courses/status/ALL`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.message !== "findAll satatus") {
      throw new Error('Error GET course');
    }
    return response;
  } catch (error) {
    console.error('Error in GET course:', error);
    throw error;
  }
};


/**
 * this function for status updated Course from Admin
 * @param courseData This parameter holds the data that will be transferred to the back end. 
 * @param courseId this parameter for course id.
 * @method isTokenValid To verify the current session
 * @returns data from backend 
 */
export const updateCourseStatus = async (courseData , courseId) => {
  if(!isTokenValid()){
    return;
  }
  try {
    const response = await authFetch(`${API_BASE_URL}/courses/status/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (response.message !== "status updated") {
      throw new Error('Error status updated course');
    }
    return response;
  } catch (error) {
    console.error('Error in status updated course:', error);
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
  if (!isTokenValid()) {
    return;
  }
  try {
    const response = await authFetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.message !== "findOne") {
      throw new Error("Error GET course");
    }
    return response;
  } catch (error) {
    console.error("Error in GET course:", error);
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
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (response.message !== "created") {
      throw new Error("Error creating course");
    }
    return response;
  } catch (error) {
    console.error("Error in creating course:", error);
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
export const updateCourse = async (courseData, courseId) => {
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(`${API_BASE_URL}/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    if (response.message !== "updated") {
      throw new Error('Error updated course');
    }
    return response;
  } catch (error) {
    console.error('Error in updated course:', error);
    throw error;
  }
};

/**
 * this function for create lesson
 * @param lessonData This parameter holds the data that will be transferred to the backend.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const createLesson = async (lessonData, courseId) => {
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lectures`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      }
    );

    if (response.message !== "created") {
      throw new Error("Error creating lesson");
    }
    return response;
  } catch (error) {
    console.error("Error in creating lesson:", error);
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
export const updateLesson = async (lessonData, courseId, lessonId) => {
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lectures/${lessonId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lessonData),
      }
    );

    if (response.message !== "updated") {
      throw new Error("Error creating lesson");
    }
    return response;
  } catch (error) {
    console.error("Error in creating lesson:", error);
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
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lectures`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.message !== "findAll") {
      throw new Error("Error GET lesson");
    }
    return response;
  } catch (error) {
    console.error("Error in GET lesson:", error);
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
export const getLessonById = async (courseId, lessonId) => {
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lectures/${lessonId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.message !== "found") {
      throw new Error("Error GET course");
    }
    return response;
  } catch (error) {
    console.error("Error in GET course:", error);
    throw error;
  }
};

/**
 * this function for create QA
 * @param qaData This parameter holds the data that will be transferred to the backend.
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const createQA = async (qaData, courseId, lessonId) => {
  if (!isTokenValid()) {
    return;
  }
  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qaData),
      }
    );

    if (response.message !== "created") {
      throw new Error("Error creating lesson");
    }
    return response;
  } catch (error) {
    console.error("Error in creating lesson:", error);
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
export const updateQA = async (qaData, courseId, lessonId, qaId) => {
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions/${qaId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(qaData),
      }
    );

    if (response.message !== "updated") {
      throw new Error("Error creating lesson");
    }
    return response;
  } catch (error) {
    console.error("Error in creating lesson:", error);
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
export const findQA = async (courseId, lessonId, qaId) => {
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lecture/${lessonId}/questions/${qaId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.message !== "found") {
      throw new Error("Error found QA");
    }
    return response;
  } catch (error) {
    console.error("Error in found QA:", error);
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
export const updateOrderLesson = async (data, courseId) => {
  if (!isTokenValid()) {
    return;
  }

  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lectures/orders`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.message !== "updated") {
      throw new Error("Error creating order");
    }
    return response;
  } catch (error) {
    console.error("Error in creating order:", error);
    throw error;
  }
};

/**
 * this function for get Latest Course for user
 * @method isTokenValid To verify the current session
 * @returns data from backend
 */
export const getLatestCourses = async () => {
  if (!isTokenValid(false)) {
    return;
  }
  try {
    const response = await authFetch(`${API_BASE_URL}/user-courses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.message !== "findAll") {
      throw new Error("Error GET Latest Courses");
    }
    return response;
  } catch (error) {
    console.error("Error in GET Latest Courses:", error);
    throw error;
  }
};

/**
 * this function for get all courses
 * @returns data from backend
 */
export const getAllCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/status/APPROVED`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching courses");
    }

    const data = await response.json();
    if (data.message !== "findAll") {
      throw new Error("Error: Unexpected response format");
    }

    return data;
  } catch (error) {
    console.error("Error in GET courses:", error);
    throw error;
  }
};

/**
 * this function for get all lecture
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @returns data from backend
 */
export const getAllLectureForCourse = async (courseId) => {
  if (!isTokenValid()) {
    return;
  }
  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lectures`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.message !== "findAll") {
      throw new Error("Error GET Lecture");
    }
    return response;
  } catch (error) {
    console.error("Error in GET Lecture:", error);
    throw error;
  }
};

/**
 * this function for get all qustion
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @param lectureId this parameter for lecture id.
 * @returns data from backend
 */
export const getAllQustionForLecture = async (courseId, lectureId) => {
  if (!isTokenValid()) {
    return;
  }
  try {
    const response = await authFetch(
      `${API_BASE_URL}/course/${courseId}/lecture/${lectureId}/questions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.message !== "findAll") {
      throw new Error("Error GET Qustion");
    }
    return response;
  } catch (error) {
    console.error("Error in GET Qustion:", error);
    throw error;
  }
};

/**
 * this function for create user lecture
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @param lectureId this parameter for lecture id.
 */
export const createStartUserLectureInCourse = async (courseId, lectureId) => {
  if (!isTokenValid()) {
    return;
  }
  try {
    const response = await authFetch(
      `${API_BASE_URL}/user-lectures/course/${courseId}/start/${lectureId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 409) {
      throw new Error("Error Create Start In Lecture ");
    }
    return response;
  } catch (error) {
    console.error("Error Create Start In Lecture:", error);
    throw error;
  }
};

/**
 * this function for create user lecture
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @param lectureId this parameter for lecture id.
 */
export const updateFinishLectureInCourse = async (courseId, lectureId) => {
  if (!isTokenValid()) {
    return;
  }
  try {
    const response = await authFetch(
      `${API_BASE_URL}/user-lectures/course/${courseId}/finish/${lectureId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.message !== "updated") {
      throw new Error("Error Updated Finish Lecture In Course");
    }
    return response;
  } catch (error) {
    console.error("Error in Updated Finish Lecture In Course:", error);
    throw error;
  }
};

/**
 * this function for updated user lecture
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 */
export const createStartInCourse = async (courseId) => {
  if (!isTokenValid()) {
    return;
  }
  try {
    const response = await authFetch(
      `${API_BASE_URL}/user-courses/start/${courseId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 409) {
      throw new Error("Error Create Start In Course");
    }
    return response;
  } catch (error) {
    console.error("Error in Create Start In Course:", error);
    throw error;
  }
};

/**
 * this function for check answer
 * @method isTokenValid To verify the current session
 * @param courseId this parameter for course id.
 * @param lectureId this parameter for lecture id.
 * @param qustionId this parameter for qustion id.
 * @param answerIds this parameter for answare id checked.
 */
export const checkAnswer = async (
  courseId,
  lectureId,
  qustionId,
  answerIds
) => {
  if (!isTokenValid()) {
    return;
  }
  try {
    const response = await authFetch(
      `${API_BASE_URL}/user-lectures/course/${courseId}/answser/${lectureId}/question/${qustionId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerIds),
      }
    );

    if (response.mess !== "answered") {
      throw new Error("Error check answered");
    }
    return response;
  } catch (error) {
    console.error("Error in check answered:", error);
    throw error;
  }
};