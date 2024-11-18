export const ENDPOINTS = {
  Data: {
    Badges: '/api/v1/data/badges',
    RetrieveUserData: '/api/v1/retrieveuserdata'
  },
  Assets: {
    Badges: {
      Icon: '/images/badges'
    }
  },
  Forms: {
    Login: '/api/v1/login',
    Register: '/api/v1/register',
    AddGoal: '/api/v1/addgoal',
    AddExercise: '/api/v1/exerciselog'
  }
}

export enum ErrorCodes {
  UNKNOWN = 0,
  NOT_LOGGED_IN = 1,
  NO_ACCESS = 2
}

export const AUTH_HEADER = 'authentication'