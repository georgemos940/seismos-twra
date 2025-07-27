"use client";

import React from "react";

interface NewsModalProps {
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border border-white/30 p-6 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-extrabold mb-4 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Έγκυρες Πηγές Σεισμών
        </h2>

        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li>
            <a
              href="https://www.zougla.gr/category/sismoi/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Zougla
            </a>
          </li>
          <li>
            <a
              href="https://www.newsbomb.gr/tag/seismos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Newsbomb
            </a>
          </li>
          <li>
            <a
              href="https://www.newsbeast.gr/tag/seismos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Newsbeast
            </a>
          </li>
          <li>
            <a
              href="https://www.ertnews.gr/tag/sismos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              ERT News
            </a>
          </li>
          <li>
            <a
              href="https://www.antenna.gr/news/tags/15175/seismos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              ANT1 News
            </a>
          </li>
          <li>
            <a
              href="https://www.kathimerini.gr/tag/seismos/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Kathimerini
            </a>
          </li>
        </ul>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded-full text-white hover:bg-gray-600 transition"
          >
            Κλείσιμο
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsModal;
