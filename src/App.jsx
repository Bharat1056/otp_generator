import Otp from "./components/Otp";

const MAX_OTP_FIELD = 5;

function App() {
  return (
    <>
      <Otp length={MAX_OTP_FIELD} />
    </>
  );
}

export default App;
