import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
function SignOutButton() {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Has been loged out", type: "SUCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });
  const logutHandle = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={logutHandle}
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
