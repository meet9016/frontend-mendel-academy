export const saveToken = (token: string) => {
  // const encrypted = encrypt(token)
  localStorage.setItem('auth_token', token)
}

export const getToken = (): string | null => {
  const encrypted = localStorage.getItem('auth_token')

  // return encrypted ? decrypt(encrypted) : null
  return encrypted
}

export const clearToken = () => {
  localStorage.removeItem('auth_token')
}

export const saveUserId = (token: string) => {
  // const encrypted = encrypt(token)
  localStorage.setItem('auth_id', token)
}

export const getAuthId = (): string | null => {
  const encrypted = localStorage.getItem('auth_id')

  // return encrypted ? decrypt(encrypted) : null
  return encrypted
}

export const clearAuthId = () => {
  localStorage.removeItem('auth_id')
}