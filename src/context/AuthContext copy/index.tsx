import { ReactNode, createContext, useEffect, useState } from "react";

import { ImageType, PlanType } from "../../types";
import imagesService from "../../services/images.service";
import plansService from "../../services/plans.service";

interface StoreContextType {
  images: ImageType[];
  plans: PlanType[];
  isLoading: boolean;
}

export const StoreContext = createContext<StoreContextType>({
  images: [],
  plans: [],
  isLoading: false,
});

export const StoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [images, setImages] = useState<ImageType[]>([]); // New loading state
  const [plans, setPlans] = useState<PlanType[]>([]); // New loading state
  const [isLoading, setIsLoading] = useState(true ); // New loading state

  useEffect(() => {
    setIsLoading(true);
    const fetchImages = async () => {
      try {
        const imageRes = await imagesService.getAll();
        const plansRes = await plansService.getAll();
        setImages(imageRes);
        setPlans(plansRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchImages();
    setIsLoading(false);
  }, []);

  return (
    <StoreContext.Provider value={{ images, plans, isLoading }}>
      {children}
    </StoreContext.Provider>
  );
};
