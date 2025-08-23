-- CreateTable
CREATE TABLE "public"."FeatureRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "featureRequest" TEXT NOT NULL,
    "userType" TEXT NOT NULL DEFAULT 'job-seeker',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeatureRequest_pkey" PRIMARY KEY ("id")
);
