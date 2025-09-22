import React from "react";
import { Icon } from "@iconify/react";

function StatsCard({ icon, value, label, change }) {
  return (
    <div className="rounded-md bg-white px-6 py-6 shadow-md dark:bg-backgroundDark dark:backdrop-blur-md">
      {/* Icon */}
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <Icon icon={icon} className="w-22 h-22 text-teal-600" />
      </div>

      {/* Nội dung */}
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-3xl font-semibold text-black dark:text-white">
            {value}
          </h4>
          <span className="text-xs font-medium text-black dark:text-white">
            {label}
          </span>
        </div>

        {change !== undefined && (
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              change >= 0 ? "text-green-400" : "text-red-500"
            }`}
          >
            {Math.abs(change)}%
            <Icon
              icon={
                change >= 0
                  ? "stash:arrow-up-duotone"
                  : "stash:arrow-down-duotone"
              }
              className="w-5 h-5"
            />
          </span>
        )}
      </div>
    </div>
  );
}

export default StatsCard;
