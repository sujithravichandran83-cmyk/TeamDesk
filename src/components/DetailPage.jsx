function DetailPage({
  title,
  children,
}) {
  return (
    <section className="detail-page">
      {title && <h1>{title}</h1>}

      <div className="detail-content">
        {children}
      </div>
    </section>
  );
}

export default DetailPage;