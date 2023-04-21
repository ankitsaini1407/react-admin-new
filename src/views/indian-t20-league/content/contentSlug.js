import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const IndianT20LeagueContentSlug = () => {
  const location = useLocation();

    return(
        <form>
        <div dangerouslySetInnerHTML={{ __html: location.state.description }} />
        <Link to="/indian-t20-league"><Button variant="primary">&laquo;back</Button></Link>
        </form>
    );
};

export default IndianT20LeagueContentSlug;