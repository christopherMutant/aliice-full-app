const ErrorMessages = {
  invalid_credentials_em:
    'The provided credentials are invalid. Please check and try again.',
  registration_email_conflict_vm:
    'Email already in use. Try another or log in. Forgot your password?  Try to Reset it.',
  email_required_em: 'Please provide your email address.',
  user_by_email_not_found_em:
    'The provided credentials are invalid. Please check and try again.',
  user_by_id_not_found_em: 'The user could not be found.',
  invalid_verification_code_em:
    'The verification code provided is invalid.',
  refresh_token_access_em:
    'Access denied. Please try again with proper authorization.',
  account_not_exists_em:
    "Account doesn't exist. Please sign up first before trying to sign in.",
  insufficient_role:
    'You do not have the access to perform this action.',

  user_not_exists_em: "User doesn't exist against the provided ID.",

  insufficient_permission:
    'You do not have the permission to perform this action.',

  profile_update_body_missing_em:
    'Please provide at least one parameter in the request body to update the profile.',
  invalid_profile_id_em:
    'Invalid User ID provided to update the profile.',
  verification_code_expired_em:
    'The verification code has expired. Please request a new one.',
  role_name_exist_em:
    'The role name already exist. Please use a different one. ',
  database_error: 'Database error',
  bucket_storage_error: 'Bucket storage error',
};

export const AppErrorMessages = {
  ...ErrorMessages,
  ...Object.keys(ErrorMessages).reduce((acc, key) => {
    const newAcc = { ...acc };

    if (
      typeof ErrorMessages[key] === 'string' &&
      ErrorMessages[key].charAt(0) === '_'
    ) {
      newAcc[key] =
        ErrorMessages[ErrorMessages[key].replace('_', '')] ||
        'Unknown error';
    }

    return newAcc;
  }, {}),
};
