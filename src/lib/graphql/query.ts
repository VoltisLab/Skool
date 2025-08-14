import { gql } from '@apollo/client'

export const VIEW_ME_QUERY = gql`
  query ViewMe {
    viewMe {
      bio
      dateJoined
      displayName
      dob
      email
      firstName
      fullName
      gender
      hideFromSearchEngines
      id
      isInstructor
      isVerified
      lastLogin
      lastName
      lastSeen
      profilePictureUrl
      socialLinks
      thumbnailUrl
      username
      location {
        latitude
        locationName
        longitude
      }
      phone {
        completed
        countryCode
        number
      }
    }
  }
`
