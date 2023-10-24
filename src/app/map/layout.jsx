import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function mapLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-48"> 
        <Navbar />
        <div className="mt-16 h-full">{children}</div>
      </div>
    </div>
  );
}


