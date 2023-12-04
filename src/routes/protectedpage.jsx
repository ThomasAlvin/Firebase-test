import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ProtectedPage({
  children,
  needLogin = false,
  guestOnly = false,
}) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Clean up the observer when the component is unmounted
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (needLogin && !user.email) {
        setIsLoading(false);
        return nav("/");
      } else if (guestOnly && user?.email) {
        setIsLoading(false);
        return nav("/admin");
      } else {
        setIsLoading(false);
      }
      // No user is signed in
    });

    // Clean up the observer when the component is unmounted
    return () => unsubscribe();
  }, [children]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <>{isLoading ? <Loading /> : children}</>
    </>
  );
}
