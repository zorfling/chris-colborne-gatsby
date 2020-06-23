import React from 'react';
import { Link } from 'gatsby';
import { rhythm, scale } from '../../utils/typography';

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
          textDecoration: `none`,
          color: `inherit`,
        }}
        to="/"
      >
        {title}
      </Link>
    </h3>
  );
};

export default HeaderInner;
