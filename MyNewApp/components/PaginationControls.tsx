import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useStore } from "../services/store";
import { globalStyle } from "../styles";

const PaginationControls: React.FC = () => {
  const { page, total, setPage, loading } = useStore();
  const pageSize = 50;
  const totalPages = Math.ceil(total / pageSize) || 1;

  const goToPage = (p: number) => {
    if (!loading && p >= 0 && p < totalPages) setPage(p);
  };

  const isDisabled = () => {
    return page === totalPages - 1 || loading;
  };

  const visiblePages = () => {
    const pages = [];

    pages.push(0);

    if (page > 2) pages.push(-1);

    for (
      let i = Math.max(1, page - 1);
      i <= Math.min(totalPages - 2, page + 1);
      i++
    ) {
      pages.push(i);
    }

    if (page < totalPages - 3) pages.push(-2);

    if (totalPages > 1) pages.push(totalPages - 1);

    return pages;
  };

  return (
    <View style={[styles.container, globalStyle.shadow]}>
      <TouchableOpacity
        onPress={() => goToPage(page - 1)}
        style={[styles.pageNumber, styles.arrow, page === 0 && styles.disabled]}
        disabled={page === 0 || loading}
      >
        <Text style={styles.arrowText}>{"Prev"}</Text>
      </TouchableOpacity>

      {visiblePages().map((p, idx) =>
        p >= 0 ? (
          <TouchableOpacity
            key={idx}
            onPress={() => goToPage(p)}
            style={[
              styles.pageNumber,
              p === page ? styles.activePage : undefined,
            ]}
            disabled={loading}
          >
            <Text style={[styles.pageText, p === page && styles.activeText]}>
              {p + 1}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text key={idx}>...</Text>
        )
      )}

      <TouchableOpacity
        onPress={() => goToPage(page + 1)}
        style={[
          styles.pageNumber,
          styles.arrow,
          page === totalPages - 1 && styles.disabled,
        ]}
        disabled={isDisabled()}
      >
        <Text style={styles.arrowText}>{"Next"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    gap: 6,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 16,
  },
  arrow: {
    backgroundColor: "#ed2124",
  },
  arrowText: {
    color: "#fff",
  },
  pageNumber: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  activePage: {
    backgroundColor: "#ed2124",
  },
  pageText: {
    fontWeight: "600",
  },
  activeText: {
    color: "#fff",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
});

export default PaginationControls;
