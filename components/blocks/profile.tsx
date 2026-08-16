"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CheckCircle,
  AlertCircle,
  Edit2,
  LayoutDashboard,
  Trash2,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";

interface ProfileProps {
  profilePicture?: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  status: "active" | "inactive" | "pending";
  onUpdate?: () => void;
  onDashboard?: () => void;
  onDelete?: () => void;
}

export function ProfileComponent({
  profilePicture = "asdasd",
  name,
  email,
  role,
  phone,
  address,
  status,
  onDashboard,
}: ProfileProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "inactive":
        return "text-red-600";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "pending":
        return <CheckCircle className={`w-5 h-5 ${getStatusColor(status)}`} />;
      case "inactive":
        return <AlertCircle className={`w-5 h-5 ${getStatusColor(status)}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-primary to-secondary-foreground" />

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Profile Picture */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={"/"}
                alt={name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>

          {/* Name and Status */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{name}</h1>
            <div className="flex items-center justify-center gap-2">
              {getStatusIcon(status)}
              <span
                className={`text-sm font-medium capitalize ${getStatusColor(status)}`}
              >
                {status}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="space-y-4 mb-6">
            {/* Role */}
            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <p className="text-gray-900 font-medium">{role}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="text-gray-900 font-medium break-all">{email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="text-gray-900 font-medium">{phone}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="text-gray-900 font-medium">{address}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            {/* <Button
              onClick={onUpdate}
              className="w-full bg-primary text-white flex items-center justify-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Update Profile
            </Button> */}

            <Link href={"/"}>
              <Button
                onClick={onDashboard}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-secondary flex items-center justify-center gap-2"
              >
                <HomeIcon className="w-4 h-4" />
                Home
              </Button>
            </Link>

            {/* <Button
              onClick={handleDelete}
              disabled={isDeleting}
              variant="destructive"
              className="w-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {isDeleting ? "Deleting..." : "Delete Profile"}
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
