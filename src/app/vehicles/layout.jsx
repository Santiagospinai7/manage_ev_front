import Sidebar from "@/components/Sidebar";

export default function VehiclesLayout({ children }) {
  return (
    <div className="flex">
      <div className="w-48">
        <Sidebar />
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}