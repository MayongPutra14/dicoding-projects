/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.dropColumns("applications", [
    "company_id",
    "category_id",
    "title",
    "description",
    "job_type",
    "experience_level",
    "location_type",
  ]);

  pgm.addColumns("applications", {
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users",
      onDelete: "CASCADE",
    },
    job_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "jobs", // Pastikan nama tabel lowongan kamu adalah 'jobs'
      onDelete: "CASCADE",
    },
  });

  pgm.alterColumn("applications", "status", {
    default: "pending",
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropColumns("applications", ["user_id", "job_id"]);
  pgm.addColumns("applications", {
    company_id: {
      type: "VARCHAR(50)",
    },
    category_id: {
      type: "VARCHAR(50)",
    },
    title: {
      type: "TEXT",
    },
    description: {
      type: "TEXT",
    },
    job_type: {
      type: "VARCHAR(50)",
    },
    experience_level: {
      type: "VARCHAR(50)",
    },
    location_type: {
      type: "VARCHAR(50)",
    },
  });
};
