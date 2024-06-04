import React from 'react';

type Props = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    values: {
      email: string;
      password: string;
      remember: boolean;
    };
    isSubmitting: boolean;
    onClickChangeAuthForm: () => void;
  };

const LoginForm  = () => {
    return (<>

    </>)
}

export default LoginForm;
