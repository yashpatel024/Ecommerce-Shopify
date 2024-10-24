export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                info@bravely.com
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Phone
              </h3>
              <p className="text-gray-600 dark:text-gray-300">(123) 456-7890</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Address
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                22 Street
                <br />
                Toronto, Ontario N2L 1H4
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
