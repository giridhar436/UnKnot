import * as React from "react";
import { Entity } from "@/lib/types";

interface EntityListProps {
  entities: Entity[];
}

export function EntityList({ entities }: EntityListProps) {
  if (entities.length === 0) {
    return (
      <p className="text-xs text-[#888E8A] italic">
        No specific entities extracted.
      </p>
    );
  }

  return (
    <div className="border border-[#DFDBD1] rounded-xl overflow-hidden divide-y divide-[#EAE6DE] bg-white">
      {entities.map((entity) => (
        <div
          key={entity.id}
          className="grid grid-cols-3 sm:grid-cols-4 p-3.5 text-xs hover:bg-[#F2EFEB]/50 transition-colors"
        >
          <span className="font-mono uppercase tracking-wider text-[11px] text-[#5A605C]">
            {entity.label}
          </span>
          <span className="col-span-2 sm:col-span-3 font-medium text-[#111414]">
            {entity.value}
          </span>
        </div>
      ))}
    </div>
  );
}
