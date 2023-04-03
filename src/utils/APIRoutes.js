const host = "http://192.168.1.27:5000";

export const loginRoute = `${host}/v1/admin/auth/login`;
export const forgot_password_route = `${host}/v1/admin/auth/getotp`;
export const reset_password_route = `${host}/v1/admin/auth/resetpassword`;
export const add_banner_route = `${host}/v1/admin/addbanner`;
export const get_banner_route = `${host}/v1/admin/getbanner`;
export const add_faq_route = `${host}/v1/admin/addfaqs`;
export const get_faq_route = `${host}/v1/admin/getfaqs`;
export const add_testimonial_route = `${host}/v1/admin/addTestimonial`;
export const get_testimonial_route = `${host}/v1/admin/getTestimonial`;
export const add_cms_route = `${host}/v1/admin/createContent`;
export const get_cms_route = `${host}/v1/admin/getContent`;
export const change_banner_status_route = `${host}/v1/admin/updateBannerStatus`;
export const change_faq_status_route = `${host}/v1/admin/updateFaqStatus`;
export const change_testimonial_status_route = `${host}/v1/admin/updateTestimonialStatus`;
export const change_cms_status_route = `${host}/v1/admin/updateContentStatus`;
export const delete_cms_route = `${host}/v1/admin/deleteContent`;