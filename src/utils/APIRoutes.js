const host = "http://192.168.1.3:5000";

export const loginRoute = `${host}/v1/admin/auth/login`;
export const forgot_password_route = `${host}/v1/admin/auth/getotp`;
export const reset_password_route = `${host}/v1/admin/auth/resetpassword`;
export const add_footer_contact = `${host}/v1/admin/addFooter`;
export const get_footer_contact = `${host}/v1/admin/getFooter`;

export const home_logo_route=`${host}/v1/admin/home/addLogo`;
export const get_home_logo_route=`${host}/v1/admin/home/getLogo`;
export const delete_home_logo_route=`${host}/v1/admin/home/deleteLogo`;
export const change_logo_status_route=`${host}/v1/admin/home/updateLogoStatus`;
export const home_navbar_route=`${host}/v1/admin/home/createNavBar`;
export const get_home_navbar_route=`${host}/v1/admin/home/getNavBar`;
export const delete_home_navbar_route=`${host}/v1/admin/home/deleteNavBar`;
export const add_banner_route = `${host}/v1/admin/addbanner`;
export const get_banner_route = `${host}/v1/admin/getbanner`;
export const change_banner_status_route = `${host}/v1/admin/updateBannerStatus`;
export const delete_banner_route=`${host}/v1/admin/deleteImage`;
export const add_home_square_boxes_route=`${host}/v1/admin/home/createSquareBox`;
export const edit_home_square_boxes_route=`${host}/v1/admin/home/editSquareBox`;
export const change_square_boxes_status_route=`${host}/v1/admin/home/updateSquareBoxStatus`;
export const get_home_square_boxes_route=`${host}/v1/admin/home/getSquareBox`;
export const add_how_to_play_route=`${host}/v1/admin/home/createHowToPlay`;
export const get_how_to_play_route=`${host}/v1/admin/home/getHowToPlay`;
export const edit_how_to_play_route=`${host}/v1/admin/home/updateHowToPlayStatus`;
export const add_home_cms_route = `${host}/v1/admin/home/createContent`;
export const get_home_cms_route = `${host}/v1/admin/home/getContent`;
export const delete_home_cms_route = `${host}/v1/admin/home/deleteContent`;
export const edit_home_cms_route = `${host}/v1/admin/home/editContent`;
export const change_home_cms_status_route = `${host}/v1/admin/home/updateContentStatus`;
export const add_app_features_route = `${host}/v1/admin/home/addAppFeatures`;
export const get_app_features_route = `${host}/v1/admin/home/getAppFeatures`;
export const update_app_features_status = `${host}/v1/admin/home/updateAppFeaturesStatus`;
export const delete_app_features_status = `${host}/v1/admin/home/deleteAppFeatures`;
export const add_app_features_image = `${host}/v1/admin/home/addAppFeaturesImage`;
export const get_app_features_image = `${host}/v1/admin/home/getAppFeaturesImage`;
export const update_app_features_image_status = `${host}/v1/admin/home/updateAppFeaturesImageStatus`;
export const delete_app_features_image = `${host}/v1/admin/home/deleteAppFeaturesImage`;
export const add_faq_route = `${host}/v1/admin/home/addfaqs`;
export const get_faq_route = `${host}/v1/admin/home/getfaqs`;
export const change_faq_status_route = `${host}/v1/admin/home/updateFaqStatus`;
export const add_testimonial_route = `${host}/v1/admin/home/addTestimonial`;
export const get_testimonial_route = `${host}/v1/admin/home/getTestimonial`;
export const change_testimonial_status_route = `${host}/v1/admin/home/updateTestimonialStatus`;

