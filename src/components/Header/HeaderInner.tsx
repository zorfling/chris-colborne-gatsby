import { Link } from 'gatsby';
import React from 'react';

interface Props {
  title: string;
}

const HeaderInner: React.FC<Props> = ({ title }) => {
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
