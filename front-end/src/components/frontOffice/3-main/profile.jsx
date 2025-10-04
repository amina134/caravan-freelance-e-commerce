<<<<<<< HEAD
=======

>>>>>>> 47cb3df (correct corrupted git files)
import React, { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Edit, Heart, Calendar, Clock } from 'lucide-react';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../../redux/userSlice';
import { updateUser } from '../../../api/userApi';

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const { currentUser } = useSelector((state) => state.userElement);
    console.log("cuurent user debut",currentUser);
  const dispatch=useDispatch();
  const [customerData, setCustomerData] = useState(
  {...currentUser}
  );
 
  console.log("current user profile ",customerData)
  
    const handleInputChange = (field, value) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  
    
  };
  const handleSave = async () => {
  setIsEditing(false);
  
  try {
    console.log("redux user ",customerData)
    const data = await updateUser(currentUser._id, customerData); 
    console.log("verification",data.updatedUser)
     dispatch(setCurrentUser(data.updatedUser));
     
    console.log("Updated user:", data);
    
    alert('Profile updated!');
  } catch (err) {
    console.error(err);
    alert('Failed to update profile');
  }
};

  
  


  const recentOrders = [
    { id: 1, dish: 'Margherita Pizza', date: '2025-09-20', price: '18.000 DT' },
    { id: 2, dish: 'Caesar Salad', date: '2025-09-18', price: '12.500 DT' },
    { id: 3, dish: 'Grilled Salmon', date: '2025-09-15', price: '25.000 DT' }
  ];

  const favoriteItems = ['Margherita Pizza', 'Caesar Salad', 'Tiramisu', 'Fresh Orange Juice'];

  return (
    <div className="profile-container">
      <div className="profile-inner">
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your account and dining preferences</p>
        </div>

        <div className="profile-grid">
          {/* Profile Card */}
          <div>
            <div className="card">
              <div className="card-header">
                <h2>Personal Information</h2>
                <button onClick={isEditing? handleSave :()=>{setIsEditing(true)}}>
                  <Edit size={16} />
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>

              <div className="profile-form">
                <div>
                  <label><User size={16} />User Name</label>
                  <input type="text" value={customerData.userName   } disabled={!isEditing}
                         onChange={e => handleInputChange('userName', e.target.value)} />
                </div>
                <div>
                  <label><Mail size={16} /> Email</label>
                  <input type="email" value={customerData.email} disabled={!isEditing}
                         onChange={e => handleInputChange('email', e.target.value)} />
                </div>
                <div>
                  <label><Phone size={16} /> Phone</label>
                  <input type="tel" value={customerData.phone} disabled={!isEditing}
                         onChange={e => handleInputChange('phone', e.target.value)} />
                </div>
                <div>
                  <label><MapPin size={16} /> Address</label>
                  <input type="text" value={customerData.address} disabled={!isEditing}
                         onChange={e => handleInputChange('address', e.target.value)} />
                </div>
                
              </div>
            </div>

            {/* Recent Orders */}
            <div className="card recent-orders" style={{ marginTop: '1.5rem' }}>
              <h2><Clock size={20} /> Recent Orders</h2>
              {recentOrders.map(order => (
                <div key={order.id}>
                  <div>
                    <p>{order.dish}</p>
                    <p><Calendar size={14} /> {order.date}</p>
                  </div>
                  <span>{order.price}</span>
                </div>
              ))}
              <button>View All Orders</button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="card">
              <div className="avatar"><User size={32} /></div>
            
              <p>{customerData.userName}</p>
              {/* <div>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color:'#f97316'}}>127</p>
                <p>Total Orders</p>
              </div> */}
            </div>

            {/* <div className="card favorites">
              <h3><Heart size={18} /> Favorite Items</h3>
              {favoriteItems.map((item, index) => (
                <div key={index}><Heart size={14} /> {item}</div>
              ))}
            </div> */}

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
