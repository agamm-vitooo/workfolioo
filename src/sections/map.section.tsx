"use client";

import { useState } from "react";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip,
  MapPopup,
  MapControls,
} from "@/components/ui/map";

const location = {
  id: 1,
  name: "Menara BPJS Ketenagakerjaan (Kuningan)",
  lng: 106.8307,
  lat: -6.2297,
};

export default function MapSection() {
  const [showGlobalPopup, setShowGlobalPopup] = useState(true);

  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-6xl px-4">

        {/* HEADER */}
        <h2 className="mb-1 text-2xl font-semibold text-slate-900">
          Location
        </h2>

        <p className="mb-6 text-sm text-slate-500">
          Kuningan, Jakarta, Indonesia 🇮🇩
        </p>

        {/* MAP CONTAINER */}
        <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200">

          <Map center={[location.lng, location.lat]} zoom={15}>
            <MapControls />

            {/* MARKER */}
            <MapMarker longitude={location.lng} latitude={location.lat}>

              <MarkerContent>
                <div className="relative">
                  <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-blue-600" />
                  <div className="absolute inset-0 h-3.5 w-3.5 rounded-full bg-blue-600 opacity-30 blur-md" />
                </div>
              </MarkerContent>

              <MarkerTooltip>
                View location
              </MarkerTooltip>

              {/* SMALL POPUP */}
              <MarkerPopup>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">
                    {location.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                  </p>
                </div>
              </MarkerPopup>

            </MapMarker>

            {/* GLOBAL INFO POPUP */}
            {showGlobalPopup && (
              <MapPopup
                longitude={location.lng}
                latitude={location.lat}
                closeButton
                onClose={() => setShowGlobalPopup(false)}
              >
                <div className="space-y-3">

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Location Details
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      BPJS Ketenagakerjaan Tower located in the Kuningan business district of Jakarta.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowGlobalPopup(false)}
                    className="w-full rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white transition hover:bg-blue-700"
                  >
                    Got it
                  </button>

                </div>
              </MapPopup>
            )}

          </Map>
        </div>
      </div>
    </section>
  );
}