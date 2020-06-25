import { Link } from 'gatsby';
import React from 'react';
import { rhythm, scale } from '../../utils/typography';

interface Props {
  title: string;
}

const HeaderHome: React.FC<Props> = ({ title }) => {
  return (
    <h1
      style={{
        ...scale(1.5),
        marginBottom: rhythm(1.5),
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
    </h1>
  );
};

export default HeaderHome;
