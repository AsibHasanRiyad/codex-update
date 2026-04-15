import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About.page";
import Contact from "../pages/Contact.page";
import ServicesDetails from "../pages/ServicesDetails.page";
import Products from "../pages/Products.page";
import CaseStudies from "../pages/CaseStudies.page";
import CaseStudyDetail from "../pages/CaseStudyDetail.page";
import Blog from "../pages/Blog.page";
import BlogDetail from "../pages/BlogDetail.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: (
      <div className=" h-screen w-screen flex justify-center items-center">
        Error Page
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/services/:slug",
        element: <ServicesDetails />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/case-studies",
        element: <CaseStudies />,
      },
      {
        path: "/case-studies/:slug",
        element: <CaseStudyDetail />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetail />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
