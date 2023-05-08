import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const AboutUsContentSlug = () => {
  const location = useLocation();

    return(
        <form>
        <div dangerouslySetInnerHTML={{ __html: location.state.description }} />
        <Link to="/about-us"><Button variant="primary">&laquo;back</Button></Link>
        </form>
    );
};

export default AboutUsContentSlug;