import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
import EditCms from "./views/home/content/edit";
import Footer from "./views/footer/Footer";
import ContactUs from "./views/footer/ContactUs";
import FooterSocialMedia from "./views/footer/SocialMedia";
import FooterPaymentPartners from "./views/footer/PaymentPartner";
import FooterDisclaimer from './views/footer/Disclaimer'
import FindOutMore from './views/footer/findOutMore'
import Home from "./views/home/home";
import AddLogo from "./views/home/logo/add";
import AddNavbar from "./views/home/navbar/add";
import AddHomeBanners from "./views/home/banners/add";
import AddHomeSquareBoxes from "./views/home/square-boxes/add";
import AddHowToPlay from "./views/home/how-to-play/add";
import AddHowToPlaySteps from "./views/home/how-to-play/steps";
import EditHomeSquareBoxes from "./views/home/square-boxes/edit";
import AddHomeCms from "./views/home/content/add";
import ContentSlug from "./views/home/content/contentSlug";
import AddAppFeatures from "./views/home/app-features/add";
import AddHomeFaq from "./views/home/faq/add";
import AddHomeTestimonial from "./views/home/testimonial/add";
import AboutUs from "./views/about-us/aboutUs";
import AddAboutUsBanner from "./views/about-us/banner/add";
import AddAboutUsCms from "./views/about-us/content/add";
import EditAboutUsCms from "./views/about-us/content/edit";
import AboutUsContentSlug from "./views/about-us/content/contentSlug";
import IndianT20League from "./views/indian-t20-league/indian-t20-league";
import AddIndianT20LeagueBanner from "./views/indian-t20-league/banner/add";
import AddIndianT20LeagueCms from "./views/indian-t20-league/content/add";
import IndianT20LeagueContentSlug from "./views/indian-t20-league/content/contentSlug";
import EditIndianT20LeagueCms from "./views/indian-t20-league/content/edit";
import AddIndianT20LeagueSquareBoxes from "./views/indian-t20-league/square-box/add";
import EditIndianT20LeagueSquareBoxes from "./views/indian-t20-league/square-box/edit";
import AddIndianT20LeagueCms2 from "./views/indian-t20-league/teams-detail/add";
import EditIndianT20LeagueCms2 from "./views/indian-t20-league/teams-detail/edit";
import IndianT20LeagueContentSlug2 from "./views/indian-t20-league/teams-detail/contentSlug";
import AddIndianT20LeagueTestimonial from "./views/indian-t20-league/winner/add";
import AddTeamDetails from "./views/indian-t20-league/teams-detail/addDetails";

import Download from "./views/download/download";

import PrivacyPolicyCms from "./views/privacy-policy/table";
import AddPrivacyPolicyCms from "./views/privacy-policy/add";
import EditPrivacyPolicyCms from "./views/privacy-policy/edit";
import PrivacyPolicyContentSlug from "./views/privacy-policy/contentSlug";

import AddFaq from "./views/faqs/add";
import Faqs from "./views/faqs/table";

import AddTCCms from "./views/t&c/add";
import TcCms from "./views/t&c/table";
import TcContentSlug from "./views/t&c/contentSlug";
import EditTc from "./views/t&c/edit";

