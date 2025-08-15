// src/lib/db/schema.ts
import {
    mysqlTable,
    text,
    varchar,
    timestamp,
    int,
    primaryKey,
    mysqlEnum,
    boolean,
    datetime,
    index,
} from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations, sql } from "drizzle-orm";

export const userRoleEnum = mysqlEnum("role", ["SUPER_ADMIN", "ADMIN"]);


// Skema yang dibutuhkan oleh NextAuth.js Drizzle Adapter
export const users = mysqlTable("user", {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date", fsp: 3 }),
    password: varchar("password", { length: 255 }),
    image: varchar("image", { length: 255 }),
    role: userRoleEnum.default("ADMIN"),
    isActive: boolean("isActive").default(true),
    createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const accounts = mysqlTable(
    "accounts",
    {
        userId: varchar("userId", { length: 255 }).notNull(),
        type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
        provider: varchar("provider", { length: 255 }).notNull(),
        providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: int("expires_at"),
        token_type: varchar("token_type", { length: 255 }),
        scope: varchar("scope", { length: 255 }),
        id_token: text("id_token"),
        session_state: varchar("session_state", { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId),
    })
);

export const sessions = mysqlTable("sessions", {
    sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
    "verificationTokens",
    {
        identifier: varchar("identifier", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token),
    })
);

// Skema untuk Artikel/Post Blog
export const articles = mysqlTable(
    "article",
    {
        id: varchar("id", { length: 255 }).notNull().primaryKey(),
        title: varchar("title", { length: 500 }).notNull(),
        slug: varchar("slug", { length: 500 }).notNull().unique(),
        content: text("content").notNull(),
        Image: varchar("Image", { length: 500 }),
        status: mysqlEnum("status", ["DRAFT", "PUBLISHED"]).default("DRAFT"),
        publishedAt: datetime("publishedAt"),

        // Relasi Kunci
        authorId: varchar("authorId", { length: 255 }).notNull(),
        categoryId: varchar("categoryId", { length: 255 }).notNull(), // Dibuat notNull agar setiap artikel wajib punya kategori

        createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
        updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
    },
    (article) => ({
        slugIdx: index("article_slug_idx").on(article.slug),
        authorIdx: index("article_author_idx").on(article.authorId),
        categoryIdx: index("article_category_idx").on(article.categoryId),
    })
);

// Tabel Kategori (tidak diubah)
export const categories = mysqlTable("category", {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    createdAt: datetime("createdAt").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: datetime("updatedAt").default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
    // Satu user bisa menulis banyak artikel
    articles: many(articles),
    // ... relasi untuk accounts dan sessions tetap ada
}));

export const articlesRelations = relations(articles, ({ one }) => ({
    // Setiap artikel dimiliki oleh SATU penulis (user)
    author: one(users, { fields: [articles.authorId], references: [users.id] }),
    // Setiap artikel masuk ke dalam SATU kategori
    category: one(categories, { fields: [articles.categoryId], references: [categories.id] }),
    // ===== Relasi ke tags dihapus =====
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
    // Setiap kategori bisa memiliki BANYAK artikel
    articles: many(articles),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

