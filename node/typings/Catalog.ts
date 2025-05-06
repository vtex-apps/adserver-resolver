interface QueryArgs {
  query: string
  map?: string
  selectedFacets?: SelectedFacet[]
}

interface Brand {
  id: string
  name: string
  isActive: boolean
  title: string | null
  metaTagDescription: string | null
  imageUrl: string | null
}

interface CategoryTreeResponse {
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: CategoryTreeResponse[]
  Title: string
  MetaTagDescription: string
}

interface CategoryByIdResponse {
  parentId: number | null
  GlobalCategoryId: number
  GlobalCategoryName: string
  position: number
  slug: string
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: null
  Title: string
  MetaTagDescription: string
}
