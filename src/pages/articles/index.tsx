// UserView.tsx

import { GetStaticProps, NextPage } from "next";
import axios from "axios";
import SortableTable from "../../components/table/SortableTable";
import styles from "./UserView.module.scss";

interface Article {
  id: string;
  title: string;
  authors: string;
  source: string;
  publication_year: string;
  doi: string;
  SE_practice: string;
  claim: string;
  averageRating: string;
  approved: boolean;
}

type ArticlesProps = {
  articles: Article[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "publication_year", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "SE_practice", label: "SE Practice" },
    { key: "claim", label: "Claim" },
    { key: "averageRating", label: "Rating" },
  ];

  return (
    <div className={styles.container}>
      <h1>SPEED Articles</h1>
      <p>Search Placeholder</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ArticlesProps> = async () => {
  try {
    const response = await axios("https://speed-1-backend-chi.vercel.app/articles");
    const articles: Article[] = response.data.filter((article: Article) => article.approved);

    return { props: { articles } };
  } catch (error) {
    console.error("API data fetch error:", error);
    return { props: { articles: [] } };
  }
};

export default Articles;
