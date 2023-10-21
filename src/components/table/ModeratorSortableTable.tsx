// import React, { useState } from "react";
// import styles from "./Tables.module.scss";
// import axios from "axios";

// interface SortableTableProps {
//   headers: { key: string; label: string }[];
//   data: any[];
//   //apiUrl?: string;
// }

// //const API_BASE_URL = process.env.API_BASE_URL || "https://speed-1-ybenjamins-projects.vercel.app";
// const formatAuthors = (authors: string[]) => {
//   return authors.join(", "); // Join authors with a comma and space
// };

// const ModeratorSortableTable: React.FC<SortableTableProps> = ({
//   headers,
//   data: initialData,
//   //apiUrl = API_BASE_URL,
// }) => {
//   const [data, setData] = useState(initialData);
//   const [sortConfig, setSortConfig] = useState({
//     key: "",
//     direction: "ascending",
//   });
//   const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null);

//   const handleApprove = async (index: number) => {
//     const article = data[index];
//     try {
//       const response = await axios.post(
//         'https://speed-1-pvgc460l8-notreallybenjamins-projects.vercel.app/api/articles/approveArticle?_id=${article._id}',
//         { approved: true }
//       );
//       console.log('Approve Response:', response);
//       const newData = [...data];
//       newData[index] = response.data;
//       setData(newData);
//       setExpandedRowIndex(null);
//     } catch (error) {
//       console.error('Approve Error:', error);
//     }
//   };

//   const handleReject = async (index: number) => {
//     const article = data[index];
//     try {
//       const response = await axios.post(
//         'https://speed-1-pvgc460l8-notreallybenjamins-projects.vercel.app/api/articles/rejectArticle?_id=${article._id}',
//         { rejected: true }
//       );
//       console.log('Reject Response:', response);
//       const newData = [...data];
//       newData[index] = response.data;
//       setData(newData);
//       setExpandedRowIndex(null);
//     } catch (error) {
//       console.error('Reject Error:', error);
//     }
//   };

//   const handleSort = (column: string) => {
//     if (sortConfig.key === column) {
//       const newDirection =
//         sortConfig.direction === "ascending" ? "descending" : "ascending";
//       setSortConfig({ key: column, direction: newDirection });
//     } else {
//       setSortConfig({ key: column, direction: "ascending" });
//     }
//   };

//   const getSortingIndicator = (columnKey: string) => {
//     if (columnKey === sortConfig.key) {
//       return sortConfig.direction === "ascending" ? "▲" : "▼";
//     }
//     return "";
//   };

//   const sortedData = [...data].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     let aValue = a[sortConfig.key];
//     let bValue = b[sortConfig.key];

//     if (sortConfig.key === 'authors' && Array.isArray(aValue) && Array.isArray(bValue)) {
//       aValue = aValue[0];
//       bValue = bValue[0];
//     }

//     if (sortConfig.key === 'publication_year') {
//       return (Number(aValue) - Number(bValue)) *
//         (sortConfig.direction === 'ascending' ? 1 : -1);
//     }

//     if (typeof aValue === "string" && typeof bValue === "string") {
//       return aValue.localeCompare(bValue, undefined, { sensitivity: "base" }) *
//         (sortConfig.direction === "ascending" ? 1 : -1);
//     }

//     return 0;
//   });

//   return (
//     <table className={styles.myTable}>
//       <thead>
//         <tr>
//           {headers.map((header) => (
//             <th
//               key={header.key}
//               onClick={() => handleSort(header.key)}
//               className={header.key === sortConfig.key ? styles.active : ""}
//             >
//               {header.label}{" "}
//               <span className={styles.sortIndicator}>
//                 {getSortingIndicator(header.key)}
//               </span>
//             </th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {sortedData.map((row, i) => (
//           <>
//             <tr key={i} onClick={() => setExpandedRowIndex(expandedRowIndex === i ? null : i)}>
//               {headers.map((header) => (
//                 <td key={header.key}>{row[header.key]}</td>
//               ))}
//             </tr>
//             {expandedRowIndex === i && (
//               <tr>
//                 <td colSpan={headers.length}>
//                   <button onClick={() => handleApprove(i)}>Approve</button>
//                   <button onClick={() => handleReject(i)}>Reject</button>
//                 </td>
//               </tr>
//             )}
//           </>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default ModeratorSortableTable;
import React, { useState } from "react";
import styles from "./Tables.module.scss";
import axios from "axios";

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

// Inside handleApprove function
const handleApprove = async (index: number) => {
  const article = data[index];
  try {
    // Send a POST request to the server to approve the article
    const response = await axios.post(
      `https://speed-1-backend-o3zc1j3ps-notreallybenjamins-projects.vercel.app/api/articles/approveArticle?_id=${article._id}`, // Use '_id' field in the URL
      { "approved": true }
    );
    // Log the response for debugging
    console.log('Approve Response:', response);
    // Update the article in the state with the data returned by the server
    data[index] = response.data;
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
      `https://speed-1-backend-o3zc1j3ps-notreallybenjamins-projects.vercel.app/api/articles/rejectArticle?_id=${article._id}`, // Use '_id' field in the URL
      { "rejected": true }
    );
    // Log the response for debugging
    console.log('Reject Response:', response);
    // Update the article in the state with the data returned by the server
    data[index] = response.data;
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