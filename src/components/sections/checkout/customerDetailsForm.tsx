'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export interface CustomerDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2: string
  city: string
  province: string
  postalCode: string
  country: string
}

interface CustomerDetailsFormProps {
  onSubmit: (details: CustomerDetails) => void
  isLoading: boolean
}

export function CustomerDetailsForm({
  onSubmit,
  isLoading,
}: CustomerDetailsFormProps) {
  const [formData, setFormData] = useState<CustomerDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'Canada', // Default to Canada
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          name="phone"
          type="tel"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <Input
          name="address1"
          placeholder="Address Line 1"
          value={formData.address1}
          onChange={handleChange}
          required
        />

        <Input
          name="address2"
          placeholder="Address Line 2 (Optional)"
          value={formData.address2}
          onChange={handleChange}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <Input
            name="province"
            placeholder="Province"
            value={formData.province}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            name="postalCode"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />
          <Input
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Continue to Payment'}
        </Button>
      </form>
    </div>
  )
}
