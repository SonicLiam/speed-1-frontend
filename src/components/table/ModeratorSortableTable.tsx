import React, { useState } from "react";
import styles from "./Tables.module.scss";
import axios from "axios";
import { ArticlesInterface } from "@/pages/articles/Moderator";

interface SortableTableProps {
  headers: { key: string; label: string }[];
  data: any[];
}

const formatAuthors = (authors: string[]) => {
  return authors.join(", "); // Join authors with a comma and space
};

const ModeratorSortableTable: React.FC<SortableTableProps> = ({
  headers,
  data,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: "", // The column to sort by
    direction: "ascending", // Sorting direction
  });

  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

const refreshData =async () => {
  location.reload();
}
  

// Inside handleApprove function
const handleApprove = async (index: number) => {
  const article = data[index];
  try {
    console.log(article);
    // Send a POST request to the server to approve the article
    const response = await axios.post(
      `https://speed-1-backend-chi.vercel.app/articles/approveArticle?_id=${article.id}`, // Use '_id' field in the URL
      { "approved": true }
    );
    // Log the response for debugging
    console.log('Approve Response:', response);
    window.alert("Approved, refreshing data...")
    // Update the article in the state with the data returned by the server
    await refreshData();
    setExpandedRowIndex(null);
  } catch (error) {
    // Log the error for debugging
    console.error('Approve Error:', error);
  }
};

// Inside handleReject function
const handleReject = async (index: number) => {
  const article = data[index];
  try {
    // Send a POST request to the server to reject the article
    const response = await axios.post(
      `https://speed-1-backend-chi.vercel.app/articles/rejectArticle?_id=${article.id}`, // Use '_id' field in the URL
      { "rejected": true }
    );
    // Log the response for debugging
    console.log('Reject Response:', response);
    // Update the article in the state with the data returned by the server
    window.alert("Rejected, refreshing data...")
    await refreshData();
    setExpandedRowIndex(null);
  } catch (error) {
    // Log the error for debugging
    console.error('Reject Error:', error);
  }
}; 

  // Function to handle header click and update sorting state
  const handleSort = (column: string) => {
    // If clicking on the same column, toggle sorting direction
    if (sortConfig.key === column) {
      const newDirection =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
      setSortConfig({ key: column, direction: newDirection });
    } else {
      // Clicking on a different column, set it as the sorting column
      setSortConfig({ key: column, direction: "ascending" });
    }
  };

  // Get the sorting indicator (arrow) based on the sorting direction
  const getSortingIndicator = (columnKey: string) => {
    if (columnKey === sortConfig.key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼"; // Up arrow or down arrow
    }
    return ""; // No arrow for other columns
  };

  // Sort the data based on the current sortConfig
  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) {
      return 0; // No sorting, return the same order
    }

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // If authors, take the first author for sorting
    if (sortConfig.key === 'authors' && Array.isArray(aValue) && Array.isArray(bValue)) {
      aValue = aValue[0];
      bValue = bValue[0];
    }

    // Handle the 'publication_year' or other numerical fields differently
    if (sortConfig.key === 'publication_year') {
      return (Number(aValue) - Number(bValue)) *
        (sortConfig.direction === 'ascending' ? 1 : -1);
    }

    // For other fields, proceed as before
    if (typeof aValue === "string" && typeof bValue === "string") {
      // Compare string values in a case-insensitive manner
      return aValue.localeCompare(bValue, undefined, { sensitivity: "base" }) *
        (sortConfig.direction === "ascending" ? 1 : -1);
    }

    return 0;
  });

  return (
    <table className={styles.myTable}>
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              onClick={() => handleSort(header.key)}
              className={header.key === sortConfig.key ? styles.active : ""}
            >
              {header.label}{" "}
              <span className={styles.sortIndicator}>
                {getSortingIndicator(header.key)}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <>
            <tr 
              key={i} 
              onClick={() => setExpandedRowIndex(expandedRowIndex === i ? null : i)} // Toggle expanded row
            >
              {headers.map((header) => (
                <td key={header.key}>{row[header.key]}</td>
              ))}
            </tr>
            {/* Expanded Section */}
            {expandedRowIndex === i && (
              <tr>
                <td colSpan={headers.length}>
                  <button onClick={() => handleApprove(i)}>Approve</button>
                  <button onClick={() => handleReject(i)}>Reject</button>
                </td>
              </tr>
            )}
          </>
        ))}
      </tbody>
    </table>
  );
};
  
export default ModeratorSortableTable;