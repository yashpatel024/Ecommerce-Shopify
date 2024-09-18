import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The product you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="bg-primary-typography hover:bg-secondary-typography text-light-typography font-bold py-2 px-4 rounded transition duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  )
}
