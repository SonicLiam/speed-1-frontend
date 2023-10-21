import { FormEvent, useState } from "react";

import formStyles from "../../styles/Form.module.scss";

const NewDiscussion = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState<string[]>([]);
    const [source, setSource] = useState("");
    const [pubYear, setPubYear] = useState<number | "">(0);
    const [doi, setDoi] = useState("");
    const [summary, setSummary] = useState("");
    const [SE_practice, setSePractice] = useState("");
    const [claim, setClaim] = useState("");

    const submitNewArticle = async (event: FormEvent) => {
        event.preventDefault();
        const articleData = {
            title,
            authors,
            source,
            publication_year: pubYear,
            doi,
            summary,
            SE_practice,
            claim,
            linked_discussion: "",
            updated_date: new Date().toISOString(),
            ratings: [],
            average_rating: null,
            total_ratings: 0,
            approved: false,
            rejected: false,
            evidence: null,
        };

        try {
            const response = await fetch("https://speed-1-backend-chi.vercel.app/articles", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(articleData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit article.');
            }

            alert('Article submitted successfully!');
            resetForm();
        } catch (error) {
            console.log(error);
            alert('Error submitting article');
        }
    };

    const resetForm = () => {
        setTitle("");
        setAuthors([]);
        setSource("");
        setPubYear(0);
        setDoi("");
        setSummary("");
        setSePractice("");
        setClaim("");
    };

    const addAuthor = () => setAuthors([...authors, ""]);
    const removeAuthor = (index: number) => setAuthors(authors.filter((_, i) => i !== index));
    const changeAuthor = (index: number, value: string) => setAuthors(authors.map((name, i) => (i === index ? value : name)));

    return (
        <div className={formStyles.container}>
            <h1>Submit a New Article</h1>
            <form className={formStyles.form} onSubmit={submitNewArticle}>
                <label htmlFor="title">Title:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="author">Authors:</label>
                {authors.map((author, index) => (
                    <div key={`author-${index}`} className={formStyles.arrayItem}>
                        <input
                            type="text"
                            name="author"
                            value={author}
                            onChange={(e) => changeAuthor(index, e.target.value)}
                            className={formStyles.formItem}
                            required
                        />
                        <button
                            onClick={() => removeAuthor(index)}
                            className={formStyles.buttonItem}
                            style={{ marginLeft: "3rem" }}
                            type="button"
                        >
                            -
                        </button>
                    </div>
                ))}
                <button
                    onClick={addAuthor}
                    className={formStyles.buttonItem}
                    type="button"
                >
                    +
                </button>

                <label htmlFor="source">Source:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="source"
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                />

                <label htmlFor="pubYear">Publication Year:</label>
                <input
                    className={formStyles.formItem}
                    type="number"
                    name="pubYear"
                    id="pubYear"
                    value={pubYear}
                    onChange={(e) => setPubYear(parseInt(e.target.value, 10))}
                    required
                />

                <label htmlFor="doi">DOI:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="doi"
                    id="doi"
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                    required
                />

                <label htmlFor="summary">Summary:</label>
                <textarea
                    className={formStyles.formTextArea}
                    name="summary"
                    id="summary"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    required
                />

                <label htmlFor="SE_practice">Method/practice:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="SE_practice"
                    id="SE_practice"
                    value={SE_practice}
                    onChange={(e) => setSePractice(e.target.value)}
                    required
                />

                <label htmlFor="claim">Claim:</label>
                <input
                    className={formStyles.formItem}
                    type="text"
                    name="claim"
                    id="claim"
                    value={claim}
                    onChange={(e) => setClaim(e.target.value)}
                    required
                />

                <button className={formStyles.formItem} type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion;
