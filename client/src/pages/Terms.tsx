import React from "react";
import "../styles/terms.css";

const Terms: React.FC = () => {
    return (
        <div className="terms-container">
            <h1>Terms & Conditions</h1>
            <p>Effective Date: [Insert Date]</p>
            
            <h2>1. Introduction</h2>
            <p>Welcome to [Dealership Name]. By accessing our website and using our services, you agree to abide by the following terms and conditions. Please read them carefully.</p>
            
            <h2>2. Vehicle Information & Availability</h2>
            <p>All vehicles listed on our website are subject to availability. We strive to provide accurate and up-to-date information, but we do not guarantee that all listings are error-free.</p>
            
            <h2>3. Pricing & Payments</h2>
            <p>Prices listed on our website are subject to change without notice. Taxes, fees, and additional charges may apply. Financing options are available subject to approval.</p>
            
            <h2>4. Test Drives & Inspections</h2>
            <p>Customers are encouraged to test drive and inspect vehicles before purchase. All test drives require a valid driver’s license and proof of insurance.</p>
            
            <h2>5. Warranty & Service</h2>
            <p>Some vehicles may come with manufacturer warranties or dealership-provided service plans. Please review warranty terms before purchase.</p>
            
            <h2>6. Returns & Refunds</h2>
            <p>All vehicle sales are final. Refunds or returns are not permitted unless explicitly stated in a written agreement.</p>
            
            <h2>7. Privacy Policy</h2>
            <p>Your personal information is handled in accordance with our Privacy Policy. We do not sell or share your data without consent.</p>
            
            <h2>8. Limitation of Liability</h2>
            <p>[Dealership Name] is not responsible for any direct, indirect, or incidental damages resulting from vehicle purchases or use of our website.</p>
            
            <h2>9. Amendments</h2>
            <p>We reserve the right to update these terms at any time. Continued use of our services constitutes agreement to the revised terms.</p>
            
            <h2>10. Contact Information</h2>
            <p>If you have any questions about these terms, please contact us at [Dealership Contact Information].</p>
        </div>
    );
};

export default Terms;
