// src/components/layout/footer/Footer.tsx
import NavLinks from './navLinks'

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="px-6 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-gray-700 text-lg font-bold mb-4">About Us</h2>
            <p className="text-gray-600">
              We sell the best music and sound equipment for live performances
              and events.
            </p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-gray-700 text-lg font-bold mb-4">
              Quick Links
            </h2>
            <NavLinks />
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h2 className="text-gray-700 text-lg font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600">
              22 Street
              <br />
              City, State N2L 1H4
              <br />
              Email: info@bravely.com
              <br />
              Phone: (123) 456-7890
            </p>
          </div>
          {/* <div className="w-full md:w-1/4">
            <h2 className="text-gray-700 text-lg font-bold mb-4">Newsletter</h2>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Your email"
                className="mb-2 p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div> */}
        </div>
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          © 2023 bravely. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
