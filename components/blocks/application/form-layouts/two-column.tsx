import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function TwoColumnForm() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add A New Gear</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-md font-medium">Basic Information</h3>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">Gear name</Label>
                    <Input id="first-name" placeholder="Enter first name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last-name">Brand name</Label>
                    <Input id="last-name" placeholder="Enter last name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="col-span-full space-y-2">
                    <Label htmlFor="about">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Write a description"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Create Gear</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
