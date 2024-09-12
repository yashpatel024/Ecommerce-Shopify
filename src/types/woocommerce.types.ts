export interface WooCommerceProduct {
  id: number
  name: string
  date_created: string
  type: string
  status: string
  featured: boolean
  catalog_visibility: string
  description: string
  short_description: string
  sku: string
  price: string
  regular_price: string
  sale_price: string
  date_on_sale_from: string | null
  date_on_sale_to: string | null
  on_sale: boolean
  purchasable: boolean
  total_sales: number
  virtual: boolean
  downloadable: boolean
  downloads: any[]
  download_limit: number
  download_expiry: number
  external_url: string
  button_text: string
  tax_status: string
  tax_class: string
  manage_stock: boolean
  stock_quantity: number | null
  stock_status: string
  backorders: string
  backorders_allowed: boolean
  backordered: boolean
  sold_individually: boolean
  weight: string
  dimensions: {
    length: string
    width: string
    height: string
  }
  reviews_allowed: boolean
  average_rating: string
  rating_count: number
  related_ids: number[]
  upsell_ids: number[]
  cross_sell_ids: number[]
  parent_id: number
  purchase_note: string
  categories: {
    id: number
    name: string
    slug: string
  }[]
  tags: {
    id: number
    name: string
    slug: string
  }[]
  images: {
    id: number
    date_created: string
    date_created_gmt: string
    date_modified: string
    date_modified_gmt: string
    src: string
    name: string
    alt: string
  }[]
  attributes: {
    id: number
    name: string
    position: number
    visible: boolean
    variation: boolean
    options: string[]
  }[]
  default_attributes: {
    id: number
    name: string
    option: string
  }[]
  variations: number[]
  grouped_products: number[]
  menu_order: number
  meta_data: {
    id: number
    key: string
    value: string
  }
}
