import React from 'react';
import Layout from '../components/layout';

const AboutPage = ({ location }) => {
  return (
    <Layout location={location} title="About Me">
      <h2>Hi, I'm Chris Colborne.</h2>
      <p>
        I'm a Web Developer from Brisbane, Australia. I specialise in building
        custom web applications, primarily with PHP and JavaScript.
      </p>
      <p>
        I'm also a father to a beautiful 6 year old daughter, and husband to a
        crazy Hungarian.
      </p>

      <p>
        I post here about whatever occupies my mind, but it will be mostly tech.
      </p>

      <p>
        You can find me on Twitter, Facebook, LinkedIn and GitHub. Or feel free
        to drop me an email at chris (at) chriscolborne.com.
      </p>
    </Layout>
  );
};

export default AboutPage;
