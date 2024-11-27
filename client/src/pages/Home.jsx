import {
  HomeBanner,
  TicketSection,
} from "../components/Home Conponents/Swiper/Swiper";
import "./styles/Home.css";
import { CategoryWrapper } from "../components/Home Conponents/CategoryWrapper/CategoryWrapper";
import { Container } from "react-bootstrap";
export function Home() {
  return (
    <>
      <CategoryWrapper />
      <Container className="py-4">
        <HomeBanner />
        <TicketSection />
      </Container>
    </>
  );
}
