export interface OneBookInterface {
  id: string
  title: string
  key: string
  description: string
  covers: number[] // Typen Long i Java motsvarar number i TypeScript
  coverImageUrl: string
  subjects: string[]
}
