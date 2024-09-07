import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  disabled,
}) => {
  const buttonClasses = `px-4 py-2 rounded-md font-medium text-white transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2`;

  let bgColor: string;
  switch (variant) {
    case 'primary':
      bgColor = 'bg-fittrack-primary hover:bg-fittrack-secondary';
      break;
    case 'secondary':
      bgColor = 'bg-fittrack-secondary hover:bg-fittrack-primary';
      break;
    case 'tertiary':
      bgColor = 'bg-fittrack-tertiary hover:bg-fittrack-secondary';
      break;
    default:
      bgColor = 'bg-fittrack-primary hover:bg-fittrack-secondary';
  }

  return (
    <button
      className={`${buttonClasses} ${bgColor} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;