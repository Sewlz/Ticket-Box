import "./styles/Home.css";
import { CategoryWrapper } from "../components/Home Conponents/CategoryWrapper/CategoryWrapper";
import { TicketBanner } from "../components/Event Detail Conponents/TicketBanner/TicketBanner";
import { EventDetails } from "../components/Event Detail Conponents/EventDescription/EventDescription";
import { TicketList } from "../components/Event Detail Conponents/TicketList/TicketList";

export function EventDetail() {
  return (
    <>
      <CategoryWrapper />
      <TicketBanner />
      <EventDetails />
      <TicketList />
    </>
  );
}
