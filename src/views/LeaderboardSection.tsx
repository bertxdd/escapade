import { useEffect, useState } from "react";
import starsBg from "../assets/strrrs.png";
import stopwatchIcon from "../assets/stopwatch.png";
import { ScrollReveal } from "../components/ScrollReveal";
import { getCrews } from "../controllers/crewController";
import type { CrewWithEscapeTime } from "../models/crewModel";

// Helper function to format seconds into HH:MM:SS
const formatTime = (totalSeconds: number | null) => {
  if (totalSeconds === null) return "--:--:--";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export function LeaderboardSection() {
  const [leaderboardData, setLeaderboardData] = useState<CrewWithEscapeTime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getCrews();
        
        // Filter out crews that don't have an escape time yet, then sort by fastest time
        const validCrews = data
          .filter((crew) => crew.escape_time !== null)
          .sort((a, b) => (a.escape_time as number) - (b.escape_time as number));
          
        setLeaderboardData(validCrews);
      } catch (error) {
        console.error("Error loading leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  // Adjusted styles for thinner boxes and specifically larger CREW NAME text
  const rankStyles = [
    { 
      rank: "1st", 
      textClass: "text-[#FEFA09]",
      iconClass: "bg-[#FEFA09]", 
      paddingClass: "py-4 sm:py-5", 
      rankSize: "text-4xl sm:text-5xl",
      crewSize: "text-2xl sm:text-4xl", // <-- INCREASED CREW SIZE
      timeSize: "text-lg sm:text-2xl",  // Kept time size the same
      iconSize: "w-6 h-6 sm:w-8 sm:h-8",
      rowStyle: {
        backgroundColor: "rgba(254, 250, 9, 0.2)", 
        borderColor: "#FEFA09",
        borderWidth: "2px",
        borderStyle: "solid",
        boxShadow: "0px 15px 40px 0px rgba(242, 194, 0, 0.2)",
      }
    },
    { 
      rank: "2nd", 
      textClass: "text-white",
      iconClass: "bg-white", 
      paddingClass: "py-3 sm:py-4", 
      rankSize: "text-3xl sm:text-4xl",
      crewSize: "text-xl sm:text-3xl", // <-- INCREASED CREW SIZE
      timeSize: "text-base sm:text-xl",
      iconSize: "w-5 h-5 sm:w-7 sm:h-7",
      rowStyle: {
        backgroundColor: "rgba(177, 179, 181, 0.3)", 
        borderColor: "#A0A0A0",
        borderWidth: "2px",
        borderStyle: "solid",
      }
    },
    { 
      rank: "3rd", 
      textClass: "text-[#CD7F32]",
      iconClass: "bg-[#CD7F32]", 
      paddingClass: "py-2.5 sm:py-3.5", 
      rankSize: "text-2xl sm:text-3xl",
      crewSize: "text-lg sm:text-2xl", // <-- INCREASED CREW SIZE
      timeSize: "text-base sm:text-lg",
      iconSize: "w-5 h-5 sm:w-6 sm:h-6",
      rowStyle: {
        backgroundColor: "rgba(205, 127, 50, 0.2)", 
        borderColor: "#9E7B4F",
        borderWidth: "2px",
        borderStyle: "solid",
        boxShadow: "0px 15px 40px 0px rgba(158, 123, 79, 0.2)", 
      }
    },
    { 
      rank: "4th", 
      textClass: "text-[#CEDFFB]",
      iconClass: "bg-[#CEDFFB]", 
      paddingClass: "py-2 sm:py-3", 
      rankSize: "text-xl sm:text-2xl",
      crewSize: "text-base sm:text-xl", // <-- INCREASED CREW SIZE
      timeSize: "text-sm sm:text-base",
      iconSize: "w-4 h-4 sm:w-5 sm:h-5",
      rowStyle: {
        backgroundColor: "rgba(7, 20, 102, 0.2)", 
        borderColor: "rgba(7, 20, 102, 0.5)",
        borderWidth: "2px",
        borderStyle: "solid",
      }
    },
    { 
      rank: "5th", 
      textClass: "text-[#CEDFFB]",
      iconClass: "bg-[#CEDFFB]", 
      paddingClass: "py-2 sm:py-3", 
      rankSize: "text-xl sm:text-2xl",
      crewSize: "text-base sm:text-xl", // <-- INCREASED CREW SIZE
      timeSize: "text-sm sm:text-base",
      iconSize: "w-4 h-4 sm:w-5 sm:h-5",
      rowStyle: {
        backgroundColor: "rgba(7, 20, 102, 0.2)", 
        borderColor: "rgba(7, 20, 102, 0.5)",
        borderWidth: "2px",
        borderStyle: "solid",
      }
    },
  ];

  const displayRankings = rankStyles.map((style, index) => {
    const crew = leaderboardData[index];
    return {
      ...style,
      team: crew ? crew.crew_name : "---",
      time: crew ? formatTime(crew.escape_time) : "--:--:--",
    };
  });

  return (
    <section
      id="leaderboard"
      style={{ backgroundImage: `url(${starsBg})` }}
      className="min-h-screen flex flex-col items-center py-24 sm:py-32 px-4 sm:px-8 border-t border-white/10 text-white bg-cover bg-center bg-no-repeat"
    >
      <div className="w-full max-w-4xl flex flex-col items-center">
        {/* Animated Heading */}
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-orbitron font-extrabold text-white uppercase tracking-widest mb-12 text-center">
            MISSION RANKINGS
          </h2>
        </ScrollReveal>

        {/* Animated Container */}
        <ScrollReveal delay="100ms" className="w-full">
          <div className="w-full flex flex-col gap-3 sm:gap-4">
            
            {/* Table Headers */}
            <div className="flex items-center justify-between px-6 sm:px-10 pb-2 text-xl sm:text-2xl font-orbitron font-bold text-white uppercase tracking-wider">
              <div className="flex items-center gap-12 sm:gap-16">
                <span className="w-16 text-center">RANK</span>
                <span>CREW NAME</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Header Stopwatch Mask */}
                <div 
                  className="w-6 h-6 sm:w-8 sm:h-8 bg-white [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]" 
                  style={{ 
                    WebkitMaskImage: `url(${stopwatchIcon})`, 
                    maskImage: `url(${stopwatchIcon})` 
                  }} 
                />
                <span>TIME</span>
              </div>
            </div>

            {/* Loading State or Leaderboard Rows */}
            {loading ? (
              <div className="text-center py-10 font-orbitron text-2xl text-white/50">
                LOADING RANKS...
              </div>
            ) : (
              displayRankings.map((item, index) => (
                <ScrollReveal key={index} delay={`${150 + index * 80}ms`}>
                  <div
                    style={item.rowStyle}
                    className={`flex items-center justify-between px-6 sm:px-10 ${item.paddingClass} rounded-2xl sm:rounded-3xl backdrop-blur-md transition-all`}
                  >
                    <div className="flex items-center gap-12 sm:gap-16">
                      {/* Rank */}
                      <span className={`w-16 text-center font-space-grotesk font-bold ${item.rankSize} ${item.textClass}`}>
                        {item.rank}
                      </span>
                      {/* Crew Name - Now uses dedicated item.crewSize */}
                      <span className={`font-space-grotesk font-medium tracking-wide ${item.crewSize} ${item.textClass}`}>
                        {item.team}
                      </span>
                    </div>
                    
                    {/* Time - Now uses dedicated item.timeSize */}
                    <div className={`flex items-center gap-2 sm:gap-3 font-space-grotesk font-medium tracking-wide ${item.timeSize} ${item.textClass}`}>
                      {/* Dynamic Stopwatch Mask */}
                      <div 
                        className={`${item.iconSize} ${item.iconClass} [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]`}
                        style={{ 
                          WebkitMaskImage: `url(${stopwatchIcon})`, 
                          maskImage: `url(${stopwatchIcon})` 
                        }} 
                      />
                      {item.time}
                    </div>
                  </div>
                </ScrollReveal>
              ))
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}