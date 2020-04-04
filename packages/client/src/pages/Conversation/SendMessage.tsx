import React, { FormEvent, useRef } from 'react';
import { api } from '../../lib/API';
import { Message } from '../../lib/types';

export interface SendMessageProps {
  conversationId: string;
  onNewMessage: (message: Message) => void;
}

export const SendMessage: React.FC<SendMessageProps> = ({
  conversationId,
  onNewMessage
}) => {
  // https://reactjs.org/docs/hooks-reference.html#useref
  const input = useRef<HTMLInputElement>(null);

  const submit = async(e: FormEvent) => {
    e.preventDefault();
    // https://www.geeksforgeeks.org/why-use-question-mark-in-typescript-variable/
    // Question marks on TypeScript variable are used to mark that variable as an optional variable.
    // If we put the question mark when declaring a variable that variable becomes optional.
    // The optional parameters will have value as undefined when unused.

    // https://stackoverflow.com/questions/42273853/in-typescript-what-is-the-exclamation-mark-bang-operator-when-dereferenci
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    // A new ! post-fix expression operator may be used to assert that its operand is non-null and non-undefined in contexts 
    // where the type checker is unable to conclude that fact.
    const message = await api.createMessage(conversationId, input.current?.value!);
    // ! for preventing compiler to complain 'value' might not exist
    onNewMessage(message);
    input.current!.value = '';
  };

  return <form onSubmit={submit}>
    <input type="text" ref={input} />
  </form>;
};
