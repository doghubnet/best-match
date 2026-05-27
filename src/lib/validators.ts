export const emailValid = (email: string) => /.+@.+\..+/.test(email)
export const minLen = (value: string, len = 8) => value.trim().length >= len
