import { useEffect } from "react";

import createResource from "@/utils/createResource";

const resource = createResource(
  fetch("https://randomuser.me/api/?results=50").then((res) => res.json())
);

export default function Waterfall() {
  const data = resource.read();
  const { results: users } = data;

  useEffect(() => {
    const options = { threshold: 1 };
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;
          const card = image.parentNode.parentNode;
          const wrapper = card.parentNode;

          image.setAttribute("src", image.dataset.src);
          image.removeAttribute("data-src");
          card.classList.remove("opacity-0");
          card.nextElementSibling.remove();
          wrapper.classList.add(
            "transition-all",
            "duration-500",
            "hover:translate-y-1",
            "hover:shadow-none"
          );

          observer.unobserve(image);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);

    const images = document.querySelectorAll("[data-role='image']");
    images.forEach((image) => observer.observe(image));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="grid grid-cols-4 gap-4">
      {users.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg bg-white shadow-lg "
        >
          {/* card */}
          <div className="opacity-0 transition-all duration-1000">
            <figure className="aspect-square">
              <img
                data-role="image"
                data-src={item.picture.large}
                alt={`${item.name.last} ${item.name.first}`}
                className="h-full w-full object-cover"
              />
            </figure>
            <div className="p-2">
              <div>{`${item.name.last} ${item.name.first}`}</div>
              <div>{item.location.city}</div>
              <div className="break-all">{item.email}</div>
            </div>
          </div>
          {/* fallback */}
          <div
            data-role="fallback"
            className="absolute top-0 left-0 h-full w-full"
          />
        </div>
      ))}
    </main>
  );
}
