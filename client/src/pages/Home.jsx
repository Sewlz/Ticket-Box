import {
  HomeBanner,
  TicketSection,
} from "../components/Home Conponents/Swiper";
import "./styles/Home.css";
import { CategoryWrapper } from "../components/Home Conponents/CategoryWrapper";
export function Home() {
  return (
    <>
      <CategoryWrapper />
      <div className="home-container">
        <HomeBanner />
        <TicketSection />
      </div>
    </>
  );
}
