import MapContainer from "@/components/MapContainer"
import DirectionsForm from "@/components/DirectionsForm"

const Map = () => {
  return (
    <div className="flex h-full overscroll-none"> {/* Added h-full and overscroll-none */}
      {/* Map */}
      <div className="flex-1 relative h-full"> {/* Added h-full */}
        <MapContainer />
        <div className="absolute top-0 left-0 p-4">
        <DirectionsForm />
        </div>
      </div>
    </div>
  );
};

export default Map;
