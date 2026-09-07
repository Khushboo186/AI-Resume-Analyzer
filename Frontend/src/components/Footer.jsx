function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        <p className="mb-1 fw-bold">
          🤖 AI Resume Analyzer
        </p>
        <small className="text-secondary">
          © {new Date().getFullYear()} AI Resume Analyzer. Built with React, Spring Boot, and MySQL.
        </small>
      </div>
    </footer>
  );
}

export default Footer;