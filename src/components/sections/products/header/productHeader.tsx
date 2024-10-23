interface ProductHeaderProps {
  totalProducts: number
  onSortChange: (value: string) => void
}

export default function ProductHeader({
  totalProducts,
  onSortChange,
}: ProductHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-900">
        All Products ({totalProducts})
      </h1>
      <select
        onChange={(e) => onSortChange(e.target.value)}
        className="border rounded-md px-3 py-2 text-sm"
      >
        <option value="newest">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name">Name</option>
      </select>
    </div>
  )
}
