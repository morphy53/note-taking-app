CREATE TABLE "notes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar NOT NULL,
	"title" varchar NOT NULL,
	"isArchived" boolean DEFAULT false NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "noteTags" (
	"tagId" uuid NOT NULL,
	"noteId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "noteTags_tagId_noteId_pk" PRIMARY KEY("tagId","noteId")
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tagName" varchar NOT NULL,
	"userId" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_tag_unique" UNIQUE("userId","tagName")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"imageUrl" varchar NOT NULL,
	"email" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "notes" ADD CONSTRAINT "notes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "noteTags" ADD CONSTRAINT "noteTags_tagId_tags_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "noteTags" ADD CONSTRAINT "noteTags_noteId_notes_id_fk" FOREIGN KEY ("noteId") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tags" ADD CONSTRAINT "tags_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "notes_user_created_idx" ON "notes" USING btree ("userId","createdAt");--> statement-breakpoint
CREATE INDEX "notes_title_idx" ON "notes" USING btree ("userId","title");--> statement-breakpoint
CREATE INDEX "notes_user_archived_idx" ON "notes" USING btree ("userId","isArchived");