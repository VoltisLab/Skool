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

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $bio: String
    $country: String
    $dob: Date
    $firstName: String
    $gender: GenderEnum
    $hideFromSearchEngines: Boolean
    $lastName: String
    $location: LocationInputType
    $profilePicture: ProfilePictureInputType
    $socialLinks: SocialLinkInputType
  ) {
    updateUser(
      bio: $bio
      country: $country
      dob: $dob
      firstName: $firstName
      gender: $gender
      hideFromSearchEngines: $hideFromSearchEngines
      lastName: $lastName
      profilePicture: $profilePicture
      socialLinks: $socialLinks
      location: $location
    ) {
      message
      restToken
      token
    }
  }
`;
export const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFile($files: [Upload]!, $filetype: FileTypeEnum!) {
    upload(files: $files, filetype: $filetype) {
      baseUrl
      data
      success
    }
  }
`;
