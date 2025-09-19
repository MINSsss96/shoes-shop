import { useEffect, useState } from "react";

function Review({ productId, onStatsChange }) {
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [point, setPoint] = useState(5);

  useEffect(() => {
    fetch("https://zzzmini.github.io/js/shoesReview.json")
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item => Number(item.productId) === Number(productId));
        const sorted = filtered.sort((a, b) => b.reviewId - a.reviewId);
        setReviews(sorted);
        notifyStats(sorted);
      })
      .catch(err => console.error("리뷰 로드 실패:", err));
  }, [productId]);

  const notifyStats = (reviewList) => {
    if (onStatsChange) {
      const count = reviewList.length;
      const avg = count > 0 ? (reviewList.reduce((sum, r) => sum + r.point, 0) / count).toFixed(1) : 0;
      onStatsChange({ avg, count });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !comment) return;

    const newReview = {
      reviewId: Date.now(),
      productId: Number(productId),
      point: Number(point),
      title,
      review: comment,
      date: new Date().toLocaleString()
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    notifyStats(updated);

    setTitle("");
    setComment("");
    setPoint(5);
  };

  const handleDelete = (id) => {
    const updated = reviews.filter(r => r.reviewId !== id);
    setReviews(updated);
    notifyStats(updated);
  };

  const renderStars = (point) => {
    const fullStars = "★".repeat(point);
    const emptyStars = "☆".repeat(5 - point);
    return fullStars + emptyStars;
  };

  return (
    <div className="mt-3">
      <h5>리뷰</h5>

      {/* 작성 폼 */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="리뷰 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control mb-1"
          required
        />
        <textarea
          placeholder="리뷰 내용"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control mb-1"
          rows={3}
          required
        />
        <div className="d-flex align-items-center mb-1">
          <select
            value={point}
            onChange={(e) => setPoint(e.target.value)}
            className="form-control me-2"
          >
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}점</option>)}
          </select>
          <span>{renderStars(point)}</span>
        </div>
        <button type="submit" className="btn btn-primary btn-sm">작성</button>
      </form>

      {/* 리뷰 리스트 */}
      {reviews.length === 0 ? (
        <p>등록된 리뷰가 없습니다.</p>
      ) : (
        <div className="d-flex flex-column gap-2">
          {reviews.map((review) => (
            <div className="card" key={review.reviewId}>
              <div className="card-body">
                <h6 className="card-title">
                  {review.title} <span className="text-warning">{renderStars(review.point)}</span>
                </h6>
                <p className="card-text">{review.review}</p>
                {review.date && <small className="text-muted">{review.date}</small>}
                <button
                  className="btn btn-sm btn-outline-danger float-end"
                  onClick={() => handleDelete(review.reviewId)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Review;
