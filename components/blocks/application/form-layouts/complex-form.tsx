"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { UploadCloud } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { gearAction } from "@/app/dashboard/provider/gear/_actions/gearAction";

export default function ComplexForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [state, action, pending] = useActionState(gearAction, false);

  useEffect(() => {
    if (!state) {
      return;
    }
    if (state.success) {
      toast.add({
        type: "success",
        description: "Gear Created",
      });
    }

    if (!state.success) {
      toast.add({
        type: "error",
        description: state.message || "Gear Creation Failed",
      });
    }
  }, [state]);

  return (
    <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
      <Card>
        <CardHeader>
          <CardTitle>Create Gear Listing</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={action} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Basic Information</h3>
                <p className="text-muted-foreground text-sm">
                  Add your gear details below.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Gear Name</Label>
                  <Input
                    name="name"
                    id="name"
                    placeholder="Enter gear name"
                    defaultValue={state?.values?.name}
                  />
                  {state?.errors?.name && (
                    <p className="text-sm text-red-500">
                      {state.errors.name[0]}
                    </p>
                  )}
                </div>
                <div className="col-span-full space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    name="description"
                    id="description"
                    placeholder="Write a description"
                    defaultValue={state?.values?.description}
                  />
                  {state?.errors?.description && (
                    <p className="text-sm text-red-500">
                      {state.errors.description[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    name="brand"
                    id="brand"
                    placeholder="Enter brand name"
                    defaultValue={state?.values?.brand}
                  />
                  {state?.errors?.brand && (
                    <p className="text-sm text-red-500">
                      {state.errors.brand[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Gear Category</Label>
                  <Select
                    name="category"
                    defaultValue={state?.values?.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cycling">cycling</SelectItem>
                      <SelectItem value="camping">camping</SelectItem>
                      <SelectItem value="fitness">fitness</SelectItem>
                      <SelectItem value="sports">sports</SelectItem>

                      <SelectItem value="water">water</SelectItem>
                    </SelectContent>
                  </Select>

                  {state?.errors?.category && (
                    <p className="text-sm text-red-500">
                      {state.errors.category[0]}
                    </p>
                  )}
                </div>{" "}
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <RadioGroup
                    name="availability"
                    defaultValue="AVAILABLE"
                    className="flex flex-col gap-4 sm:flex-row"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="AVAILABLE" id="AVAILABLE" />
                      <Label htmlFor="AVAILABLE">In Stock</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="UNAVAILABLE" id="AVAILABLE" />
                      <Label htmlFor="UNAVAILABLE">Unavailable</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    name="stock"
                    id="stock"
                    type="number"
                    defaultValue={state?.values?.stock}
                  />
                  {state?.errors?.stock && (
                    <p className="text-sm text-red-500">
                      {state.errors.stock[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rentalPricePerDay">Rental Price</Label>
                  <Input
                    name="rentalPricePerDay"
                    id="rentalPricePerDay"
                    type="number"
                    defaultValue={state?.values?.rentalPricePerDay}
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

            {/* Media Upload */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Gear Media</h3>
                <p className="text-muted-foreground text-sm">
                  Add product images and media.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="flex w-full items-center justify-center">
                    <label
                      htmlFor="image-upload"
                      className="hover:bg-muted/50 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
                    >
                      {imagePreview ? (
                        <img
                          width={1280}
                          height={720}
                          src={imagePreview}
                          alt="Preview"
                          className="h-full object-contain"
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
                            PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                      )}
                      <Input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Additional Options */}
            {/* <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Additional Options</h3>
                <p className="text-muted-foreground text-sm">
                  Configure additional product options.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="featured" />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="sale" />
                      <Label htmlFor="sale">On Sale</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="new" />
                      <Label htmlFor="new">New Arrival</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="exclusive" />
                      <Label htmlFor="exclusive">Exclusive</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="flex justify-end gap-4">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Create Gear</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
