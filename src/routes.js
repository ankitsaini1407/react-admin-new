import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
import AddBanners from './views/banners/AddBanners';
import Banners from './views/banners/Banners';
import AddFaq from './views/faq/AddFaq';
import AllFaq from './views/faq/AllFaq';
import AddTestimonial from './views/testimonial/AddTestimonial';
import Testimonial from './views/testimonial/Testimonial';
import AddCms from './views/cms/AddCms';
import AllCms from './views/cms/AllCms';
import ContentSlug from './views/cms/contentSlug';
import EditCms from './views/cms/Edit';
import Footer from './views/footer/Footer';
import ContactUs from './views/footer/ContactUs';
import FooterSocialMedia from './views/footer/SocialMedia';
import FooterPaymentPartners from './views/footer/PaymentPartner';

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
  { path: '/cms/:slug', element: ContentSlug },
  { path: '/cms/edit/:id', name: 'CMS / Edit-Cms', element: EditCms },
  { path: '/footer', name: 'Footer', element: Footer },
  { path: '/footer/contact-us', name: 'Footer / Contact Us', element: ContactUs },
  { path: '/footer/social-media-link', name: 'Footer / Social Media Link', element: FooterSocialMedia },
  { path: '/footer/payment-partners', name: 'Footer / Payment Partners', element: FooterPaymentPartners },
];

export default routes;
