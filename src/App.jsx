import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    college: '',
    email: '',
    password: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        return '';
      case 'username':
        if (/[A-Z]/.test(value)) return 'Username must be lowercase only';
        return '';
      case 'college':
        if (!value.trim()) return 'College is required';
        return '';
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Enter a valid email address';
        return '';
      }
      case 'password':
        if (value.length < 8) return 'Password must be at least 8 characters';
        return '';
      case 'address':
        if (!value.trim()) return 'Address is required';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // If there is currently an error displayed for this field,
    // re-validate to dismiss the error message once it becomes valid
    if (errors[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: errorMsg,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField('name', formData.name),
      username: validateField('username', formData.username),
      college: validateField('college', formData.college),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      address: validateField('address', formData.address),
    };

    const activeErrors = {};
    let isValid = true;
    Object.entries(newErrors).forEach(([key, msg]) => {
      if (msg) {
        activeErrors[key] = msg;
        isValid = false;
      }
    });

    setErrors(activeErrors);

    if (isValid) {
      console.log('Form submitted successfully:', formData);
    }
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1 className="form-title">Student Registration Form</h1>
        <form noValidate onSubmit={handleSubmit} className="student-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'input-error' : ''}
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="college">College</label>
            <input
              id="college"
              type="text"
              name="college"
              placeholder="Enter college"
              value={formData.college}
              onChange={handleChange}
              className={errors.college ? 'input-error' : ''}
            />
            {errors.college && <p className="error-message">{errors.college}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <p className="error-message">{errors.address}</p>}
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
