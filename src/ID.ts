import randomstring from 'randomstring'

function generateID(): string {
  return randomstring.generate(7) 
}

export function generateTagID(): string {
  return "t" + generateID()
}

export function generateResourceID(): string {
  return "r" + generateID()
}
