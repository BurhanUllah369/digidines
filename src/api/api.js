import { useRestaurantsPathsContext } from "../context/restaurantsPathsContext"

const BASE_URL = 'https://qrmenu-skytech-ab55aa4342a1.herokuapp.com'

export const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/register`,
    VERIFY_OTP: `${BASE_URL}/api/auth/verify-otp`,
    GET_USER_DATA: `${BASE_URL}/api/get_user_data`,
    GET_CURRENT_USER: `${BASE_URL}/api/get_current_user_name`, 
    CONTACT: `${BASE_URL}/api/contact/`,
    RESTAURANTS: `${BASE_URL}/api/my-restaurants/`,
    CREATE_RESTAURANT: `${BASE_URL}/api/create-restaurant/`,
    GET_SINGLE_RESTAURANT: `${BASE_URL}/api/my-restaurants/`,
    GET_RESTAURANT_BY_NAME: `${BASE_URL}/r/`,
    UPDATE_RESTAURANT_DATA: `${BASE_URL}/api/restaurants/`
}