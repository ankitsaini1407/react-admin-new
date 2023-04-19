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
];

export default routes;
