import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import {ReduxProvider} from '@/redux/provider'

export default function vehiclesLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-48"> {/* Remove ml-48 on mobile */}
        <Navbar />
        <div className="mt-16 h-full"><ReduxProvider>{children}</ReduxProvider></div>
      </div>
    </div>
  );
}


