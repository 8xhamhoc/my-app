import React from 'react';

type Props = {
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
