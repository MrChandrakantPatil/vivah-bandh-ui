export function Chats() {
  return (
    <div
      className="
        max-w-[1600px] px-4 py-4 mx-auto
        bg-[#fdfdfe]
        sm:px-6 md:px-8 lg:px-10 sm:py-6 lg:py-8
      "
    >
      <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-gray-700 text-xl sm:text-2xl lg:text-3xl">
            Welcome back, Chandrakant!
          </h1>

          <p className="mt-1 text-gray-500 text-sm sm:text-base">
            Let's find your perfect life partner
          </p>
        </div>
      </div>
    </div>
  );
}
