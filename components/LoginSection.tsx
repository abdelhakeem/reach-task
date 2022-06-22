import { useState } from "react";

type LoginSectionProps = {
  submitHandler: Function;
};

const LoginSection = ({ submitHandler }: LoginSectionProps) => {
  const [orgId, setOrgId] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <form className="flex flex-col justify-start items-center gap-2">
      <input
        type="text"
        placeholder="Organization ID"
        value={orgId}
        onChange={(e) => setOrgId(e.target.value)}
        className="input input-bordered"
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="input input-bordered"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          submitHandler(userId, orgId);
        }}
        className="btn btn-primary w-full"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginSection;
