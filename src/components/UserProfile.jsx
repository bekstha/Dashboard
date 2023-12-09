import { Button } from "antd";

const UserProfile = () => {
  return (
    <div className="nav-item absolute right-1 top-16 bg-blue dark:bg-[#42464D] p-8 rounded-lg w-96">

      <div className="mt-1">
        <Button
        type="primary"
        >
          Logout
        </Button>
      </div>
    </div>

  );
};

export default UserProfile;
