import "./styles/Home.css";
import { CategoryWrapper } from "../components/Home Conponents/CategoryWrapper";
import { Container } from "react-bootstrap";
import { ViewAllEvents } from "../components/View All Conponents/ViewAll";
import { useSearchParams } from "react-router-dom";
export function ViewAll() {
  const [params] = useSearchParams();
  const key = params.get("query");
  return (
    <>
      <CategoryWrapper />
      <Container className="py-4">
        <ViewAllEvents {...{ title: "Ticket Sale", params: key }} />
      </Container>
    </>
  );
}
