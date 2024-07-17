export const checkEmailSyntax = (email) => {
  let regex = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/
  if (!regex.test(email)) {
    return false
  }
  return true
}
