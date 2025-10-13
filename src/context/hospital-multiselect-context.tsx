import { getAllVerifiedSalary } from "@/app/api/salary/get-salary";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type VerifiedSalary = {
  data: {
    wage: number;
    year: number;
  }[];
  name: string;
};

type HospitalMultiSelectContextType = {
  allHospitals: VerifiedSalary[];
  allHospitalNames: string[];
  selectedHospitals: (string | null)[];
  setSelectedHospitals: React.Dispatch<React.SetStateAction<(string | null)[]>>;
  selectedVerifiedSalaries: VerifiedSalary[];
};

const HospitalMultiselectContext = createContext<
  HospitalMultiSelectContextType | undefined
>(undefined);

export const HospitalMultiselectProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedHospitals, setSelectedHospitals] = useState<(string | null)[]>(
    [null, null, null],
  );
  const [allHospitals, setAllHospitals] = useState<VerifiedSalary[]>([]);
  const [allHospitalNames, setAllHospitalNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchVerifiedSalaries = async () => {
      const verifiedSalary = await getAllVerifiedSalary();
      setAllHospitals(verifiedSalary || []);
      setAllHospitalNames((verifiedSalary || []).map((vS) => vS.name));
    };
    fetchVerifiedSalaries();
  }, []);

  const selectedVerifiedSalaries = useMemo(
    () => allHospitals.filter((h) => selectedHospitals.includes(h.name)),
    [selectedHospitals],
  );

  return (
    <HospitalMultiselectContext.Provider
      value={{
        allHospitals,
        allHospitalNames,
        selectedHospitals,
        setSelectedHospitals,
        selectedVerifiedSalaries,
      }}
    >
      {children}
    </HospitalMultiselectContext.Provider>
  );
};

export const useHospitalMultiselectContext = () => {
  const context = useContext(HospitalMultiselectContext);
  if (!context) {
    throw new Error(
      "useHospitalMultiselect must be used within a HospitalMultiselectProvider",
    );
  }
  return context;
};
