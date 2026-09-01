import * as React from "react";
import { Entity } from "@/lib/types";

interface EntityListProps {
  entities: Entity[];
}

export function EntityList({ entities }: EntityListProps) {
  if (entities.length === 0) {
    return (
      <p className="text-xs text-[#8A8D8A] italic">
        No specific entities extracted.
      </p>
    );
  }

  return (
    <div className="border border-[#D8D5CC] rounded-xl overflow-hidden divide-y divide-[#F0EDE5] bg-white">
      {entities.map((entity) => (
        <div
          key={entity.id}
          className="grid grid-cols-3 sm:grid-cols-4 p-3.5 text-xs hover:bg-[#F7F5EF]/50 transition-colors"
        >
          <span className="font-medium text-[#5F625F] uppercase tracking-wide text-[11px]">
            {entity.label}
          </span>
          <span className="col-span-2 sm:col-span-3 font-semibold text-[#080B10]">
            {entity.value}
          </span>
        </div>
      ))}
    </div>
  );
}
