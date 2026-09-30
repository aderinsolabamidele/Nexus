import React from "react";
import { CATEGORIES } from "@/services/mockData";

export default function CategorySelector({
  active,
  onChange,
  className = "",
}) {
  return (
    <div className={`${className} overflow-x-auto no-scrollbar`}>
      <div className="flex items-center min-w-max">
        {CATEGORIES.map((category, index) => {
          const isActive = active === category.id;

          return (
            <React.Fragment key={category.id}>
              <button
                onClick={() => onChange(category.id)}
                className={`relative px-3.5 sm:px-4 py-2 text-[10px] tracking-[0.12em] uppercase transition-colors ${
                  isActive
                    ? "text-white"
                    : "text-white/30 hover:text-white/65"
                }`}
              >
                {category.label}

                {isActive && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-px"
                    style={{
                      background: category.color,
                      boxShadow: `0 0 8px ${category.color}`,
                    }}
                  />
                )}
              </button>

              {index < CATEGORIES.length - 1 && (
                <span className="w-px h-2.5 bg-white/[0.08]" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}