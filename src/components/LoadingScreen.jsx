import ClockLoader from "react-spinners/ClockLoader";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClockLoader
        size={150}
        color={"#172554 "}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingScreen;
