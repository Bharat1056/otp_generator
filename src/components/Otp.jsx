import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Otp({ length }) {
  const ref = useRef(new Array(length).fill(""));
  const [toastId, setToastId] = useState(null);

  const notify = (message) => {
    if (toastId) {
      toast.dismiss(toastId);
    }
    const id = toast(message, {
      duration: 3000,
    });

    setToastId(id);
  };

  const handleChange = (index, value) => {
    if (isNaN(value) || value === " ") {
      ref.current[index].value = "";
      notify("Invalid input");
      return;
    }
    // Check if the previous index is filled or not
    if (index - 1 >= 0 && ref.current[index - 1].value.length === 0) {
      ref.current[index].value = "";
      handleChange(index - 1, value);
      return;
    }
    // it shows the most right value
    ref.current[index].value = value.substring(value.length - 1);

    const otpValueArray = ref.current.map((input) => input.value);
    if (!otpValueArray.includes("") && !otpValueArray.includes(" ")) {
      notify(`OTP Fetched Successfully: ${otpValueArray.join("")}`);
      let timeout;
      for (let index = 0; index < length+1; index++) {
        timeout = setTimeout(() => {
          console.log(index)
          console.log(ref.current[index]);
          ref.current[index].focus();
        }, index * 200);
      }
      clearTimeout(timeout);
    }

    if (
      ref.current[index].value.length === 1 &&
      index < length - 1 &&
      ref.current[index + 1]
    ) {
      ref.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    if (index - 1 >= 0 && ref.current[index - 1].value.length === 0) {
      return handleClick(index - 1);
    }
    ref.current[index].focus();
  };

  function autoFocus(index) {
    if (
      index < length &&
      ref.current[index].value.length === 1 &&
      ref.current[index + 1]
    ) {
      return autoFocus(index + 1);
    }
    return ref.current[index]?.focus();
  }

  useEffect(() => {
    autoFocus(0);
  }, []);

  function handleBackSpace(index) {
    if (
      index - 1 >= 0 &&
      ref.current[index].value.length === 0 &&
      ref.current[index - 1]
    ) {
      ref.current[index - 1].focus();
      ref.current[index - 1].value = "";
    } else {
      ref.current[index].value = "";
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen font-extrabold bg-[#1a1a2e]">
        <h1 className="text-4xl text-[#e0e0e0] mb-8">OTP Verification</h1>
        <div className="flex space-x-4">
          {new Array(length).fill(null).map((_, index) => (
            <input
              key={index}
              type="text"
              ref={(input) => (ref.current[index] = input)}
              onChange={(e) => handleChange(index, e.target.value.trim())}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => e.key === "Backspace" && handleBackSpace(index)}
              className="w-14 h-14 text-center text-[#e0e0e0] bg-[#2b2d45] border border-[#7f00ff] rounded-lg shadow-md focus:outline-none focus:border-[#e0e0e0] focus:shadow-lg focus:shadow-[#e0e0e0]/50 transition-all duration-200"
            />
          ))}
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default Otp;
