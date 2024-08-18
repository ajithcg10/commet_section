import { useEffect, useState, useRef } from "react";
import {
  collection,
  DocumentData,
  onSnapshot,
  query,
  QuerySnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Comment } from "./type"; // Replace with your actual type

const useFirestore = (collectionName: string) => {
  const [data, setData] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const unsubscribeRef = useRef<Unsubscribe | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(firestore, collectionName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const data: Comment[] = querySnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as Comment)
          );
          setData(data);
          setLoading(false); // Update loading state after initial data fetch
        });
        unsubscribeRef.current = unsubscribe;
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false); // Ensure loading state updates even on errors
      }
    };

    fetchData();

    return () => {
      // Cleanup function to unsubscribe from real-time listener
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [collectionName]);

  return { data, loading, error };
};

export default useFirestore;
