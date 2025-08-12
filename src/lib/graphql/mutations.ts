import { gql } from '@apollo/client';

export const SEND_VERIFICATION_EMAIL = gql`
  mutation SendVerificationEmail(
    $email: String!
    $isAccountVerification: Boolean
    $isLoginVerification: Boolean
  ) {
    sendVerificationEmail(
      email: $email
      isAccountVerification: $isAccountVerification
      isLoginVerification: $isLoginVerification
    ) {
      message
      success
    }
  }
`;

export const PASSWORD_RESET = gql`
  mutation PasswordReset($code: String!, $password: String!, $confirmPassword: String!) {
    passwordReset(code: $code, confirmPassword: $confirmPassword, password: $password) {
      message
    }
  }
`;
