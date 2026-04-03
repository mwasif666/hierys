import { Fragment } from "react";

import { Sparkles } from "lucide-react";

import {
  COMPARISON_SECTION,
  type ComparisonStatus,
} from "@/components/homepage/data/homepageData";
import styles from "@/components/homepage/comparison/ComparisonSection.module.css";
import { cn } from "@/lib/utils";

const STATUS_SYMBOLS: Record<ComparisonStatus, string> = {
  yes: "✓",
  no: "×",
  sometimes: "△",
};

function renderLines(lines: string[]) {
  return lines.map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

type StatusMarkProps = {
  status: ComparisonStatus;
  accent?: boolean;
};

function StatusMark({ status, accent = false }: StatusMarkProps) {
  return (
    <span
      aria-label={status}
      className={cn(
        styles.statusMark,
        status === "yes" && styles.statusYes,
        status === "no" && styles.statusNo,
        status === "sometimes" && styles.statusSometimes,
        accent && styles.statusAccent,
      )}
    >
      {STATUS_SYMBOLS[status]}
    </span>
  );
}

export default function ComparisonSection() {
  const { titleLines, description, columns, rows, legend } = COMPARISON_SECTION;

  return (
    <section className={styles.section} id="comparison">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.heading}>
            {titleLines.map((line) => (
              <span className={styles.headingLine} key={line}>
                {line}
              </span>
            ))}
          </h2>
          <p className={styles.copy}>{description}</p>
        </header>

        <div className={styles.desktopTableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.cornerCell} />
                {columns.map((column) => (
                  <th className={styles.columnHeader} key={column.key} scope="col">
                    {column.accent ? (
                      <span className={styles.brandHeader}>
                        <Sparkles className={styles.brandIcon} aria-hidden="true" />
                        <span className={styles.brandName}>
                          {renderLines(column.labelLines)}
                        </span>
                      </span>
                    ) : (
                      <span className={styles.columnLabel}>
                        {renderLines(column.labelLines)}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th className={styles.rowLabel} scope="row">
                    {row.label}
                  </th>
                  {columns.map((column) => (
                    <td className={styles.cell} key={`${row.label}-${column.key}`}>
                      <StatusMark
                        status={row.values[column.key]}
                        accent={column.accent && row.values[column.key] === "yes"}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.mobileCards}>
          {columns.map((column) => (
            <article
              className={cn(styles.mobileCard, column.accent && styles.mobileCardAccent)}
              key={column.key}
            >
              <h3 className={styles.mobileCardTitle}>
                {column.accent ? (
                  <span className={styles.brandHeader}>
                    <Sparkles className={styles.brandIcon} aria-hidden="true" />
                    <span className={styles.brandName}>
                      {renderLines(column.labelLines)}
                    </span>
                  </span>
                ) : (
                  renderLines(column.labelLines)
                )}
              </h3>

              <div className={styles.mobileRows}>
                {rows.map((row) => (
                  <div className={styles.mobileRow} key={`${column.key}-${row.label}`}>
                    <span className={styles.mobileRowLabel}>{row.label}</span>
                    <span className={styles.mobileRowValue}>
                      <StatusMark
                        status={row.values[column.key]}
                        accent={column.accent && row.values[column.key] === "yes"}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.legend}>
          {legend.map((item) => (
            <span className={styles.legendItem} key={item.status}>
              <StatusMark status={item.status} />
              <span>{item.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
