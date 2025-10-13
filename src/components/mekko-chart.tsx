import { useHospitalMultiselectContext } from "@/context/hospital-multiselect-context";

// light blue, light green, light yellow
// TODO: replace with better colros later (use theme colors from tailwind/shadcn)
const possibleColors = ["#ADD8E6", "#90EE90", "#FFFFE0"];

export const MekkoChart = () => {
  const { selectedVerifiedSalaries } = useHospitalMultiselectContext();

  return (
    <div className="flex gap-2">
      {selectedVerifiedSalaries.map((pay, payIndex) => {
        const totalExperienceYears = pay.data[pay.data.length - 1].year;
        return (
          <div key={payIndex} className="w-full">
            <div className="truncate max-w-[120px]">{pay.name}</div>
            <div className="flex flex-col gap-2 h-500">
              {pay.data.map(({ year, wage }, levelIndex) => {
                const yearUpperBound =
                  levelIndex === pay.data.length - 1
                    ? year + 1
                    : pay.data[levelIndex + 1].year;
                const heightPercentage = Math.fround(
                  ((yearUpperBound - year) / totalExperienceYears) * 100,
                );
                console.log(
                  ">>> heighPercentage",
                  heightPercentage,
                  levelIndex,
                );
                return (
                  <div
                    key={levelIndex}
                    className="flex flex-row justify-center items-center rounded gap-2"
                    style={{
                      backgroundColor: possibleColors[payIndex] || "gray-200",
                      height: `${heightPercentage}%`,
                    }}
                  >
                    <div className="font-bold">{`Step: ${levelIndex + 1}`}</div>
                    <div>{`$${wage}`}</div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
