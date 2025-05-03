"use client";

import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useAuth } from "@/lib/auth/auth-context";
import { Verified, Upload, Trash2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { AcademicCapIcon } from "@heroicons/react/solid";
import { useTrainings } from "@/app/hooks/trainings";
import { DashboardProfileLayout } from "@/components/Wrappers/dashboard-profile-layout";
import { toast } from "sonner";
import { format } from "date-fns";
import { Modal } from "@/app/components/ui/modal";
import { TrainingForm } from "@/app/components/profile/training-form";
import { Training } from "@/lib/types";
import { GlobalComplianceAlert } from "../components/GlobalComplianceAlert";

export default function TrainingsPage() {
  const { user } = useAuth();
  const {
    trainings,
    trainingReferences,
    isLoading,
    uploadTraining,
    deleteTraining,
    isUploading,
    isDeleting,
  } = useTrainings();
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(
    null
  );

  const handleAddTraining = () => {
    setSelectedTraining(null);
    setActiveModal("upload");
  };

  const handleUploadTraining = async (formData: FormData) => {
    // Add user ID to the form data
    formData.append("user_id", user.id!.toString());

    try {
      await uploadTraining(formData);
      toast.success("Training uploaded successfully");
      setActiveModal(null); // Only close modal on success
    } catch (error) {
      toast.error("Failed to upload training");
      // Modal stays open on error so user can try again
    }
  };

  const handleDeleteTraining = async (id: number) => {
    try {
      await deleteTraining({ id, withLinked: false });
      toast.success("Training deleted successfully");
    } catch (error) {
      toast.error("Failed to delete training");
    }
  };

  // Check for expired trainings
  const checkExpiredTrainings = () => {
    if (!trainings) return [];
    
    const now = new Date();
    return trainings.filter(training => {
      const expiryDate = new Date(training.date_expiring);
      return expiryDate < now;
    });
  };

  const expiredTrainings = checkExpiredTrainings();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-4 flex justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/home">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">
                  <AcademicCapIcon className="size-4 inline-flex mr-1" />
                  Trainings
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex justify-end">
          <Button
            onClick={handleAddTraining}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Training
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <GlobalComplianceAlert />

        {expiredTrainings.length > 0 && (
          <div className="bg-error-3 border border-error-6 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-error-11 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-error-11">
                  {expiredTrainings.length} Expired Training{expiredTrainings.length > 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-error-10 mt-1">
                  You have {expiredTrainings.length} training{expiredTrainings.length > 1 ? 's' : ''} that {expiredTrainings.length > 1 ? 'have' : 'has'} expired. Please renew {expiredTrainings.length > 1 ? 'them' : 'it'} as soon as possible.
                </p>
              </div>
            </div>
          </div>
        )}

        <h1 className="text-xl font-medium text-slate-12 mb-4">Trainings</h1>
        {trainings && trainings.length > 0 ? (
          <div className="space-y-4">
            {trainings.map((training) => {
              const isExpired = new Date(training.date_expiring) < new Date();
              return (
                <div
                  key={training.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${isExpired ? 'border-error-6 bg-error-2' : ''}`}
                >
                  <div className="space-y-1">
                    <div className="font-medium flex items-center gap-2">
                      {training.name}
                      {training.verified_by && (
                        <Verified className="h-4 w-4 text-green-500" />
                      )}
                      {isExpired && (
                        <span className="text-xs font-medium text-error-11 bg-error-3 px-2 py-0.5 rounded">
                          Expired
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      Trained:{" "}
                      {format(new Date(training.date_trained), "dd MMM yyyy")}
                    </div>
                    <div className={`text-sm ${isExpired ? 'text-error-11 font-medium' : 'text-gray-500'}`}>
                      Expires:{" "}
                      {format(new Date(training.date_expiring), "dd MMM yyyy")}
                      {isExpired && " - Renewal required"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {training.certificate && (
                      <Button variant="outline" size="sm">
                        View Certificate
                      </Button>
                    )}
                    {isExpired && (
                      <Button variant="default" size="sm" asChild>
                        <Link href={`/trainings/renew/${training.id}`}>
                          Renew
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTraining(training.id!)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-lg">
            <AcademicCapIcon className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold">No trainings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by uploading a training certificate.
            </p>
          </div>
        )}
      </div>

      {/* Training Upload Modal */}
      <Modal
        isOpen={activeModal === "upload"}
        onClose={() => {
          // Only allow closing if not in the middle of an operation
          if (!isUploading) {
            setActiveModal(null);
          }
        }}
        onConfirm={() => document.forms[0].requestSubmit()}
        title="Upload Training"
        description="Please provide details about your training"
        isLoading={isUploading} // Show loading state during operations
        size="md"
      >
        <TrainingForm
          trainingReferences={trainingReferences}
          onSubmit={handleUploadTraining}
        />
      </Modal>
    </div>
  );
}
