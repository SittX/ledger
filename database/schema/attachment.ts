import {
    integer,
    pgEnum,
    pgTable,
    serial,
    text,
    timestamp,
    varchar,
} from "drizzle-orm/pg-core";

export const attachmentType = pgEnum("attachment_type", [
    "photo",
    "file",
    "document",
]);

export const attachment = pgTable("attachments", {
    id: serial().primaryKey(),
    attachmentType: attachmentType("attachment_type"),
    mimeType: varchar("mime_type", { length: 255 }),
    size: integer(),
    url: text(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => new Date()),
});
