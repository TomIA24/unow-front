import React, { useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import styles from "./styles.module.css";

const Spotlight = ({ actions, nothingFound, searchProps, isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const ref = useClickOutside(() => onClose());

  const filteredActions = actions.filter((action) =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={styles.spotlightOverlay}>
      <div ref={ref} className={styles.spotlightContent}>
        <div className={styles.searchWrapper}>
          {searchProps?.leftSection}
          <input
            className={styles.searchInput}
            type="text"
            placeholder={searchProps?.placeholder || "Search..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.actionsList}>
          {filteredActions.length > 0 ? (
            filteredActions.map((action) => (
              <div
                key={action.id}
                className={styles.actionItem}
                onClick={() => {
                  action.onClick();
                  onClose();
                }}
              >
                <div className={styles.leftSection}>{action.leftSection}</div>
                <div className={styles.actionDetails}>
                  <p className={styles.label}>{action.label}</p>
                  <p className={styles.description}>{action.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>{nothingFound}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spotlight;
