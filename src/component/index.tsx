import React from 'react';

import { User } from '../models/user';
import userService from '../services/userService';

type Props = {
  user: User;
  onClick: (value: string) => void;
};

const UserDetails = ({ user, onClick }: Props) => {
  const handleClick = () => {
    const email = userService.getUserEmail(user.id);
    onClick(email);
  };

  return (
    <div className="user-details">
      <h2>User Details</h2>
      <p>
        <strong>ID:</strong>
        <span onClick={() => handleClick()} data-testid="user-id">
          {user.id}
        </span>
      </p>
      <p>
        <strong>Name</strong>
        <span data-testid="user-full-name">{user.fullName}</span>
      </p>
      {user.address && (
        <p>
          <strong>Address</strong>
          <span data-testid="user-address">{user.address.fullAddress}</span>
        </p>
      )}
    </div>
  );
};

export default UserDetails;
