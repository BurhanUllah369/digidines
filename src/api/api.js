const BASE_URL = 'https://qrmenu-skytech-ab55aa4342a1.herokuapp.com'

export const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/api/auth/login`,
    REGISTER: `${BASE_URL}/api/auth/register`,
    VERIFY_OTP: `${BASE_URL}/api/auth/verify-otp`,
    GET_USER_DATA: `${BASE_URL}/api/get_current_user_name`
}