export interface WordValue {
  key: string,
  value: string
}

export const getWordCloud = (cloudwordSlug: string) => (
  `http://localhost:3001/items${cloudwordSlug}`
)

// export const getPostDetailsUrl = (postSlug: string) => (
//   `http://localhost:3001/post-details/${postSlug}?_expand=category`
// )
export interface WordSetItemDTO {
  type: string,
  metadata: {},
  values: Array<{ key: string, value: string }>

}

export interface WordSetDTO {
  id: string,
  groupId: string,
  description: string,
  type: string,
  cardType: string,
  items: Array<WordSetItemDTO>
}

export interface WordSetParsed {
  entityId: string,
  entityConcept: string,
  entityTitle: string,
  count: number,
  cloudValue: Array<string | number>
}

export interface CloudWord {
  cloudValue: Array<string | number>,
  concept: string
}

// export const getWordCloud = async (): Promise<WordSetItemDTO[]> => {
//   const res = await fetch(getWordCloud1())
//   return res.json()
// }
