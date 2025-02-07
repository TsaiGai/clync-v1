"use client"

import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function AddApartmentPopover({ onAddApartment }) {
  const [propertyName, setPropertyName] = useState("")
  const [floorPlanType, setFloorPlanType] = useState("")
  const [floorPlanName, setFloorPlanName] = useState("")
  const [specialRequest, setSpecialRequest] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddApartment({ propertyName, floorPlanType, floorPlanName, specialRequest })
    setPropertyName("")
    setFloorPlanType("")
    setFloorPlanName("")
    setSpecialRequest("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button>Add Apartment</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="propertyName">Property Name</Label>
            <Input id="propertyName" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floorPlanType">Floor Plan Type</Label>
            <Input
              id="floorPlanType"
              value={floorPlanType}
              onChange={(e) => setFloorPlanType(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="floorPlanName">Floor Plan Name (Optional)</Label>
            <Input id="floorPlanName" value={floorPlanName} onChange={(e) => setFloorPlanName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialRequest">Special Request (Optional)</Label>
            <Textarea id="specialRequest" value={specialRequest} onChange={(e) => setSpecialRequest(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Add Apartment
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  )
}
