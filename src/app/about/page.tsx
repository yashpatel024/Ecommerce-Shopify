export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">About</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Bravely is a Shopify app that allows you to migrate your WooCommerce
            store to Shopify.
          </p>

          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
            <li>Skateboard decks</li>
            <li>Skateboard wheels</li>
            <li>Skateboard bearings</li>
            <li>Skateboard trucks</li>
            <li>Skateboard hardware</li>
          </ul>

          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="space-y-2 text-gray-600 dark:text-gray-300">
            <p>Email: info@bravely.com</p>
            <p>Phone: (123) 456-7890</p>
            <p>Address: 22 Street, Toronto, Ontario N2L 1H4</p>
          </div>
        </div>
      </div>
    </div>
  )
}
