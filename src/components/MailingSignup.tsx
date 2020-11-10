import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

type Status = 'success' | 'error';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f9fafb;
  border-radius: 4px;
  border: 1px solid #e3e3e3;
  position: relative;
  overflow: hidden;
  margin: 60px auto;
  max-width: 620px;
  padding: 40px;
`;

const Title = styled.h3`
  margin-top: 0px;
`;

const Body = styled.p`
  margin-top: 0px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 15px;
  font-family: sans-serif;
  margin-bottom: 0px;
`;

const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
`;

const Button = styled.button`
  color: #ffffff;
  background-color: #1677be;
  border-radius: 4px;

  display: inline-block;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0;
  text-decoration: none;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out, transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:hover,
  &:focus {
    background: #11598d;
  }

  &:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
  }

  &:active {
    transform: scale(0.99);
  }
`;

const Success = styled.div`
  color: #105f00;
  margin-bottom: 2rem;
`;

const Error = styled.div`
  color: #a50000;
  margin-bottom: 2rem;
`;

const FinePrint = styled.div`
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const trackSignup = () => {
  trackCustomEvent({
    category: 'MailingSignup',
    action: 'Click',
    label: document.location.href,
  });
};

const MailingSignup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<Status>();

  const baseURL = 'https://app.convertkit.com/forms/1803020/subscriptions';

  const handleSubmit = useCallback<
    (event: React.FormEvent<HTMLFormElement>) => void
  >(
    async event => {
      event.preventDefault();
      trackSignup();

      const formData = new FormData();
      formData.append('fields[first_name]', name);
      formData.append('email_address', email);

      try {
        const res = await fetch(baseURL, {
          method: 'post',
          body: formData,
          referrerPolicy: 'no-referrer-when-downgrade',
          referrer: document.location.href,
          headers: {
            accept: 'application/json',
          },
        });
        setEmail('');
        setName('');
        const json = await res.json();
        if (json.status === 'success') {
          setStatus('success');
          return;
        }
      } catch (err) {
        setStatus('error');
      }
    },
    [email, name]
  );

  return (
    <Container>
      <Title>Stay up to date!</Title>
      <Body>Subscribe to get my latest articles by email.</Body>

      {status === 'success' && (
        <Success>
          Success! Now check your email to confirm your subscription.
        </Success>
      )}
      {status === 'error' && (
        <Error>Oops, Something went wrong! please try again.</Error>
      )}

      <Form action={baseURL} method="post" onSubmit={handleSubmit}>
        <Input
          aria-label="First Name"
          name="fields[first_name]"
          placeholder="First Name"
          type="text"
          onChange={e => setName(e.target.value)}
          value={name}
        />

        <Input
          type="email"
          name="email_address"
          placeholder="Email address"
          onChange={e => setEmail(e.target.value)}
          value={email}
          required
        />

        <Button type="submit">Subscribe</Button>
      </Form>
      <FinePrint>I'll never send you spam. Unsubscribe at any time.</FinePrint>
    </Container>
  );
};

export default MailingSignup;
