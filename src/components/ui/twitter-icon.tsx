import React from 'react';

interface TwitterIconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const TwitterIcon: React.FC<TwitterIconProps> = ({
  className = '',
  size = 24,
  color = 'currentColor',
}) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      style={{ color }}
    >
      <title>Twitter</title>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  );
};
