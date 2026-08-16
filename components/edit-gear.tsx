"use client";

import { useActionState, useEffect, useState } from "react";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { gearEditAction } from "@/app/dashboard/provider/gear/_actions/gearAction";
import { toast } from "./ui/toast";

type GearCategory = {
  category: string;
};

type GearData = {
  id: string;
  name: string;
  brand: string;
  description: string;
  category?: GearCategory | null;
  availability: "AVAILABLE" | "UNAVAILABLE";
  stock: number;
  rentalPricePerDay: number;
  image?: string | null;
};

type GearEditProps = {
  data: GearData;
};

export default function GearEdit({ data }: GearEditProps) {
  const [gearData, setGearData] = useState<GearData>(data);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [state, action, pending] = useActionState(gearEditAction, null);

  useEffect(() => {
    setGearData(data);
    setImagePreview(null);
  }, [data]);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setGearData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setGearData((previous) => ({
      ...previous,
      category: {
        category: value,
      },
    }));
  };

  const handleAvailabilityChange = (value: string) => {
    setGearData((previous) => ({
      ...previous,
      availability: value as "AVAILABLE" | "UNAVAILABLE",
    }));
  };

  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setGearData((previous) => ({
      ...previous,
      stock: value === "" ? 0 : Number(value),
    }));
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setGearData((previous) => ({
      ...previous,
      rentalPricePerDay: value === "" ? 0 : Number(value),
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      toast.add({
        type: "error",
        description: "Please select a PNG, JPG, GIF or WEBP image.",
      });

      event.target.value = "";

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      toast.add({
        type: "success",
        description: state.message || "Gear updated successfully",
      });

      return;
    }

    toast.add({
      type: "error",
      description: state.message || "Gear update failed",
    });
  }, [state]);

  return (
    <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
      <Card>
        <CardHeader>
          <CardTitle>Edit Gear</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={action} className="space-y-8">
            <input type="hidden" name="gearId" value={gearData.id} />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Basic Information</h3>

                <p className="text-muted-foreground text-sm">
                  Update your gear details below.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Gear Name</Label>

                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter the gear name"
                    value={gearData.name}
                    onChange={handleInput}
                    disabled={pending}
                  />

                  {state?.errors?.name && (
                    <p className="text-sm text-red-500">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>

                  <Textarea
                    id="description"
                    name="description"
                    value={gearData.description}
                    onChange={handleInput}
                    placeholder="Write a description"
                    rows={5}
                    disabled={pending}
                  />

                  {state?.errors?.description && (
                    <p className="text-sm text-red-500">
                      {state.errors.description[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Gear Category</Label>

                  <Select
                    name="category"
                    value={gearData.category?.category ?? ""}
                    onValueChange={handleCategoryChange}
                    disabled={pending}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="cycling">Cycling</SelectItem>

                      <SelectItem value="camping">Camping</SelectItem>

                      <SelectItem value="fitness">Fitness</SelectItem>

                      <SelectItem value="sports">Sports</SelectItem>

                      <SelectItem value="water">Water</SelectItem>
                    </SelectContent>
                  </Select>

                  {state?.errors?.category && (
                    <p className="text-sm text-red-500">
                      {state.errors.category[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Availability</Label>

                  <RadioGroup
                    name="availability"
                    value={gearData.availability}
                    onValueChange={handleAvailabilityChange}
                    className="flex flex-col gap-4 sm:flex-row"
                    disabled={pending}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AVAILABLE" id="available" />

                      <Label htmlFor="available">In Stock</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="UNAVAILABLE" id="unavailable" />

                      <Label htmlFor="unavailable">Unavailable</Label>
                    </div>
                  </RadioGroup>

                  {state?.errors?.availability && (
                    <p className="text-sm text-red-500">
                      {state.errors.availability[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    name="brand"
                    id="brand"
                    placeholder="Enter brand name"
                    value={gearData.brand}
                    onChange={handleInput}
                    disabled={pending}
                  />
                  {state?.errors?.brand && (
                    <p className="text-sm text-red-500">
                      {state.errors.brand[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>

                  <Input
                    name="stock"
                    id="stock"
                    type="number"
                    min="0"
                    value={gearData.stock}
                    onChange={handleStockChange}
                    disabled={pending}
                  />

                  {state?.errors?.stock && (
                    <p className="text-sm text-red-500">
                      {state.errors.stock[0]}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rentalPricePerDay">
                    Rental Price Per Day
                  </Label>

                  <Input
                    name="rentalPricePerDay"
                    id="rentalPricePerDay"
                    type="number"
                    min="0"
                    step="0.01"
                    value={gearData.rentalPricePerDay}
                    onChange={handlePriceChange}
                    disabled={pending}
                  />

                  {state?.errors?.rentalPricePerDay && (
                    <p className="text-sm text-red-500">
                      {state.errors.rentalPricePerDay[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Gear Media</h3>

                <p className="text-muted-foreground text-sm">
                  Update your gear image.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Product Image</Label>

                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="image-upload"
                      className="hover:bg-muted/50 relative flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed"
                    >
                      {imagePreview || gearData.image ? (
                        <img
                          src={imagePreview || gearData.image || ""}
                          alt={gearData.name}
                          className="h-full w-full object-contain p-4"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <UploadCloud className="text-muted-foreground mb-2 h-12 w-12" />

                          <p className="text-muted-foreground mb-2 text-sm">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>

                          <p className="text-muted-foreground text-xs">
                            PNG, JPG, GIF or WEBP
                          </p>
                        </div>
                      )}

                      <Input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/png,image/jpeg,image/gif,image/webp"
                        name="image"
                        onChange={handleImageUpload}
                        disabled={pending}
                      />
                    </label>
                  </div>

                  {imagePreview && (
                    <p className="text-muted-foreground text-xs">
                      New image selected. It will replace the current image
                      after updating.
                    </p>
                  )}

                  {state?.errors?.image && (
                    <p className="text-sm text-red-500">
                      {state.errors.image[0]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" disabled={pending}>
                Cancel
              </Button>

              <Button type="submit" disabled={pending}>
                {pending ? "Updating..." : "Update Gear"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
