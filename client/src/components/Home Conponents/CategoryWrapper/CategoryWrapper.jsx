import { Container } from "react-bootstrap";
import "./CategoryWrapper.css";
export function CategoryWrapper() {
  return (
    <div className="tbox-container">
      <Container>
        <div className="content" id="categories-content">
          <div className="item-category">
            <span>Nhạc sống</span>
          </div>
          <div className="item-category">
            <span>Sân khấu &amp; Nghệ thuật</span>
          </div>
          <div className="item-category">
            <span>Thể Thao</span>
          </div>
          <div className="item-category">
            <span>Khác</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
