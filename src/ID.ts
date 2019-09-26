import randomstring from 'randomstring'

function generateID(): string {
  return randomstring.generate(7) 
}

export function generateTagID(tagIDs?: string[]): string {
  let id: string
  do {
   id = "t" + generateID()
  } while (tagIDs && tagIDs.includes(id))
  return id
}

export function generateResourceID(resourceIDs?: string[]): string {
  let id: string
  do {
   id = "r" + generateID()
  } while (resourceIDs && resourceIDs.includes(id))
  return id
}
