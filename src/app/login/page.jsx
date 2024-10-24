'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { Button } from '@/components/ui/button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const loginData = { email, password };

    try {
      const response = await fetch('http://iro-website-bn-vx04.onrender.com/api/Inventory/users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Failed to log in');
      }

      const result = await response.json();
      setSuccessMessage("Login successful!");
      localStorage.setItem('token', result.token); 
      router.push('/dashboard/admin');

    } catch (error) {
      setErrorMessage(
        error.message === 'Failed to log in'
          ? 'An error occurred, please try again.'
          : 'Invalid username or password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center sm:mr-0 md:px-4 px-2 pt-10 md:pt-15 bg-white">
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg max-w-3xl w-full mx-0 md:mx-4">
        <div className="w-full md:w-2/5 bg-[#0B3004] text-white flex flex-col justify-center items-center p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <Image
            src="/logo.png"
            alt="Igire Rwanda Organisation"
            width={100}
            height={100}
            priority={true}
            className="md:w-36 md:h-36 w-24 h-24"
          />
          <div className='flex flex-col items-center'>
            <h1 className="text-lg md:text-xl font-bold mt-4">Igire Rwanda</h1>
            <p className="text-md md:text-lg mt-2">Organisation</p>
          </div>
        </div>

        <div className="w-full md:w-3/5 flex justify-center items-center p-6 md:p-8">
          <div className="w-full max-w-xs md:max-w-sm">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Login</h2>

            {successMessage && (
              <div className="mb-4 text-green-600 text-center">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-600 text-center">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 md:p-10 rounded-lg">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="relative">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-4 py-2 pr-12 border bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute inset-y-0 mt-5 right-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} />}
                </span>
              </div>

              <div className="py-3 text-end">
                <a href="/resetpassword" className="text-green-800 hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 md:py-3 rounded-md hover:bg-green-600"
                disabled={loading}
              >
                {loading ? <span className="spinner"></span> : 'Sign In'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
