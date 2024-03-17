import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const useDataErrorToast = (error, data, setActivePage) => {
  const toastShown = useRef(false);

  useEffect(() => {
    if ((error || !data) && !toastShown.current) {
      setActivePage(1);
      toast.error("Unable to fetch data, Kindly contact support!");
      toastShown.current = true;
    }
  }, [error, data, setActivePage]);
};

export default useDataErrorToast;
