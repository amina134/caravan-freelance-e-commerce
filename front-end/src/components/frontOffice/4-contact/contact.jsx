import './contact.css';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert('Message sent successfully!');
  };

  return (
    <div className='contact-container'>
      <div className="contact-header">
        <h1>What are you looking for?</h1>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-section">
            <h3>Call To Us</h3>
            <p>We are available 24/7, 7 days a week.</p>
            <p className="contact-detail">Phone: +219 99 432 123</p>
          </div>
          
          <div className="info-section">
            <h3>Write To US</h3>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p className="contact-detail">Email: customer@caravan.com</p>
            <p className="contact-detail">Email: support@caravan.com</p>
          </div>
        </div>
        
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="Your Name *" 
                  required 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input 
                  type="email" 
                  placeholder="Your Email *" 
                  required 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input 
                  type="tel" 
                  placeholder="Your Phone *" 
                  required 
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-group">
              <textarea 
                placeholder="Your Message" 
                rows="6"
                className="form-textarea"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;