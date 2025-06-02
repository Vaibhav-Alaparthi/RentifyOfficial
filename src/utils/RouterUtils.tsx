import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

// This is a simple Link component that would be replaced with a real router
// in a production application
export const Link: React.FC<LinkProps> = ({ to, children, ...rest }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // In a real app, this would use history.push(to) or similar
    console.log(`Navigating to: ${to}`);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};