export const add_about_us_banner_route = `${host}/v1/admin/aboutUs/addbanner`;
export const get_about_us_banner_route = `${host}/v1/admin/aboutUs/getbanner`;
export const change_about_us_banner_status_route = `${host}/v1/admin/aboutUs/updateBannerStatus`;
export const delete_about_us_banner_route=`${host}/v1/admin/aboutUs/deleteImage`;
export const add_about_us_center_logo = `${host}/v1/admin/aboutUs/addAppFeaturesImage`;
export const get_about_us_center_logo = `${host}/v1/admin/aboutUs/getAppFeaturesImage`;
export const update_about_us_center_logo = `${host}/v1/admin/aboutUs/updateAppFeaturesImageStatus`;
export const delete_about_us_center_logo = `${host}/v1/admin/aboutUs/deleteAppFeaturesImage`;
export const add_about_us_cms_route = `${host}/v1/admin/aboutUs/createContent`;
export const get_about_us_cms_route = `${host}/v1/admin/aboutUs/getContent`;
export const delete_about_us_cms_route = `${host}/v1/admin/aboutUs/deleteContent`;
export const edit_about_us_cms_route = `${host}/v1/admin/aboutUs/editContent`;
export const change_about_us_cms_status_route = `${host}/v1/admin/aboutUs/updateContentStatus`;
export const add_about_us_bottom_image = `${host}/v1/admin/aboutUs/addImage`;
export const get_about_us_bottom_image = `${host}/v1/admin/aboutUs/getImage`;
export const update_about_us_bottom_image = `${host}/v1/admin/aboutUs/updateImageStatus`;
export const delete_about_us_bottom_image = `${host}/v1/admin/aboutUs/deleteAboutUsBottomImage`;
export const add_indianT20League_banner = `${host}/v1/admin/indianT20League/addbanner`;
export const get_indianT20League_banner = `${host}/v1/admin/indianT20League/getbanner`;
export const delete_indianT20League_banner = `${host}/v1/admin/indianT20League/deleteBanner`;
export const update_status_indianT20League_banner = `${host}/v1/admin/indianT20League/updateBannerStatus`;
export const add_indianT20League_cms_route = `${host}/v1/admin/indianT20League/createContent`;
export const get_indianT20League_cms_route = `${host}/v1/admin/indianT20League/getContent`;
export const update_status_indianT20League_cms_route = `${host}/v1/admin/indianT20League/updateContentStatus`;
export const delete_indianT20League_cms_route = `${host}/v1/admin/indianT20League/deleteContent`;
export const edit_indianT20League_cms_route = `${host}/v1/admin/indianT20League/editContent`;
export const add_ndianT20League_square_boxes_route=`${host}/v1/admin/indianT20League/createSquareBox`;
export const edit_ndianT20League_square_boxes_route=`${host}/v1/admin/indianT20League/editSquareBox`;
export const change_ndianT20League_square_boxes_status=`${host}/v1/admin/indianT20League/updateSquareBoxStatus`;
export const get_ndianT20League_square_boxes_route=`${host}/v1/admin/indianT20League/getSquareBox`;
export const get_indianT20League_cms2_route = `${host}/v1/admin/indianT20League/getContentBySubType`;
export const add_teamDetails_route = `${host}/v1/admin/indianT20League/addIndianT20League`;
export const get_teamDetails_route = `${host}/v1/admin/indianT20League/getIndianT20League`;
export const update_status_indianT20League_teamDetails = `${host}/v1/admin/indianT20League/updateIndianT20LeagueStatus`;

export const add_download_banner = `${host}/v1/admin/download/addDownloadBanner`;
export const get_download_banner = `${host}/v1/admin/download/getDownloadBanner`;
export const update_status_download_banner = `${host}/v1/admin/download/updateDwonloadBannerStatus`;
export const delete_download_banner = `${host}/v1/admin/download/deleteDownloadBanner`;

