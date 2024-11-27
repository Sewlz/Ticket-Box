import "./styles/Home.css";
import { CategoryWrapper } from "../components/Home Conponents/CategoryWrapper";
import { TicketBanner } from "../components/Event Detail Conponents/TicketBanner";
import { EventDetails } from "../components/Event Detail Conponents/EventDescription";

export function EventDetail() {
  return (
    <>
      <CategoryWrapper />
      <TicketBanner />
      <EventDetails />
    </>
  );
}
