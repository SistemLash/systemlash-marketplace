import { useRef, useState } from "react";
import { VERTICALES } from "./data/config.js";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import VerticalCard from "./components/VerticalCard.jsx";
import LeadForm from "./components/LeadForm.jsx";
import ShareBar from "./components/ShareBar.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [interesSeleccionado, setInteresSeleccionado] = useState(null);
  const cardRefs = useRef({});
  const formRef = useRef(null);

  const irABahia = (id) => {
    cardRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const quiero = (vertical) => {
    setInteresSeleccionado(vertical.id);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header />
      <Hero onSelectVertical={irABahia} />

      <section className="container" style={{ display: "grid", gap: 16, padding: "8px 20px 40px" }}>
        <div className="eyebrow" style={{ padding: "0 4px" }}>BAHÍAS DISPONIBLES</div>
        {VERTICALES.map(v => (
          <VerticalCard key={v.id} v={v} onQuiero={quiero} ref={el => (cardRefs.current[v.id] = el)} />
        ))}
      </section>

      <section className="container" style={{ padding: "0 20px 40px" }}>
        <LeadForm ref={formRef} interesSeleccionado={interesSeleccionado} />
      </section>

      <section className="container" style={{ padding: "0 20px 56px" }}>
        <ShareBar />
      </section>

      <Footer />
    </>
  );
}
