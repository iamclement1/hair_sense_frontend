import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const useDataErrorToast = (error, data, setActivePage) => {
  const toastShown = useRef(false);

  useEffect(() => {
    if ((error || !data) && !toastShown.current) {
      setActivePage(1);
      toast.error("Sorry 😞, you don't have access. Kindly contact support!");
      toastShown.current = true;
    }
  }, [error, data, setActivePage]);
};

export default useDataErrorToast;
