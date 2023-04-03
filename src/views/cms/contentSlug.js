import React from "react";
import { useLocation } from 'react-router-dom';

const ContentSlug = () => {
  const location = useLocation();

    return(
        <form>
        <div dangerouslySetInnerHTML={{ __html: location.state.description }} />
        </form>
    );
};

export default ContentSlug;