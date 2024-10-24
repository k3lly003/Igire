'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/, ''); 
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP:', otp.join(''));
  };

  return (
    <div className="flex items-center justify-center md:px-4 px-2 pt-10 md:pt-24 bg-white">
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg max-w-2xl w-full md:mx-4">
        <div className="w-full md:w-2/5 bg-[#0B3004] text-white flex flex-col justify-center items-center p-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
          <Image
            src="/logo.png"
            alt="Igire Rwanda Organisation"
            width={100}
            height={100}
            priority={true}
            className="md:w-36 md:h-36 w-24 h-24"
          />
          <h1 className="text-lg md:text-xl font-bold mt-4">Igire Rwanda</h1>
          <p className="text-md md:text-lg mt-2">Organisation</p>
        </div>

        <div className="w-full md:w-3/5 flex justify-center items-center p-6 md:p-8">
          <div className="w-full max-w-xs md:max-w-sm">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">
              Enter OTP
            </h2>

            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 md:p-10 rounded-lg">
              <div className="flex space-x-3 md:space-x-2 mb-4 md:mb-6 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-${index}`}
                    className="w-10 h-10 md:w-12 md:h-12 text-center border bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 md:py-3 rounded-md hover:bg-green-600"
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
