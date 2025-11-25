import PageHeader from "../components/shared/PageHeader";

const Contact = () => {
  const locations = [
    {
      id: 1,
      image:
        "https://html.aqlova.com/acjon-prev/acjon/assets/img/inner-image/contact/thumb-2.jpg",
      city: " Main Branch",
      openHours: "Sun - Thurs",
      officeName: "Dhaka, Bangladesh",
      address: "2 No Avenue, DOHS, Mirpur",
      phone: "+8801878132",
      email: "skylark@gmail.com",
      mapLink: "#",
    },
    {
      id: 2,
      image:
        "https://html.aqlova.com/acjon-prev/acjon/assets/img/inner-image/contact/thumb-3.jpg",
      city: "Chittagong Branch",
      openHours: "Mon - Fri",
      officeName: "Agrabad",
      address: "15 Agrabad C/A, Chittagong",
      phone: "+8801812345678",
      email: "chittagong@skylark.com",
      mapLink: "#",
    },
  ];
  return (
    <div>
      <PageHeader />
      <div className="container  tracking-wider mx-auto">
        <div className="space-y-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 rounded gap-6 lg:gap-10 group border border-gray-300 p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image Column */}
              <div className="overflow-hidden rounded">
                <img
                  src={location.image}
                  alt={location.city}
                  className="w-full rounded group-hover:scale-110 transition-transform duration-500 h-full object-cover"
                />
              </div>

              {/* City & Hours Column */}
              <div className="flex flex-col justify-between items-start">
                <h1 className="text-xl  title md:text-2xl lg:text-3xl ">
                  {location.city}
                </h1>
                <p className="text-gray-700 text-base md:text-lg">
                  <strong className="text-gray-700">Open</strong>:{" "}
                  {location.openHours}
                </p>
              </div>

              {/* Office & Address Column */}
              <div className="flex flex-col justify-between items-start">
                <div>
                  <p className="text-xl md:text-2xl font-adventure font-normal tracking-wider text-gray-800">
                    {location.officeName}
                  </p>
                  <h1 className="text-gray-700 tracking-wider font-normal text-base md:text-lg mt-1">
                    {location.address}
                  </h1>
                </div>
                <a
                  href={location.mapLink}
                  className="text-gray-700 text-base md:text-lg underline hover:text-lochmara-600 transition-colors"
                >
                  Google Maps
                </a>
              </div>

              {/* Contact Info Column */}
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${location.phone}`}
                  className="text-base md:text-lg text-gray-700 hover:text-lochmara-600 transition-colors"
                >
                  {location.phone}
                </a>
                <a
                  href={`mailto:${location.email}`}
                  className="text-base md:text-lg text-gray-700 hover:text-lochmara-600 transition-colors"
                >
                  {location.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
