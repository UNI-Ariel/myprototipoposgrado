import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "@/assets/data";
import styles from "./Search.module.css";

import type { Program } from "@/assets/data";

const MAX_RESULTS = 6;
const DEBOUNCE = 1200;

type Props = {
  className?: string;
  setIsVisible: (state: boolean) => void;
};

export const Search = ({ className = "", setIsVisible }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [highlighted, setHighlighted] = useState(-1);
  const [loading, setLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<any>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    // ❌ cancelar búsqueda previa
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    clearTimeout(debounceRef.current);
    setLoading(true);

    debounceRef.current = setTimeout(() => {
      if (abortRef.current?.signal.aborted) return;

      const q = query.toLowerCase();

      const dip = data.diplomados.filter(
        (d) =>
          d.meta.name.toLowerCase().includes(q) ||
          d.meta.details.modalidad.join("").includes(q)
      );
      const mae = data.maestrias.filter((m) =>
        m.meta.name.toLowerCase().includes(q)
      );
      const doc = data.doctorados.filter((d) =>
        d.meta.name.toLowerCase().includes(q)
      );

      setTotal(dip.length + mae.length + doc.length);

      const selected: Program[] = [];

      // 1️⃣ uno por grupo
      if (dip.length) selected.push({ ...dip[0] });
      if (mae.length) selected.push({ ...mae[0] });
      if (doc.length) selected.push({ ...doc[0] });

      // 2️⃣ completar hasta límite
      const rest: Program[] = [
        ...dip.slice(1).map((r) => ({ ...r })),
        ...mae.slice(1).map((r) => ({ ...r })),
        ...doc.slice(1).map((r) => ({ ...r })),
      ];

      for (const item of rest) {
        if (selected.length >= MAX_RESULTS) break;
        selected.push(item);
      }

      setResults(selected);
      setHighlighted(-1);
      setLoading(false);
    }, DEBOUNCE);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;

    if (e.key === "ArrowDown") {
      setHighlighted((i) => Math.min(i + 1, results.length - 1));
    }

    if (e.key === "ArrowUp") {
      setHighlighted((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter" && highlighted >= 0) {
      alert(`Seleccionado: ${results[highlighted].title}`);
    }

    if (e.key === "Escape") {
      setResults([]);
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "ig");
    return text
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        )
      );
  };

  const grouped = results.reduce((acc, r: Program) => {
    acc[r.meta.details.grado_académico] =
      acc[r.meta.details.grado_académico] || [];
    acc[r.meta.details.grado_académico].push(r);
    return acc;
  }, {} as Record<string, Program[]>);

  return (
    <div className={`${styles.searchWrap} ${className}`}>
      <div className={styles.search}>
        <input
          type="search"
          placeholder="Buscar programas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          name="search"
          autoComplete="off"
        />

        {loading && <div className={styles.loading}>Buscando…</div>}

        {results.length > 0 && (
          <div className={styles.dropdown}>
            {(Object.entries(grouped) as [string, Program[]][]).map(
              ([group, items]) => (
                <div key={group}>
                  <div className={styles["group-title"]}>{group}</div>

                  {items.map((item, i) => {
                    const index = results.indexOf(item);
                    return (
                      <div
                        key={`r${group}-${i}`}
                        className={`${styles.item} ${
                          index === highlighted ? styles.active : ""
                        }`}
                      >
                        <Link
                          to={item.to}
                          onClick={() => {
                            setQuery("");
                            setIsVisible(false);
                          }}
                        >
                          <p className={styles.resultName}>
                            {highlightText(item.meta.name, query)}
                          </p>
                          <p className={styles.resultMod}>
                            {highlightText(
                              item.meta.details.modalidad.join(", "),
                              query
                            )}
                          </p>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )
            )}

            {total > results.length && (
              <div className={styles["view-all"]}>
                Ver todos los resultados ({total})
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
