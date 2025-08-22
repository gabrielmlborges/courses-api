CREATE TYPE "public"."user_roles" AS ENUM('student', 'manager');--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_usersId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "enrollments_coursesId_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "userId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "courseId" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_roles" DEFAULT 'student' NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_courseId_courses_id_fk" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "enrollments_userId_courseId_index" ON "enrollments" USING btree ("userId","courseId");--> statement-breakpoint
ALTER TABLE "enrollments" DROP COLUMN "usersId";--> statement-breakpoint
ALTER TABLE "enrollments" DROP COLUMN "coursesId";