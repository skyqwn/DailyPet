DO $$ BEGIN
 CREATE TYPE "public"."post_color" AS ENUM('RED', 'BLUE', 'GREEN', 'PURPLE', 'YELLOW');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_color" "post_color",
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"address" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"score" integer NOT NULL,
	"date" timestamp with time zone DEFAULT now(),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	"deletedAt" timestamp,
	"userId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
