import {
  HomeBanner,
  TicketSection,
} from "../components/Home Conponents/Swiper";
import "./styles/Home.css";
import { CategoryWrapper } from "../components/Home Conponents/CategoryWrapper";
import { Container } from "react-bootstrap";
export function Home() {
  return (
    <>
      <CategoryWrapper />
      <Container className="py-4">
        <HomeBanner />
        <TicketSection {...{ title: "Ticket Sale", param: "/latest" }} />
        <TicketSection
          {...{ title: "Music Event", param: "?category=Music" }}
        />
      </Container>
    </>
  );
}
