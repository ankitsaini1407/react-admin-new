import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const GuidelinesContentSlug = () => {
  const location = useLocation();
console.log("1111")
    return(
        <form>
        <div dangerouslySetInnerHTML={{ __html: location.state.description }} />
        <Link to="/setting"><Button variant="primary">&laquo;back</Button></Link>
        </form>
    );
};

export default GuidelinesContentSlug;