import React from 'react';
import { Link } from 'gatsby';

const HeaderInner = ({ title }) => {
  return (
    <h3
      style={{
        fontFamily: `Montserrat, sans-serif`,
        marginTop: 0,
      }}
    >
      <Link
        style={{
          boxShadow: `none`,
          color: `inherit`,
        }}
        to={`/`}
      >
        {title}
      </Link>
    </h3>
  );
};

export default HeaderInner;