export const add_privacyPolicy_cms_route = `${host}/v1/admin/privacy_policy/createContent`;
export const get_privacyPolicy_cms_route = `${host}/v1/admin/privacy_policy/getContent`;
export const update_privacyPolicy_cms_status_route = `${host}/v1/admin/privacy_policy/updateContentStatus`;
export const delete_privacyPolicy_cms_route = `${host}/v1/admin/privacy_policy/deleteContent`;
export const edit_privacyPolicy_cms_route = `${host}/v1/admin/privacy_policy/editContent`;

export const add_faqs = `${host}/v1/admin/faqs/addfaqs`;
export const get_faqs = `${host}/v1/admin/faqs/getfaqs`;
export const update_status_faqs = `${host}/v1/admin/faqs/updateFaqStatus`;
export const delete_faqs = `${host}/v1/admin/faqs/deleteFaqs`;

export const add_term_condition = `${host}/v1/admin/t&C/createTermsAndCondition`;
export const get_term_condition = `${host}/v1/admin/t&C/getTermsAndCondition`;
export const update_status_term_condition = `${host}/v1/admin/t&C/updateTermsAndCondition`;
export const delete_term_condition = `${host}/v1/admin/t&C/deleteTermsAndCondition`;
export const edit_term_condition = `${host}/v1/admin/t&C/editTermsAndCondition`;


export const add_how_to_play_carousel_route=`${host}/v1/admin/how-to-play/createHowToPlayCarousel`;
export const get_how_to_play_carousel_route=`${host}/v1/admin/how-to-play/getHowToPlayCarousel`;
export const add_how_to_play_content_route=`${host}/v1/admin/how-to-play/createContent`;
export const get_how_to_play_content_route=`${host}/v1/admin/how-to-play/getContent`;
export const delete_how_to_play_content_route=`${host}/v1/admin/how-to-play/deleteContent`
export const edit_how_to_play_content_route=`${host}/v1/admin/how-to-play/editContent`
export const update_how_to_play_content_status_route=`${host}/v1/admin/how-to-play/updateContentStatus`
export const add_how_to_play_table_route=`${host}/v1/admin/how-to-play/createTable`
export const get_how_to_play_table_route=`${host}/v1/admin/how-to-play/getTable`
export const update_how_to_play_table_status_route=`${host}/v1/admin/how-to-play/updateTableStatus`;
export const delete_how_to_play_table_route=`${host}/v1/admin/how-to-play/deleteTable`;
export const add_how_to_play_steps_route=`${host}/v1/admin/how-to-play/createSteps`;
export const get_how_to_play_steps_route=`${host}/v1/admin/how-to-play/getSteps`;
export const update_how_to_play_steps_route=`${host}/v1/admin/how-to-play/updateStepsStatus`;
export const delete_how_to_play_setsps_route=`${host}/v1/admin/how-to-play/deleteSteps`;
export const add_how_to_play_Trophy_route=`${host}/v1/admin/how-to-play/createTrophy`;
export const get_how_to_play_Trophy_route=`${host}/v1/admin/how-to-play/getTrophy`;


//Fantasy Cricket
export const add_Fantasy_Crikcet_route=`${host}/v1/admin/fantasy-cricket/createFanatasyCricket`
export const get_Fantasy_Cricket_route=`${host}/v1/admin/fantasy-cricket/getFanatasyCricket`
export const update_Fantasy_Cricket_status_route=`${host}/v1/admin/fantasy-cricket/updateStatus`
export const delete_Fantasy_Cricket_route=`${host}/v1/admin/fantasy-cricket/deleteContent`
 export const edit_Fantasy_Cricket_route=`${host}/v1/admin/fantasy-cricket/editContent`



 //Press Release
 export const add_press_release_route=`${host}/v1/admin/press-release/addPressRelease`
 export const get_press_release_route=`${host}/v1/admin/press-release/getPressRelease`
 export const update_press_release_route=`${host}/v1/admin/press-release/updateStatus`
export const delete_press_release_route=`${host}/v1/admin/press-release/deletePress`

//  router.post("/updateStatus", verify, updateStatus);
//router.delete("/deletePress", verify, deletePress);








