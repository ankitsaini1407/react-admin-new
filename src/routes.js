import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
import AddBanners from './views/banners/AddBanners';
import AddFaq from './views/faq/AddFaq';
import AllFaq from './views/faq/AllFaq';
import AddTestimonial from './views/testimonial/AddTestimonial';
import Testimonial from './views/testimonial/Testimonial';
import AddCms from './views/cms/AddCms';
import AllCms from './views/cms/AllCms';
import EditCms from './views/home/content/edit';
import Footer from './views/footer/Footer';
import ContactUs from './views/footer/ContactUs';
import FooterSocialMedia from './views/footer/SocialMedia';
import FooterPaymentPartners from './views/footer/PaymentPartner';

import Home from './views/home/home';
import AddLogo from './views/home/logo/add';
import AddNavbar from './views/home/navbar/add';
import AddHomeBanners from './views/home/banners/add';
import Banners from './views/banners/Banners';
import AddHomeSquareBoxes from './views/home/square-boxes/add';
import AddHowToPlay from './views/home/how-to-play/add';
import AddHowToPlaySteps from './views/home/how-to-play/steps';
import EditHomeSquareBoxes from './views/home/square-boxes/edit';
import AddHomeCms from './views/home/content/add';
import ContentSlug from './views/home/content/contentSlug';
import AddAppFeatures from './views/home/app-features/add';
import AddHomeFaq from './views/home/faq/add';
import AddHomeTestimonial from './views/home/testimonial/add';
import AboutUs from './views/about-us/aboutUs';
import AddAboutUsBanner from './views/about-us/banner/add';
import AddAboutUsCms from './views/about-us/content/add';
import EditAboutUsCms from './views/about-us/content/edit';
import AboutUsContentSlug from './views/about-us/content/contentSlug';
import IndianT20League from './views/indian-t20-league/indian-t20-league';
import AddIndianT20LeagueBanner from './views/indian-t20-league/banner/add';
import AddIndianT20LeagueCms from './views/indian-t20-league/content/add';
import IndianT20LeagueContentSlug from './views/indian-t20-league/content/contentSlug';
import EditIndianT20LeagueCms from './views/indian-t20-league/content/edit';

const routes = [
  { path: '/dashboard', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/add-banners', name: 'Banners / Add-Banners', element: AddBanners },
  { path: '/banners', name: 'Banners / All-Banners', element: Banners },
  { path: '/add-faq', name: 'FAQ / Add-FAQ', element: AddFaq },
  { path: '/faq', name: 'FAQ / All-FAQ', element: AllFaq },
  { path: '/add-testimonial', name: 'Testimonial / Add-Testimonial', element: AddTestimonial },
  { path: '/testimonial', name: 'Testimonials', element: Testimonial },
  { path: '/add-cms', name: 'CMS / Add-Cms', element: AddCms },
  { path: '/cms', name: 'Cms', element: AllCms },
  { path: '/footer', name: 'Footer', element: Footer },
  { path: '/footer/contact-us', name: 'Footer / Contact Us', element: ContactUs },
  { path: '/footer/social-media-link', name: 'Footer / Social Media Link', element: FooterSocialMedia },
  { path: '/footer/payment-partners', name: 'Footer / Payment Partners', element: FooterPaymentPartners },
  
  { path: '/home', name: 'Home', element: Home },
  { path: '/home/add-logo', name: 'Home / Add-Logo', element: AddLogo },
  { path: '/home/add-navbar', name: 'Home / Add-Navbar', element: AddNavbar },
  { path: '/home/add-banners', name: 'Home / Banners / Add-Banners', element: AddHomeBanners },
  { path: '/home/add-SquareBoxes', name: 'Home / Square-Boxes / Add', element: AddHomeSquareBoxes },
  { path: '/home/add-HowToPlay', name: 'Home / How-To-Play / Add', element: AddHowToPlay },
  { path: '/home/add-HowToPlaySteps', name: 'Home / How-To-Play / Add-Steps', element: AddHowToPlaySteps },
  { path: '/home/squareBox/edit', name: 'Home / Square-Box / Edit', element: EditHomeSquareBoxes },
  { path: '/home/cms/add', name: 'Home / Cms / Add', element: AddHomeCms },
  { path: '/home/cms/:slug', element: ContentSlug },
  { path: '/home/cms/edit/:id', name: 'CMS / Edit-Cms', element: EditCms },
  { path: '/home/app-features/add', name: 'Home / App-Features / Add', element: AddAppFeatures },
  { path: '/home/faq/add', name: 'Home / Faq / Add', element: AddHomeFaq },
  { path: '/home/testimonial/add', name: 'Home / Testimonial / Add', element: AddHomeTestimonial },
  { path: '/about-us', name: 'About-Us', element: AboutUs },
  { path: '/about-us/banner/add', name: 'About-Us / Banner / Add', element: AddAboutUsBanner },
  { path: '/about-us/cms/add', name: 'About-Us / Cms / Add', element: AddAboutUsCms },
  { path: '/about-us/cms/edit/:id', name: 'CMS / Edit-Cms', element: EditAboutUsCms },
  { path: '/about-us/cms/:slug', element: AboutUsContentSlug },
  { path: '/indian-t20-league', name: 'Indian-T20-League', element: IndianT20League },
  { path: '/indian-t20-league/banner/add', name: 'Indian-T20-League / Banner / Add', element: AddIndianT20LeagueBanner },
  { path: '/indian-t20-league/content/add', name: 'Indian-T20-League / Content / Add', element: AddIndianT20LeagueCms },
  { path: '/ndian-t20-league/cms/:slug', element: IndianT20LeagueContentSlug },
  { path: '/indian-t20-league/banner/edit', name: 'Indian-T20-League / Banner / Edit', element: EditIndianT20LeagueCms },

];

export default routes;
