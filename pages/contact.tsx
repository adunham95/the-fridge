import React, { useState } from 'react';
import { Button, EButtonStyle } from '../components/StatelessInput/Button';
import { Input } from '../components/StatelessInput/Input';

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({
      name,
      message,
    });
  }

  if (process.env.NODE_ENV !== 'development') {
    return (
      <div className="mx-auto max-w-[300px]">
        <h1>Construction</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[300px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <h1 className="w-full text-lg pb-1 text-center">Contact The Fridge</h1>
      <form onSubmit={onSubmit}>
        <Input
          id="contactName"
          placeholder="Name"
          value={name}
          onChange={setName}
        />
        <Input
          containerClass="pt-1"
          id="contactMessage"
          placeholder="Message"
          value={message}
          onChange={setMessage}
          type="textarea"
        />
        <Button
          type="submit"
          size="sm"
          buttonStyle={EButtonStyle.SUCCESS}
          className="mt-1 w-full"
          disabled
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Contact;
