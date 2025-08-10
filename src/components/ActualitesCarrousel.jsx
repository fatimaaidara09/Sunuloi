function ActualitesCarrousel({ news }) {
  if (!news || news.length === 0) {
    return <p style={{ color: "white", textAlign: "center" }}>Aucune actualité disponible.</p>;
  }

  return (
    <div
      style={{
        backgroundColor: "#2e7d32", // vert foncé
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "700px",
        margin: "2rem auto",
        color: "white",
      }}
    >
      {news.map((article) => (
        <div
          key={article.id}
          style={{
            marginBottom: "1.5rem",
            padding: "1rem",
            border: "1px solid white",
            borderRadius: "8px",
          }}
        >
          <h2 style={{ marginBottom: "0.5rem" }}>{article.titre}</h2>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ActualitesCarrousel;


