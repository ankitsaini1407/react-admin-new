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



export const add_faq_schema = Yup.object({
    ques: Yup.string().required("This field is required"),
    type: Yup.string().required("This field is required"),
    subType: Yup.string().required("This field is required")
});



export const home_cms_schema = Yup.object({
    title: Yup.string().required("This field is required"),
});

export const add_footer_contact_schema = Yup.object({
    sub_type: Yup.string().required("This field is required"),
    address: Yup.string().required("This field is required"),
    email: Yup.string().email().required("This field is required"),
    phone: Yup.string().required("This field is required").matches(/^[0-9]+$/, "Must be only digits").min(10, 'Must be minimum 10 digits').max(11, 'Must be maximum 11 digits')
});

export const footer_sm_schema = Yup.object({
    image: Yup.mixed().required("This field is required"),
    name: Yup.string().required("This field is required"),
    hyper_link: Yup.string().required("This field is required"),
});

export const footer_payment_schema = Yup.object({
    image: Yup.mixed().required("This field is required"),
    name: Yup.string().required("This field is required"),
    link: Yup.string().required("This field is required"),
});

export const home_logo = Yup.object({
    logo: Yup.mixed().required("This field is required"),
    url: Yup.string().required("This field is required")
});

export const home_navbar = Yup.object({
    order: Yup.number().required("This field is required"),
    name: Yup.string().required("This field is required"),
    title: Yup.string().required("This field is required")

});

export const add_banner_schema = Yup.object({
    image: Yup.mixed().required("This field is required")
});

export const home_square_boxes = Yup.object({
    image: Yup.mixed().required("This field is required"),
    title: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required")
});

export const how_to_play = Yup.object({
    image: Yup.mixed().required("This field is required"),
    order: Yup.number().required("This field is required"),
    title: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required")
});

export const how_to_play_steps = Yup.object({
    order: Yup.number().required("This field is required"),
    title: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required")
});

export const home_edit_square_boxes = Yup.object({
    title: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required")
});

export const app_features = Yup.object({
    logo: Yup.mixed().required("This field is required"),
    title: Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required")
});

export const app_features_center_image = Yup.object({
    image: Yup.mixed().required("This field is required")
});

export const add_home_testimonoal_schema = Yup.object({
    image: Yup.mixed().required("This field is required"),
    amount: Yup.string().required("This field is required"),
    quote: Yup.string().required("This field is required")
});

export const about_us_bottom = Yup.object({
    image: Yup.mixed().required("This field is required"),
    subType: Yup.string().required("This field is required")
});

export const add_team_details_schema = Yup.object({
    player_logo: Yup.mixed().required("This field is required"),
    team_logo: Yup.mixed().required("This field is required"),
    new_players: Yup.string().required("This field is required"),
    captain_name: Yup.string().required("This field is required"),
    team_name: Yup.string().required("This field is required"),
    coach_name: Yup.string().required("This field is required"),
    winning_titles: Yup.string().required("This field is required"),
    color_1: Yup.string().required("This field is required"),
    color_2: Yup.string().required("This field is required"),
    color_3: Yup.string().required("This field is required"),

});

export const tc_schema = Yup.object({
    type: Yup.string().required("This field is required"),
    subType: Yup.string().required("This field is required"),
    title: Yup.string().required("This field is required")
});

export const how_to_play_table = Yup.object({
    playerType: Yup.string().required("This field is required"),
    Min: Yup.number().required("This field is required"),
    Max: Yup.number().required("This field is required")
});

export const how_to_play_page_steps = Yup.object({
    image: Yup.mixed().required("This field is required"),
    vrline:Yup.mixed().required("This field is required"),
    title: Yup.string().required("This field is required"),
    // description: Yup.string().required("This field is required"),
    type: Yup.string().required("This field is required"),
    subType: Yup.string().required("This field is required"),
});

export const how_to_play_Trophy_steps = Yup.object({
    image: Yup.mixed().required("This field is required"),
    transferMoney:Yup.mixed().required("This field is required"),
    title: Yup.string().required("This field is required"),
    verify: Yup.string().required("This field is required"),
});

export const fantasy_cricket_add_schema=Yup.object({
    type: Yup.string().required("This field is required"),
});

export const press_relese=Yup.object({
    image: Yup.mixed().required("This field is required"),
    title:Yup.string().required("This field is required"),
    description: Yup.string().required("This field is required"),
    url:Yup.string().required("This field is required")
});

export const find_out_more=Yup.object({   
    heading:Yup.string().required("This field is required"),
    path: Yup.string().required("This field is required"),
});

export const sticky_buttons = Yup.object({
    image: Yup.mixed().required("This field is required"),
    link: Yup.string().required("This field is required"),
});