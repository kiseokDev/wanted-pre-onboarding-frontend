export function isErrorMessage(data: any): data is {message: string} {
  return typeof data.message === "string";
}

export function hasMessage(data: any): data is {message: string} {
  return !!data && typeof data.message === "string";
}
