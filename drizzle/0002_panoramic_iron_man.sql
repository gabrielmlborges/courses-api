CREATE TABLE "enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usersId" uuid NOT NULL,
	"coursesId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_usersId_users_id_fk" FOREIGN KEY ("usersId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_coursesId_courses_id_fk" FOREIGN KEY ("coursesId") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;