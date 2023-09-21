import Header from "./Header";
import Footer from "./Footer";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <Header />

      <main
        id="main-content"
        className="pb-20"
      >
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default LayoutWrapper;
