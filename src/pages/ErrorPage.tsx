import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const ErrorPage = () => {
  return (
    <div>
      <Navbar />
        <div className="error min-h-screen mt-16 text-neutral-50 flex flex-col items-center pt-52 gap-10">
          <h1>Page Not Found</h1>
          <h3>Oops, it looks like this page does not exist.</h3>
        </div>
      <Footer />
    </div>
  )
}

export default ErrorPage