const routes = [
  { path: "/dashboard", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/footer", name: "Footer", element: Footer },
  {
    path: "/footer/contact-us",
    name: "Footer / Contact Us",
    element: ContactUs,
  },
  {
    path: "/footer/social-media-link",
    name: "Footer / Social Media Link",
    element: FooterSocialMedia,
  },
  {
    path: "/footer/payment-partners",
    name: "Footer / Payment Partners",
    element: FooterPaymentPartners,
  },
  {
    path: "/footer/Disclaimer",
    name: "Footer/Disclaimer",
    element: FooterDisclaimer,
  },
  {
    path: "/footer/find-out-more",
    name: "Footer/find-out-more",
    element: FindOutMore,
  },

  { path: "/home", name: "Home", element: Home },
  { path: "/home/add-logo", name: "Home / Add-Logo", element: AddLogo },
  { path: "/home/add-navbar", name: "Home / Add-Navbar", element: AddNavbar },
  {
    path: "/home/add-banners",
    name: "Home / Banners / Add-Banners",
    element: AddHomeBanners,
  },
  {
    path: "/home/add-SquareBoxes",
    name: "Home / Square-Boxes / Add",
    element: AddHomeSquareBoxes,
  },
  {
    path: "/home/add-HowToPlay",
    name: "Home / How-To-Play / Add",
    element: AddHowToPlay,
  },
  {
    path: "/home/add-HowToPlaySteps",
    name: "Home / How-To-Play / Add-Steps",
    element: AddHowToPlaySteps,
  },
  {
    path: "/home/squareBox/edit",
    name: "Home / Square-Box / Edit",
    element: EditHomeSquareBoxes,
  },
  { path: "/home/cms/add", name: "Home / Cms / Add", element: AddHomeCms },
  { path: "/home/cms/:slug", element: ContentSlug },
  { path: "/home/cms/edit/:id", name: "CMS / Edit-Cms", element: EditCms },
  {
    path: "/home/app-features/add",
    name: "Home / App-Features / Add",
    element: AddAppFeatures,
  },
  { path: "/home/faq/add", name: "Home / Faq / Add", element: AddHomeFaq },
  {
    path: "/home/testimonial/add",
    name: "Home / Testimonial / Add",
    element: AddHomeTestimonial,
  },
  { path: "/about-us", name: "About-Us", element: AboutUs },
  {
    path: "/about-us/banner/add",
    name: "About-Us / Banner / Add",
    element: AddAboutUsBanner,
  },
  {
    path: "/about-us/cms/add",
    name: "About-Us / Cms / Add",
    element: AddAboutUsCms,
  },
  {
    path: "/about-us/cms/edit/:id",
    name: "CMS / Edit-Cms",
    element: EditAboutUsCms,
  },
  { path: "/about-us/cms/:slug", element: AboutUsContentSlug },
  {
    path: "/indian-t20-league",
    name: "Indian-T20-League",
    element: IndianT20League,
  },
  {
    path: "/indian-t20-league/banner/add",
    name: "Indian-T20-League / Banner / Add",
    element: AddIndianT20LeagueBanner,
  },
  {
    path: "/indian-t20-league/content/add",
    name: "Indian-T20-League / Content / Add",
    element: AddIndianT20LeagueCms,
  },
  { path: "/indian-t20-league/cms/:slug", element: IndianT20LeagueContentSlug },
  {
    path: "/indian-t20-league/cms/edit/:id",
    name: "Indian-T20-League / Content / Edit",
    element: EditIndianT20LeagueCms,
  },
  {
    path: "/indian-t20-league/squareBox/add",
    name: "Indian-T20-League",
    element: AddIndianT20LeagueSquareBoxes,
  },
  {
    path: "/indian-t20-league/squareBox/edit",
    name: "Indian-T20-League",
    element: EditIndianT20LeagueSquareBoxes,
  },
  {
    path: "/indian-t20-league/content-2/add",
    name: "Indian-T20-League / Content / Add",
    element: AddIndianT20LeagueCms2,
  },
  {
    path: "/indian-t20-league/cms-2/edit/:id",
    name: "Indian-T20-League / Content / Edit",
    element: EditIndianT20LeagueCms2,
  },
  {
    path: "/indian-t20-league/cms-2/:slug",
    element: IndianT20LeagueContentSlug2,
  },
  {
    path: "/indian-t20-league/testimonial/add",
    name: "Indian-T20-League / Testimonial / Add",
    element: AddIndianT20LeagueTestimonial,
  },
  {
    path: "/indian-t20-league/team-details/add",
    name: "Indian-T20-League / Team-Details / Add",
    element: AddTeamDetails,
  },
  {
    path: "/download",
    name: "Download",
    element: Download,
  },
  {
    path: "/privacy-policy",
    name: "Privacy-Policy",
    element: PrivacyPolicyCms,
  },
  {
    path: "/t&c/add",
    name: "T&C / Add",
    element: AddTCCms,
  },
  {
    path: "/privacy-policy/add",
    name: "Privacy-Policy / Add",
    element: AddPrivacyPolicyCms,
  },
  {
    path: "/privacy-policy/edit/:id",
    name: "Privacy-Policy / Edit",
    element: EditPrivacyPolicyCms,
  },
  { path: "/privacy-policy/cms/:slug", element: PrivacyPolicyContentSlug },

  {
    path: "/faqs/add",
    name: "FAQ's / Add",
    element: AddFaq,
  },

  {
    path: "/faqs",
    name: "FAQ's",
    element: Faqs,
  },
  {
    path: "/t&c",
    name: "T&C",
    element: TcCms,
  },
  { path: "/t&c/cms/:slug", element: TcContentSlug },

  {
    path: "/t&c/edit/:id",
    name: "T&C / Edit",
    element: EditTc,
  },


  

];

export default routes;
