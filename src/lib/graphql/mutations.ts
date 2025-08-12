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
