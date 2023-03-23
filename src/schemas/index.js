import * as Yup from "yup";

export const register_schema = Yup.object({
    username: Yup.string().min(2).max(25).required("This field is required"),
    email: Yup.string().email().required("This field is required"),
    password: Yup.string().min(6).required("This field is required"),
    confirm_password: Yup.string().required("This field is required").oneOf([Yup.ref("password"), null], "Password must match"),
}); 

export const login_schema = Yup.object({
    email: Yup.string().email().required("This field is required"),
    password: Yup.string().min(6).required("This field is required")
}); 

export const forgot_password_schema = Yup.object({
    email: Yup.string().email().required("This field is required")
}); 

export const reset_password_schema = Yup.object({
    otp: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required")
}); 

export const add_banner_schema = Yup.object({
    banner: Yup.string().required("This field is required"),
    banner_type: Yup.string().required("This field is required")
}); 