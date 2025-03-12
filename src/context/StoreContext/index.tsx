import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { ImageType, PlanType } from "../../types";
import imagesService from "../../services/images.service";
import plansService from "../../services/plans.service";

interface StoreContextType {
  images: ImageType[];
  plans: PlanType[];
  updatePlans: (newPlans: PlanType[]) => void;
  updateImages: (newImages: ImageType[]) => void;
  isLoading: boolean;
}

export const StoreContext = createContext<StoreContextType>({
  images: [],
  plans: [],
  updatePlans: () => {},
  updateImages: () => {},
  isLoading: false,
});

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [plans, setPlans] = useState<PlanType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const updatePlans = useCallback((newPlans: PlanType[]) => {
    setPlans(newPlans);
  }, []);

  const updateImages = useCallback((newImages: ImageType[]) => {
    setImages(newImages);
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [imageRes, plansRes] = await Promise.all([
        imagesService.getAll(),
        plansService.getAll(),
      ]);
      setImages(imageRes);
      setPlans(plansRes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <StoreContext.Provider
      value={{ images, plans, isLoading, updatePlans, updateImages }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStoreContext must be used within a StoreProvider");
  }
  return context;
};
