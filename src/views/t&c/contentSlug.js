import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const TcContentSlug = () => {
  const location = useLocation();

    return(
        <form>
        <div dangerouslySetInnerHTML={{ __html: location.state.description }} />
        <Link to="/t&c"><Button variant="primary">&laquo;back</Button></Link>
        </form>
    );
};

export default TcContentSlug;