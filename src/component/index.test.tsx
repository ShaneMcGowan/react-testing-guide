import { describe, it, vi } from 'vitest';
import React from 'react';
import { fireEvent, screen, render } from '@testing-library/react';
import { faker } from '@faker-js/faker';
import { ReactProps } from '../helpers';
import UserDetails from '.';
import { userFactory } from '../factories/userFactory';
import { addressFactory } from '../factories/addressFactory';
import userService from '../services/userService';

const mockOnClick = vi.fn();

// This is how to mock only a specific function in a service
// This needs to be delcared here as it will be hoisted to this level anyway if you declare it in the test suite
// meaning you can only declare it once like this
vi.mock('../services/userService', async (importOriginal) => {
  const mod = (await importOriginal()) as typeof userService;
  return {
    default: {
      ...mod,
      getUserEmail: vi.fn((value) => `${value} received`), // here we are overriding the getUserEmail function
    },
  };
});

const SELECTORS = {
  getUserId: () => screen.getByTestId('user-id'),
  getUserName: () => screen.getByTestId('user-full-name'),
  queryUserAddress: () => screen.queryByTestId('user-address'),
};

type Props = ReactProps<typeof UserDetails>;

const DEFAULT_PROPS: Props = {
  user: userFactory.make(),
  onClick: mockOnClick,
};

const renderHelper = (partialProps: Partial<Props> = {}) => {
  const props: Props = {
    ...DEFAULT_PROPS,
    ...partialProps,
  };

  return render(<UserDetails {...props} />);
};

describe('UserDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('displaying info', () => {
    it('renders the user id', () => {
      const user = userFactory.userId(faker.string.uuid()).make();

      renderHelper({
        user,
      });

      expect(SELECTORS.getUserId()).toBeInTheDocument();
      expect(SELECTORS.getUserId()).toHaveTextContent(user.id);
    });

    it('renders the user full name', () => {
      const user = userFactory.firstName('John').lastName('Smith').make();

      renderHelper({
        user,
      });

      expect(SELECTORS.getUserName()).toBeInTheDocument();
      expect(SELECTORS.getUserName()).toHaveTextContent(user.fullName);
    });

    it('renders the user address if they have an address', () => {
      const address = addressFactory.build();
      const user = userFactory.address(address).make();

      renderHelper({
        user,
      });

      expect(SELECTORS.queryUserAddress()).toBeInTheDocument();
      expect(SELECTORS.queryUserAddress()).toHaveTextContent(
        user.address!.fullAddress,
      );
    });

    it('does not render the user address if they have not provided an address', () => {
      const user = userFactory.address(null).make();

      renderHelper({
        user,
      });

      expect(SELECTORS.queryUserAddress()).not.toBeInTheDocument();
    });
  });

  describe('onClick', () => {
    it('renders the user id', () => {
      const user = userFactory.userId('test').make();

      // here we are mocking the getUserEmail function to return a specific value for this test
      // otherwise it would return the default mocked value
      vi.mocked(userService.getUserEmail).mockReturnValue(
        `${user.id}@mock.test`,
      );

      renderHelper({
        user,
      });

      fireEvent.click(SELECTORS.getUserId());
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith('test@mock.test');
    });
  });
});
