"use client";

import React, { useEffect, useState } from "react";
import useInView from "@/hooks/useInView";
import ReportModal from "@/components/shared/ReportModal";
import NewsModal from "@/components/shared/NewsModal"; // ✅ Νέο import
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Tilt from "react-parallax-tilt";
import { cn } from "@/lib/cn";

interface DataPoint {
  time: string;
  reports: number;
}

interface Report {
  time: string;
  description: string;
  ip: string;
}

interface ApiResponse {
  reports: Report[];
}

const HeroSection: React.FC = () => {
  const { ref, isIntersecting } = useInView(0.2);
  const [data, setData] = useState<DataPoint[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false); // ✅ Νέο state

  useEffect(() => {
    const loadReports = async () => {
      try {
        const res = await fetch("/api/report");
        const result: ApiResponse = await res.json();

        const now = new Date();
        const hoursArray = Array.from({ length: 24 }, (_, i) => {
          const date = new Date(now);
          date.setHours(now.getHours() - (23 - i));
          const hourLabel = `${date.getHours().toString().padStart(2, "0")}:00`;
          const reportsForHour = result.reports.filter((r: Report) => {
            const reportDate = new Date(r.time);
            return reportDate.getHours() === date.getHours();
          }).length;

          return { time: hourLabel, reports: reportsForHour };
        });

        setData(hoursArray);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    loadReports();
  }, []);

  const handleReportClick = () => {
    setShowModal(true);
  };

  return (
    <section className="text-white px-6 py-20 relative">
      {/* Background blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-500/20 blur-3xl opacity-20"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Τίτλος */}
        <h1
          ref={ref}
          className={cn(
            "text-5xl sm:text-6xl font-extrabold mb-4 text-white drop-shadow-xl transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          Ζωντανός Χάρτης Σεισμών Ελλάδας
        </h1>

        {/* Περιγραφή */}
        <p
          className={cn(
            "text-lg sm:text-xl text-white max-w-3xl mb-8 leading-relaxed transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          Παρακολουθήστε την εξέλιξη της σεισμικής δραστηριότητας σε πραγματικό χρόνο.
        </p>

        {/* Κουμπιά */}
        <div
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <button
            onClick={handleReportClick}
            className="
              bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
              text-white px-6 py-3 rounded-full
              font-semibold text-lg shadow-xl
              transition-all duration-300 ease-in-out
              transform hover:-translate-y-1 hover:scale-105
            "
          >
            Αισθάνθηκα Σεισμό
          </button>

          <button
            onClick={() => setShowNewsModal(true)}
            className="
              bg-gradient-to-r from-white to-gray-200 hover:from-gray-200 hover:to-gray-300
              text-gray-900 px-6 py-3 rounded-full
              font-semibold text-lg shadow-xl
              transition-all duration-300 ease-in-out
              transform hover:-translate-y-1 hover:scale-105
            "
          >
            Έγκυρες Πηγές Σεισμών
          </button>
        </div>

        {/* Chart with premium 3D Tilt and gradient border */}
        <div className="w-full max-w-4xl mt-10">
          <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            glareEnable={true}
            glareMaxOpacity={0.1}
            scale={1.02}
            transitionSpeed={500}
          >
            <div
              className="
              bg-gradient-to-r from-white via-gray-300 to-white
              p-[2px] rounded-xl 
              shadow-[0_0_30px_rgba(255,255,255,0.4)] 
              transition-all duration-500
            "
            >
              <div className="bg-gray-900 rounded-xl p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="time" stroke="#ccc" />
                    <YAxis stroke="#ccc" domain={[0, 20]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(30, 30, 30, 0.7)",
                        border: "1px solid #555",
                        color: "#fff",
                      }}
                      itemStyle={{ color: "#60a5fa" }}
                      labelStyle={{ color: "#ccc" }}
                    />
                    <Line
                      type="linear"
                      dataKey="reports"
                      stroke="#60a5fa"
                      strokeWidth={3}
                      dot={false}
                      activeDot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Tilt>
        </div>
      </div>

      {/* Modal: Αναφορά Σεισμού */}
      {showModal && (
        <ReportModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setShowModal(false)}
        />
      )}

      {/* ✅ Modal: Πηγές Σεισμών */}
      {showNewsModal && (
        <NewsModal onClose={() => setShowNewsModal(false)} />
      )}
    </section>
  );
};

export default HeroSection;
