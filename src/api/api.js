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
    UPDATE_RESTAURANT_DATA: `${BASE_URL}/api/restaurants/`,
    MENU_LIST: `${BASE_URL}/api/list-menu/`,
    CREATE_MENU: `${BASE_URL}/api/create-menu/`,
    DELETE_MENU: `${BASE_URL}/api/delete-menu/`,
    UPDATE_MENU: `${BASE_URL}/api/update-menu/`,
    DELETE_MENU_ITEM: `${BASE_URL}/api/delete-menu-item/`,
    CREATE_MENU_ITEM: `${BASE_URL}/api/create-menu-item/`,
    UPDATE_MENU_ITEM: `${BASE_URL}/api/update-menu-item/4/`,
    GET_ADDONS: `${BASE_URL}/api/addons/`,
    DELETE_ADDON: `${BASE_URL}/api/add-ons/delete/`,
    ADD_ADDON: `${BASE_URL}/api/add-ons/create/`,
    EDIT_ADDON: `${BASE_URL}/api/add-ons/update/`,
    GET_COUPONS: `${BASE_URL}/api/coupons/?restaurant_id=`,
    DELETE_COUPON: `${BASE_URL}/api/coupons/`,
    ADD_COUPON: `${BASE_URL}/api/restaurants/`
}