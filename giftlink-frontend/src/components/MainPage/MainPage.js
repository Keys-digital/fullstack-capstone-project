import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);  // New loading state
  const navigate = useNavigate();

  // Fetch gifts on component mount
  useEffect(() => {
    const fetchGifts = async () => {
      try {
        let url = `${urlConfig.backendUrl}/api/gifts`; // Using backend URL from config
        console.log('Fetching gifts from:', url);  // Log the API URL for debugging
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGifts(data);  // Update state with fetched data
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching gifts:', error);  // Log any errors
        setLoading(false);  // Set loading to false even on error
        alert('There was an error fetching the gifts data. Please try again later.');
      }
    };

    fetchGifts();
  }, []);

  const goToDetailsPage = (productId) => {
    navigate(`/app/product/${productId}`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const getConditionClass = (condition) => {
    return condition === "New" ? "list-group-item-success" : "list-group-item-warning";
  };

  if (loading) {
    return <div>Loading gifts...</div>;  // Show loading message if gifts are still being fetched
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {gifts.map((gift) => (
          <div key={gift.id} className="col-md-4 mb-4">
            <div className="card product-card">
              <div className="image-placeholder">
                {gift.image ? (
                  <img src={gift.image} alt={gift.name} />
                ) : (
                  <div className="no-image-available">No Image Available</div>
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{gift.name}</h5>
                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                  {gift.condition}
                </p>
                <p className="card-text date-added">
                  {formatDate(gift.date_added)}
                </p>
              </div>
              <div className="card-footer">
                <button
                  onClick={() => goToDetailsPage(gift.id)}
                  className="btn btn-primary w-100"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;
