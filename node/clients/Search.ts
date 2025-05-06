import {
    AppClient,
    InstanceOptions,
    IOContext,
    RequestConfig,
  } from '@vtex/api'
  import { stringify } from 'qs'
  
  const inflightKey = ({ baseURL, url, params, headers }: RequestConfig) => {
    return (
      baseURL! +
      url! +
      stringify(params, { arrayFormat: 'repeat', addQueryPrefix: true }) +
      `&segmentToken=${headers['x-vtex-segment']}`
    )
  }
  
  interface SearchPageTypeResponse {
    id: string
    pageType: string
    name: string
    url: string
    title: string | null
    metaTagDescription: string | null
  }

  export class Search extends AppClient {
    private basePath: string
  
    public constructor(ctx: IOContext, opts?: InstanceOptions) {
      super('vtex.catalog-api-proxy@0.x', ctx, {
        ...opts,
        headers: {
          ...(opts && opts.headers),
          vtexIdclientAutCookie: ctx.authToken
        },
      })
  
      this.basePath = ctx.sessionToken
        ? '/proxy/authenticated/catalog'
        : '/proxy/catalog'
    }
  
    public pageType = (path: string, query: string = '') => {
      const pageTypePath = encodeURI(path.startsWith('/') ? path.substr(1) : path)
  
      const pageTypeQuery = !query || query.startsWith('?') ? query : `?${query}`
  
      console.log(`PAGETYPEEE: \n/pub/portal/pagetype/${pageTypePath}${pageTypeQuery}`)
      return this.get<SearchPageTypeResponse>(
        `/pub/portal/pagetype/${pageTypePath}${pageTypeQuery}`,
        { metric: 'search-pagetype' }
      )
    }
  
    public brands = () =>
      this.get<Brand[]>('/pub/brand/list', { metric: 'search-brands' })
  
    public categories = (treeLevel: number) =>
      this.get<CategoryTreeResponse[]>(`/pub/category/tree/${treeLevel}/`, {
        metric: 'search-categories',
      })
  
    public category = (id: string | number) =>
      this.get<CategoryByIdResponse>(`/pub/category/${id}`, {
        metric: 'search-category',
      })
  
    public filtersInCategoryFromId = (id: string | number) =>
      this.get<FilterListTreeCategoryById[]>(
        `/pub/specification/field/listTreeByCategoryId/${id}`,
        {
          metric: 'search-listTreeByCategoryId',
        }
      )
  
    private get = <T = any>(url: string, config: RequestConfig = {}) => {
      config.params = {
        ...config.params,
      }
      config.inflightKey = inflightKey
  
      return this.http.get<T>(`${this.basePath}${url}`, config)
    }
  }
  