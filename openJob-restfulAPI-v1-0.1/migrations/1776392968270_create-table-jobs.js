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
  pgm.createTable("jobs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    company_id: {
      type: "VARCHAR(50)",
      references: "companies",
      onDelete: "CASCADE",
    },
    category_id: {
      type: "VARCHAR(50)",
      references: "categories",
      onDelete: "CASCADE",
    },
    title: {
      type: "TEXT",
      notNull: true,
    },
    description: {
      type: "TEXT",
      notNull: true,
    },
    job_type: {
      type: "VARCHAR(50)",
      notNull: true,
      default: "General",
    },
    experience_level: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    location_type: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    location_city: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    salary_min: {
      type: "INTEGER",
    },
    salary_max: {
      type: "INTEGER",
    },
    is_salary_visible: {
      type: "BOOLEAN",
      default: true,
    },
    status: {
      type: "VARCHAR(20)",
      default: "Open",
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("CURRENT_TIMESTAMP"),
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("jobs");
};
