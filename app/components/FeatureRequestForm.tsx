"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle, Send, Users, Briefcase } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  featureRequest: string;
}

export default function FeatureRequestForm() {
  const [jobSeekerData, setJobSeekerData] = useState<FormData>({
    name: "",
    email: "",
    featureRequest: "",
  });
  const [recruiterData, setRecruiterData] = useState<FormData>({
    name: "",
    email: "",
    featureRequest: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("job-seeker");

  const handleInputChange = (
    field: keyof FormData,
    value: string,
    userType: string
  ) => {
    if (userType === "job-seeker")
      setJobSeekerData((prev) => ({ ...prev, [field]: value }));
    else setRecruiterData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = activeTab === "job-seeker" ? jobSeekerData : recruiterData;

    if (!formData.name || !formData.email || !formData.featureRequest) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feature-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userType: activeTab }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
  if (err instanceof Error) {
    alert("Failed to submit: " + err.message);
  } else {
    alert("Failed to submit: " + String(err));
  }
}
 finally {
      setIsSubmitting(false);
    }
  };


  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 mx-auto text-green-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Request Submitted Successfully
                </h2>
                <p className="text-gray-600">
                  Thank you for helping us improve DeepHireAI. We&apos;ll review your
                  feature request and update you on its progress.
                </p>

              </div>
              <Button
                onClick={() => {
                  setIsSubmitted(false);
                  setJobSeekerData({ name: "", email: "", featureRequest: "" });
                  setRecruiterData({ name: "", email: "", featureRequest: "" });
                }}
                variant="outline"
                className="w-full max-w-xs"
              >
                Submit Another Request
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentFormData = activeTab === "job-seeker" ? jobSeekerData : recruiterData;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Submit Feature Request
          </CardTitle>
          <CardDescription className="text-gray-600">
            Tell us what features you&apos;d like to see in DeepHireAI
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-sm px-1 py-1">
            <button
              onClick={() => setActiveTab("job-seeker")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-1 rounded-sm text-sm font-medium transition-all duration-200 ${activeTab === "job-seeker"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <Users className="w-4 h-4" />
              Job Seeker
            </button>
            <button
              onClick={() => setActiveTab("recruiter")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-1.5 rounded-sm text-sm font-medium transition-all duration-200 ${activeTab === "recruiter"
                  ? "bg-black text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <Briefcase className="w-4 h-4" />
              Recruiter
            </button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={currentFormData.name}
                  onChange={(e) => handleInputChange("name", e.target.value, activeTab)}
                  placeholder="Enter your full name"
                  className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={currentFormData.email}
                  onChange={(e) => handleInputChange("email", e.target.value, activeTab)}
                  placeholder="your.email@company.com"
                  className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featureRequest" className="text-gray-700 font-medium">
                Feature Request
              </Label>
              <Textarea
                id="featureRequest"
                value={currentFormData.featureRequest}
                onChange={(e) =>
                  handleInputChange("featureRequest", e.target.value, activeTab)
                }
                placeholder={
                  activeTab === "job-seeker"
                    ? "What features would help you practice and improve your job search skills?"
                    : "What features would help you streamline your recruiting and hiring process?"
                }
                className="min-h-[120px] bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
              />
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === "job-seeker"
                  ? "📝 Tell us about features that would help you practice interviews, improve your resume, or find better job opportunities."
                  : "💼 Share ideas that would make recruiting and interviews easier for your hiring process."}
              </p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-2.5 px-6 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting Request...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Submit Feature Request
                </div>
              )}
            </button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Your feedback is valuable to us. We review all feature requests and prioritize based on user needs and impact.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}