ALTER TABLE "room" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "room" ADD CONSTRAINT "room_slug_key" UNIQUE("slug");