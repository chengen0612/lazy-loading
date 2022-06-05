import { useEffect } from "react";

import createResource from "@/utils/createResource";

import { Fallback } from "@/components/Fallback";

const resource = createResource(
  fetch("https://randomuser.me/api/?results=30").then((res) => res.json())
);

export default function LazyList() {
  const data = resource.read();
  const { results: users } = data;

  useEffect(() => {
    const options = { threshold: 1 };
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target.querySelector("[data-name='image']");
          const profile = entry.target.querySelector("[data-name='profile']");
          const card = entry.target;

          // Load image when its container be completely scrolled into viewport
          image.setAttribute("src", image.dataset.src);
          image.removeAttribute("data-src");
          image.addEventListener("load", (event) => {
            event.target.parentNode.nextElementSibling.remove();
          });

          // Simulate that if user profile has to be get from another api
          setTimeout(() => {
            profile.classList.remove("invisible");
            profile.nextElementSibling.remove();
          }, 1500);

          // Add interaction events after the image start to fetch
          card.classList.add(
            "transition-all",
            "duration-500",
            "hover:translate-y-2",
            "hover:shadow-none"
          );

          observer.unobserve(card);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const cards = document.querySelectorAll("[data-role='lazy']");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="grid grid-cols-4 gap-4">
      {users.map((item, index) => (
        <div key={index} data-role="lazy">
          {/* User image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <figure className="aspect-square">
              <img
                data-name="image"
                data-src={item.picture.large}
                alt={`${item.name.last} ${item.name.first}`}
                className="h-full w-full object-cover"
              />
            </figure>
            <Fallback className="bg-zinc-200" />
          </div>
          {/* User profile */}
          <div className="relative p-2">
            <div
              data-name="profile"
              className="invisible text-sm text-gray-700"
            >
              <div className="mb-1 text-lg font-medium">{`${item.name.last} ${item.name.first}`}</div>
              <div>{item.location.city}</div>
              <div className="break-all">{item.email}</div>
            </div>
            <Fallback className="mt-2 flex flex-col gap-y-2 p-2">
              <div className="h-4 rounded bg-zinc-200" />
              <div className="h-4 w-4/12 rounded bg-zinc-200" />
              <div className="h-4 w-11/12 rounded bg-zinc-200" />
            </Fallback>
          </div>
        </div>
      ))}
    </main>
  );
}
