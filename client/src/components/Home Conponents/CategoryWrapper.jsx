import "./style/CategoryWrapper.css";
import { useNavigate } from "react-router-dom";
export function CategoryWrapper() {
  const navigate = useNavigate();
  return (
    <div className="tbox-container">
      <div className="content" id="categories-content">
        <div
          className="item-category"
          onClick={() => navigate(`/view-all?query=?category=Music`)}
        >
          <span>Nhạc sống</span>
        </div>
        <div
          className="item-category"
          onClick={() => navigate(`/view-all?query=?category=Stage`)}
        >
          <span>Sân khấu &amp; Nghệ thuật</span>
        </div>
        <div
          className="item-category"
          onClick={() => navigate(`/view-all?query=?category=Sports`)}
        >
          <span>Thể Thao</span>
        </div>
        <div
          className="item-category"
          onClick={() => navigate(`/view-all?query=?category=Others`)}
        >
          <span>Khác</span>
        </div>
      </div>
    </div>
  );
}
