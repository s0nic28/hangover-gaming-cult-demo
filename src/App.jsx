import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaInstagram,
  FaGamepad,
  FaUsers,
  FaClock,
  FaCamera,
  FaTrophy,
  FaBirthdayCake,
  FaBolt,
  FaCrown,
  FaTools,
  FaStar,
  FaCalendarAlt,
  FaImage,
  FaBullhorn,
  FaHeadset,
  FaTable,
  FaPlay,
  FaFire,
  FaSave,
  FaHome,
  FaPlus,
  FaTrash,
  FaLock,
  FaPhoneAlt,
  FaUser,
  FaCalendarDay,
  FaCheck,
  FaMapMarkerAlt,
} from "react-icons/fa";

const LOGO = "/images/logo.png";
const ADMIN_PASSWORD = "hangover123";
const INSTAGRAM_URL = "https://instagram.com/hangover_gaming_cult";

const defaultData = {
  timings: {
    opening: "Open 24 Hours",
    closing: "Everyday",
  },
  prices: [
    { item: "PS5", price: "₹___ / hour" },
    { item: "PS4", price: "₹___ / hour" },
    { item: "PS2", price: "₹___ / hour" },
    { item: "Snooker", price: "₹___ / hour" },
    { item: "Table Football", price: "₹___ / match" },
  ],
  offers: [
    {
      title: "Weekend Combo",
      description: "Console gaming + snooker combo for weekend squads.",
    },
    {
      title: "Friends Group Offer",
      description: "Special group pricing for friends playing together.",
    },
    {
      title: "Birthday Gaming Plan",
      description:
        "Celebrate birthdays with gaming, group photos, and custom packages.",
    },
  ],
  gallery: [
    { title: "PS5 Setup", image: "/images/ps5.jpg" },
    { title: "Snooker Area", image: "/images/snooker.jpg" },
    { title: "Friends Zone", image: "/images/friends-zone.jpg" },
    { title: "Table Football", image: "/images/table-football.jpg" },
  ],
  announcement: {
    enabled: false,
    title: "",
    message: "",
  },
  bookings: [],
};

const zones = [
  {
    title: "PS5 Zone",
    desc: "Next-gen console gaming with premium visuals, smooth performance, and a luxury lounge feel.",
    icon: FaGamepad,
  },
  {
    title: "PS4 Zone",
    desc: "Perfect for FIFA, WWE, racing, fighting games, cricket, and squad battles.",
    icon: FaHeadset,
  },
  {
    title: "PS2 Retro Zone",
    desc: "Classic nostalgic gaming for old-school legends and childhood throwback sessions.",
    icon: FaStar,
  },
  {
    title: "Snooker Arena",
    desc: "A premium snooker experience for chill matches, competitive nights, and friend groups.",
    icon: FaTable,
  },
  {
    title: "Table Football",
    desc: "Fast, fun, and perfect for quick matches before or after your console session.",
    icon: FaBolt,
  },
];

const benefits = [
  {
    title: "Premium Console Setup",
    desc: "Clean gaming stations, smooth sessions, and a premium black-and-gold lounge atmosphere.",
    icon: FaCrown,
  },
  {
    title: "Friends Group Hangout",
    desc: "Built for squads, birthday plans, weekend chill, and late-night gaming.",
    icon: FaUsers,
  },
  {
    title: "Open 24 Hours",
    desc: "Ready for day plans, night sessions, and weekend gaming culture.",
    icon: FaClock,
  },
  {
    title: "Easy Slot Booking",
    desc: "Customers can send booking requests directly from the website.",
    icon: FaCalendarDay,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

function loadData() {
  try {
    const saved = localStorage.getItem("hangoverDemoData");
    return saved ? JSON.parse(saved) : defaultData;
  } catch {
    return defaultData;
  }
}

function saveData(data) {
  localStorage.setItem("hangoverDemoData", JSON.stringify(data));
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45 }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <p className="mb-3 text-xs font-black uppercase tracking-[0.35em] text-yellow-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
          {text}
        </p>
      )}
    </motion.div>
  );
}

function GoldButton({ children, href, variant = "primary", onClick, type }) {
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-yellow-300 via-yellow-500 to-amber-700 text-black shadow-[0_0_28px_rgba(245,197,66,0.36)]"
      : "border border-yellow-400/40 bg-white/5 text-yellow-100 hover:bg-yellow-400/10";

  const cls = `inline-flex items-center justify-center gap-3 rounded-full px-5 py-3.5 text-xs font-black uppercase tracking-wide transition active:scale-95 sm:px-6 sm:py-4 sm:text-sm ${styles}`;

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.96 }}
        href={href}
        onClick={onClick}
        className={cls}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.96 }}
      type={type || "button"}
      onClick={onClick}
      className={cls}
    >
      {children}
    </motion.button>
  );
}

function Intro({ done }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-black"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="px-5 text-center"
          >
            <motion.img
              src={LOGO}
              alt="Hangover Gaming Cult"
              className="mx-auto h-28 w-28 rounded-3xl border border-yellow-400/20 object-cover shadow-[0_0_45px_rgba(245,197,66,0.25)] sm:h-36 sm:w-36"
            />
            <h1 className="mt-6 text-xl font-black uppercase tracking-[0.18em] text-yellow-300 sm:text-3xl">
              Hangover Gaming Cult
            </h1>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.35em] text-zinc-500">
              Loading Lounge
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({ setPage }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-yellow-400/10 bg-black/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
        <button onClick={() => setPage("home")} className="flex items-center gap-3">
          <img
            src={LOGO}
            alt="Hangover Gaming Cult"
            className="h-11 w-11 rounded-xl border border-yellow-400/20 object-cover shadow-[0_0_20px_rgba(245,197,66,0.2)] sm:h-12 sm:w-12"
          />
          <div className="text-left">
            <p className="text-xs font-black tracking-widest text-yellow-300 sm:text-sm">
              HANGOVER
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-zinc-400 sm:text-[10px]">
              Gaming Cult
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-7 text-xs font-bold uppercase tracking-widest text-zinc-300 md:flex">
          <button onClick={() => setPage("home")} className="hover:text-yellow-400">
            Home
          </button>
          <a href="#pricing" className="hover:text-yellow-400">
            Pricing
          </a>
          <a href="#booking" className="hover:text-yellow-400">
            Booking
          </a>
          <button onClick={() => setPage("admin")} className="hover:text-yellow-400">
            Admin
          </button>
        </nav>

        <button
          onClick={() => setPage("admin")}
          className="rounded-full bg-gradient-to-r from-yellow-300 to-amber-700 px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-black shadow-[0_0_20px_rgba(245,197,66,0.25)] transition active:scale-95 sm:px-5 sm:py-3 sm:text-xs"
        >
          Admin
        </button>
      </div>
    </header>
  );
}

function HomePage({ data, setData, setPage, isMobile }) {
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    game: "PS5",
    date: "",
    time: "",
    people: "1",
    message: "",
  });

  const [bookingStatus, setBookingStatus] = useState("");

  function submitBooking(e) {
    e.preventDefault();

    if (!booking.name || !booking.phone || !booking.date || !booking.time) {
      setBookingStatus("Fill name, phone, date and time.");
      return;
    }

    const newBooking = {
      id: Date.now(),
      ...booking,
      status: "New",
      createdAt: new Date().toLocaleString(),
    };

    const updated = {
      ...data,
      bookings: [newBooking, ...(data.bookings || [])],
    };

    setData(updated);
    saveData(updated);

    setBooking({
      name: "",
      phone: "",
      game: "PS5",
      date: "",
      time: "",
      people: "1",
      message: "",
    });

    setBookingStatus("Booking request sent. Owner can see it in Admin.");
  }

  return (
    <main>
      <section
        id="home"
        className="gold-noise relative min-h-screen overflow-hidden px-4 pb-16 pt-28 sm:px-5 sm:pb-20 sm:pt-36 lg:pt-40"
      >
        <div className="gold-grid absolute inset-0 opacity-80" />
        <div className="pulse-gold absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-500/20 blur-[95px] lg:h-[550px] lg:w-[550px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={isMobile ? { opacity: 0, y: 18 } : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.35 : 0.7 }}
          >
            <img
              src={LOGO}
              alt="Hangover Gaming Cult"
              className="mb-6 h-24 w-24 rounded-2xl border border-yellow-400/20 object-cover shadow-[0_0_35px_rgba(245,197,66,0.18)] sm:h-28 sm:w-28"
            />

            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-yellow-400/25 bg-yellow-400/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-300 sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-yellow-300 shadow-[0_0_18px_rgba(245,197,66,1)]" />
              Premium 24hrs Gaming Lounge
            </div>

            <h1 className="max-w-5xl text-4xl font-black uppercase leading-[0.9] tracking-tighter text-white sm:text-6xl lg:text-8xl">
              Hangover
              <span className="shine block bg-gradient-to-r from-yellow-200 via-white to-amber-600 bg-clip-text text-transparent">
                Gaming Cult
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              A 24hrs black-and-gold gaming lounge for PS5, PS4, PS2, Snooker,
              Table Football, squad nights, birthday plans, and serious gaming sessions.
            </p>

            <p className="mt-4 text-lg font-black text-yellow-300 sm:text-2xl">
              Console Gaming. Snooker. Friends. Vibe.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <GoldButton href="#booking">
                <FaCalendarDay />
                Book a Slot
              </GoldButton>
              <GoldButton href="#pricing" variant="secondary">
                <FaPlay />
                View Pricing
              </GoldButton>
            </div>
          </motion.div>

          <motion.div
            initial={isMobile ? { opacity: 0, y: 18 } : { opacity: 0, scale: 0.94 }}
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1 }}
            transition={{ duration: isMobile ? 0.35 : 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="gold-card gold-glow relative overflow-hidden rounded-[2rem] p-4 sm:p-7">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-500/20 blur-3xl" />
              <div className="relative rounded-[1.5rem] border border-yellow-400/20 bg-black/70 p-4 sm:p-5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">
                      Live Lounge
                    </p>
                    <h3 className="mt-2 text-xl font-black sm:text-2xl">
                      Open 24 Hours
                    </h3>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-700 text-black">
                    <FaGamepad />
                  </div>
                </div>

                <div className="grid gap-3 sm:gap-4">
                  {[
                    ["PS5 Zone", "Next-gen gaming sessions", "READY"],
                    ["Snooker Arena", "Premium table experience", "OPEN"],
                    ["Table Football", "Quick matches with friends", "LIVE"],
                  ].map(([title, desc, tag]) => (
                    <div
                      key={title}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-yellow-400/10 bg-white/[0.04] p-4"
                    >
                      <div>
                        <p className="font-black">{title}</p>
                        <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                          {desc}
                        </p>
                      </div>
                      <span className="rounded-full bg-yellow-400/15 px-3 py-1 text-[10px] font-black text-yellow-300 sm:text-xs">
                        {tag}
                      </span>
                    </div>
                  ))}

                  {data.announcement?.enabled && (
                    <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
                      <p className="font-black text-yellow-300">
                        {data.announcement.title}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400">
                        {data.announcement.message}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-6 rounded-2xl bg-gradient-to-r from-yellow-300 via-amber-600 to-yellow-950 p-5 text-black">
                  <p className="text-sm font-black">Current timing</p>
                  <p className="mt-1 text-2xl font-black">{data.timings.opening}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="zones" className="px-4 py-14 sm:px-5 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Gaming Zones"
            title="Choose your zone. Own the night."
            text="Premium spaces for console gaming, snooker, table football, friends, and late-night sessions."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
          >
            {zones.map((zone) => {
              const Icon = zone.icon;
              const price = data.prices.find((p) =>
                zone.title.toLowerCase().includes(p.item.toLowerCase().split(" ")[0])
              );

              return (
                <motion.div
                  key={zone.title}
                  variants={fadeUp}
                  whileHover={isMobile ? {} : { y: -8, scale: 1.015 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-[1.7rem] border border-yellow-400/10 bg-zinc-950 p-5 transition hover:border-yellow-400/45 hover:bg-yellow-950/10"
                >
                  <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400/10 text-yellow-400 transition group-hover:bg-yellow-400 group-hover:text-black">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-black">{zone.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{zone.desc}</p>
                  <p className="mt-5 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-3 text-xs font-black text-yellow-300">
                    {price?.price || "Price updating soon"}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#030303] via-[#151105] to-[#030303] px-4 py-14 sm:px-5 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Why Visit"
            title="Built for 24hrs gaming culture."
            text="A premium lounge experience made for friends, groups, events, and competitive sessions."
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={isMobile ? {} : { scale: 1.03, y: -4 }}
                  className="rounded-[1.7rem] border border-yellow-400/10 bg-black/50 p-6"
                >
                  <Icon className="text-3xl text-yellow-400" />
                  <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-14 sm:px-5 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <SectionTitle
            eyebrow="Price Menu"
            title="Game rates, session plans, and lounge pricing."
            text="Clear pricing helps customers choose quickly and book the right slot."
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-zinc-950 shadow-[0_0_45px_rgba(245,197,66,0.08)]"
          >
            <div className="grid grid-cols-2 bg-gradient-to-r from-yellow-300 to-amber-700 px-5 py-4 text-sm font-black uppercase tracking-widest text-black">
              <p>Zone</p>
              <p className="text-right">Rate</p>
            </div>

            {data.prices.map((row) => (
              <div
                key={row.item}
                className="grid grid-cols-2 border-t border-white/10 px-5 py-5"
              >
                <p className="font-bold text-white">{row.item}</p>
                <p className="text-right font-black text-yellow-300">{row.price}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="offers" className="px-4 py-14 sm:px-5 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Offers"
            title="Plans that bring squads back."
            text="The owner can add, edit, or remove these from the admin dashboard."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.offers.map((offer, index) => {
              const icons = [FaCalendarAlt, FaUsers, FaBirthdayCake, FaTrophy];
              const Icon = icons[index % icons.length];

              return (
                <motion.div
                  key={`${offer.title}-${index}`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={isMobile ? {} : { y: -8, scale: 1.015 }}
                  className="relative overflow-hidden rounded-[1.7rem] border border-yellow-400/10 bg-gradient-to-br from-zinc-950 to-black p-6"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-yellow-500/16 blur-2xl" />
                  <Icon className="relative text-3xl text-yellow-400" />
                  <h3 className="relative mt-5 text-xl font-black">{offer.title}</h3>
                  <p className="relative mt-3 text-sm leading-7 text-zinc-400">
                    {offer.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-[#080808] px-4 py-14 sm:px-5 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Gallery"
            title="Inside the lounge."
            text="Add real cafe photos inside public/images and update paths from admin."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.gallery.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={isMobile ? {} : { scale: 1.025 }}
                className="group relative min-h-[250px] overflow-hidden rounded-[1.7rem] border border-yellow-400/10 bg-black"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-110 group-hover:opacity-90"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,197,66,0.18),transparent_45%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="relative flex h-full min-h-[250px] flex-col justify-end p-5">
                  <FaCamera className="mb-4 text-3xl text-yellow-400" />
                  <p className="text-xl font-black">{item.title}</p>
                  <p className="mt-2 text-sm text-zinc-300">Hangover Gaming Cult</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="px-4 py-14 sm:px-5 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Booking"
            title="Book your slot."
            text="Customer requests will appear in the admin dashboard."
          />

          <form
            onSubmit={submitBooking}
            className="rounded-[2rem] border border-yellow-400/10 bg-zinc-950 p-5 sm:p-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                icon={FaUser}
                placeholder="Your name"
                value={booking.name}
                onChange={(value) => setBooking({ ...booking, name: value })}
              />
              <Input
                icon={FaPhoneAlt}
                placeholder="Phone number"
                value={booking.phone}
                onChange={(value) => setBooking({ ...booking, phone: value })}
              />
              <Select
                value={booking.game}
                onChange={(value) => setBooking({ ...booking, game: value })}
                options={["PS5", "PS4", "PS2", "Snooker", "Table Football"]}
              />
              <Input
                type="number"
                icon={FaUsers}
                placeholder="People count"
                value={booking.people}
                onChange={(value) => setBooking({ ...booking, people: value })}
              />
              <Input
                type="date"
                icon={FaCalendarDay}
                value={booking.date}
                onChange={(value) => setBooking({ ...booking, date: value })}
              />
              <Input
                type="time"
                icon={FaClock}
                value={booking.time}
                onChange={(value) => setBooking({ ...booking, time: value })}
              />
            </div>

            <textarea
              placeholder="Message / special request"
              value={booking.message}
              onChange={(e) => setBooking({ ...booking, message: e.target.value })}
              className="mt-4 min-h-[120px] w-full resize-none rounded-2xl border border-yellow-400/10 bg-black px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-yellow-400"
            />

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <GoldButton type="submit">
                <FaCheck />
                Send Booking Request
              </GoldButton>

              {bookingStatus && (
                <p className="text-sm font-bold text-yellow-300">{bookingStatus}</p>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#030303] to-[#151105] px-4 py-14 sm:px-5 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Location"
            title="Find the lounge."
            text="This map searches for Hangover Gaming Cult. Replace it with the exact Google Maps embed later."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-yellow-400/10 bg-black/60 p-6">
              <h3 className="text-2xl font-black">Hangover Gaming Cult</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Open 24 hours for console gaming, snooker, table football,
                birthday sessions, friend groups, and late-night gaming culture.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <GoldButton href={INSTAGRAM_URL}>
                  <FaInstagram />
                  @hangover_gaming_cult
                </GoldButton>

                <GoldButton href="#booking" variant="secondary">
                  <FaCalendarDay />
                  Book a Slot
                </GoldButton>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-yellow-400/10 bg-zinc-950 p-3">
              <iframe
                title="Hangover Gaming Cult Map"
                src="https://www.google.com/maps?q=Hangover%20Gaming%20Cult&output=embed"
                className="h-[360px] w-full rounded-[1.5rem] border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Input({ icon: Icon, value, onChange, placeholder, type = "text" }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl border border-yellow-400/10 bg-black px-4 py-3 focus-within:border-yellow-400">
      {Icon && <Icon className="shrink-0 text-yellow-400" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
      />
    </label>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-2xl border border-yellow-400/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-yellow-400"
    >
      {options.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select>
  );
}

function AdminPage({ data, setData, setPage }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [draft, setDraft] = useState(data);
  const [message, setMessage] = useState("");

  function login(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setDraft(data);
      setMessage("");
    } else {
      setMessage("Wrong password.");
    }
  }

  function saveDraft() {
    setData(draft);
    saveData(draft);
    setMessage("Saved successfully.");
    setTimeout(() => setMessage(""), 1600);
  }

  function updatePrice(index, key, value) {
    const copy = structuredClone(draft);
    copy.prices[index][key] = value;
    setDraft(copy);
  }

  function updateOffer(index, key, value) {
    const copy = structuredClone(draft);
    copy.offers[index][key] = value;
    setDraft(copy);
  }

  function updateGallery(index, key, value) {
    const copy = structuredClone(draft);
    copy.gallery[index][key] = value;
    setDraft(copy);
  }

  function addOffer() {
    setDraft({
      ...draft,
      offers: [...draft.offers, { title: "New Offer", description: "Offer description here." }],
    });
  }

  function removeOffer(index) {
    const copy = structuredClone(draft);
    copy.offers.splice(index, 1);
    setDraft(copy);
  }

  function updateBookingStatus(id, status) {
    const copy = structuredClone(draft);
    copy.bookings = copy.bookings.map((booking) =>
      booking.id === id ? { ...booking, status } : booking
    );
    setDraft(copy);
    setData(copy);
    saveData(copy);
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#030303] px-4 pb-20 pt-32 sm:px-5">
        <form
          onSubmit={login}
          className="mx-auto max-w-md rounded-[2rem] border border-yellow-400/10 bg-zinc-950 p-6"
        >
          <img
            src={LOGO}
            alt="Logo"
            className="mx-auto h-24 w-24 rounded-2xl border border-yellow-400/20 object-cover"
          />
          <h1 className="mt-6 text-center text-3xl font-black">Admin Login</h1>
          <p className="mt-3 text-center text-sm text-zinc-400">
            Manage prices, offers, bookings, gallery, and announcements.
          </p>

          <div className="mt-6">
            <Input
              icon={FaLock}
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={setPassword}
            />
          </div>

          <div className="mt-5">
            <GoldButton type="submit">
              <FaLock />
              Login
            </GoldButton>
          </div>

          {message && <p className="mt-4 text-sm font-bold text-yellow-300">{message}</p>}

          <p className="mt-5 text-xs text-zinc-500">
            Demo password: <span className="text-yellow-300">hangover123</span>
          </p>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030303] px-4 pb-20 pt-28 sm:px-5 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 rounded-[2rem] border border-yellow-400/10 bg-black/60 p-5 sm:p-6 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <img
              src={LOGO}
              alt="Logo"
              className="h-16 w-16 rounded-2xl border border-yellow-400/20 object-cover"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-yellow-400">
                Admin Dashboard
              </p>
              <h1 className="mt-2 text-3xl font-black md:text-5xl">
                Control Room
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Demo admin saves inside the browser for showcasing.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <GoldButton onClick={() => setPage("home")} variant="secondary">
              <FaHome />
              Website
            </GoldButton>
            <GoldButton onClick={saveDraft}>
              <FaSave />
              Save
            </GoldButton>
          </div>
        </div>

        {message && (
          <div className="mb-6 rounded-2xl border border-green-400/20 bg-green-500/10 p-4 text-sm font-bold text-green-300">
            {message}
          </div>
        )}

        <AdminCard icon={FaCalendarDay} title="Booking Requests">
          <div className="grid gap-4">
            {draft.bookings?.length ? (
              draft.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-yellow-400/10 bg-black/60 p-4"
                >
                  <div className="grid gap-3 md:grid-cols-3">
                    <p><span className="text-zinc-500">Name:</span> <b>{booking.name}</b></p>
                    <p><span className="text-zinc-500">Phone:</span> <b>{booking.phone}</b></p>
                    <p><span className="text-zinc-500">Game:</span> <b>{booking.game}</b></p>
                    <p><span className="text-zinc-500">Date:</span> <b>{booking.date}</b></p>
                    <p><span className="text-zinc-500">Time:</span> <b>{booking.time}</b></p>
                    <p><span className="text-zinc-500">People:</span> <b>{booking.people}</b></p>
                  </div>

                  {booking.message && (
                    <p className="mt-3 text-sm text-zinc-400">{booking.message}</p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-yellow-400/10 px-4 py-2 text-xs font-black text-yellow-300">
                      {booking.status}
                    </span>
                    <button
                      onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                      className="rounded-full bg-green-500/10 px-4 py-2 text-xs font-black text-green-300"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                      className="rounded-full bg-red-500/10 px-4 py-2 text-xs font-black text-red-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-400">No bookings yet.</p>
            )}
          </div>
        </AdminCard>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <AdminCard icon={FaClock} title="Opening Hours">
            <div className="grid gap-4">
              <AdminField
                label="Opening Text"
                value={draft.timings.opening}
                onChange={(value) =>
                  setDraft({ ...draft, timings: { ...draft.timings, opening: value } })
                }
              />
              <AdminField
                label="Closing Text"
                value={draft.timings.closing}
                onChange={(value) =>
                  setDraft({ ...draft, timings: { ...draft.timings, closing: value } })
                }
              />
            </div>
          </AdminCard>

          <AdminCard icon={FaBullhorn} title="Announcement Choice">
            <label className="mb-5 flex items-center gap-3 text-sm font-bold text-zinc-300">
              <input
                type="checkbox"
                checked={draft.announcement?.enabled || false}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    announcement: { ...draft.announcement, enabled: e.target.checked },
                  })
                }
              />
              Show announcement on website
            </label>

            <div className="grid gap-4">
              <AdminField
                label="Announcement Title"
                value={draft.announcement?.title || ""}
                onChange={(value) =>
                  setDraft({
                    ...draft,
                    announcement: { ...draft.announcement, title: value },
                  })
                }
              />
              <AdminField
                label="Announcement Message"
                value={draft.announcement?.message || ""}
                onChange={(value) =>
                  setDraft({
                    ...draft,
                    announcement: { ...draft.announcement, message: value },
                  })
                }
              />
            </div>
          </AdminCard>
        </div>

        <AdminCard icon={FaGamepad} title="Prices" className="mt-6">
          <div className="grid gap-4">
            {draft.prices.map((row, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-2xl bg-black/60 p-4 md:grid-cols-2"
              >
                <AdminField
                  label="Item"
                  value={row.item}
                  onChange={(value) => updatePrice(index, "item", value)}
                />
                <AdminField
                  label="Price"
                  value={row.price}
                  onChange={(value) => updatePrice(index, "price", value)}
                />
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard icon={FaFire} title="Offers" className="mt-6">
          <button
            onClick={addOffer}
            className="mb-5 inline-flex items-center justify-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-3 text-xs font-black uppercase tracking-widest text-yellow-300"
          >
            <FaPlus />
            Add Offer
          </button>

          <div className="grid gap-4">
            {draft.offers.map((offer, index) => (
              <div key={index} className="rounded-2xl bg-black/60 p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <AdminField
                    label="Offer Title"
                    value={offer.title}
                    onChange={(value) => updateOffer(index, "title", value)}
                  />
                  <AdminField
                    label="Description"
                    value={offer.description}
                    onChange={(value) => updateOffer(index, "description", value)}
                  />
                </div>

                <button
                  onClick={() => removeOffer(index)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-300"
                >
                  <FaTrash />
                  Remove
                </button>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard icon={FaImage} title="Gallery Images" className="mt-6">
          <p className="mb-5 text-sm leading-7 text-zinc-400">
            Put photos inside <span className="text-yellow-300">public/images</span>,
            then use paths like <span className="text-yellow-300">/images/ps5.jpg</span>.
          </p>

          <div className="grid gap-4">
            {draft.gallery.map((image, index) => (
              <div
                key={index}
                className="grid gap-3 rounded-2xl bg-black/60 p-4 md:grid-cols-[1fr_1fr_160px] md:items-end"
              >
                <AdminField
                  label="Title"
                  value={image.title}
                  onChange={(value) => updateGallery(index, "title", value)}
                />
                <AdminField
                  label="Image Path"
                  value={image.image}
                  onChange={(value) => updateGallery(index, "image", value)}
                />
                <img
                  src={image.image}
                  alt={image.title}
                  className="h-24 w-full rounded-2xl border border-yellow-400/10 object-cover"
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0.15";
                  }}
                />
              </div>
            ))}
          </div>
        </AdminCard>
      </div>
    </main>
  );
}

function AdminCard({ icon: Icon, title, children, className = "" }) {
  return (
    <section
      className={`rounded-[2rem] border border-yellow-400/10 bg-zinc-950 p-5 sm:p-6 ${className}`}
    >
      <div className="mb-5 flex items-center gap-3">
        <Icon className="text-yellow-400" />
        <h2 className="text-2xl font-black">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function AdminField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-yellow-400">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-yellow-400/10 bg-black px-4 py-3 text-sm text-white outline-none focus:border-yellow-400"
      />
    </label>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="border-t border-yellow-400/10 bg-black px-4 py-8 sm:px-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <img
            src={LOGO}
            alt="Hangover Gaming Cult"
            className="h-12 w-12 rounded-xl border border-yellow-400/20 object-cover"
          />
          <div>
            <p className="font-black tracking-widest">HANGOVER GAMING CULT</p>
            <p className="mt-1 text-sm text-zinc-500">
              Open 24hrs. Console Gaming. Snooker. Friends. Vibe.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-end">
          <p className="text-sm font-bold text-zinc-500">
            Demo website concept by{" "}
            <span className="text-yellow-400">Samurai Websites</span>
          </p>
          <button
            onClick={() => setPage("admin")}
            className="text-xs font-black uppercase tracking-widest text-yellow-400"
          >
            Open Admin
          </button>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [data, setData] = useState(defaultData);
  const [page, setPage] = useState("home");
  const [introDone, setIntroDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setData(loadData());
    setIsMobile(window.innerWidth < 768);

    const timer = setTimeout(() => setIntroDone(true), 1100);

    const resize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#030303] text-white">
      <style>{`
        .gold-noise {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(245,197,66,0.12), transparent 26%),
            radial-gradient(circle at 80% 10%, rgba(255,215,90,0.08), transparent 28%),
            radial-gradient(circle at 50% 85%, rgba(120,80,10,0.16), transparent 32%);
        }

        .gold-grid {
          background-image:
            linear-gradient(rgba(245,197,66,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,197,66,0.05) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: linear-gradient(to bottom, black, transparent 82%);
        }

        .gold-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025));
          border: 1px solid rgba(245,197,66,0.16);
          box-shadow: 0 18px 60px rgba(0,0,0,0.45);
        }

        .gold-glow {
          box-shadow:
            0 0 0 1px rgba(245,197,66,0.14),
            0 0 40px rgba(245,197,66,0.1);
        }

        .shine {
          position: relative;
          overflow: hidden;
        }

        .shine::after {
          content: "";
          position: absolute;
          top: 0;
          left: -120%;
          width: 80%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent);
          transform: skewX(-20deg);
          animation: shineMove 4.8s ease-in-out infinite;
        }

        @keyframes shineMove {
          0% { left: -120%; }
          38% { left: 130%; }
          100% { left: 130%; }
        }

        @media (min-width: 1024px) {
          .pulse-gold {
            animation: pulseGold 3.5s ease-in-out infinite;
          }

          @keyframes pulseGold {
            0%, 100% { opacity: 0.45; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(1.06); }
          }
        }

        @media (max-width: 767px) {
          .gold-noise {
            background-image:
              radial-gradient(circle at 50% 5%, rgba(245,197,66,0.12), transparent 34%),
              linear-gradient(to bottom, #030303, #080602, #030303);
          }

          .gold-grid {
            background-size: 72px 72px;
            opacity: 0.28 !important;
          }

          .gold-card {
            box-shadow: 0 12px 35px rgba(0,0,0,0.38);
          }

          .gold-glow {
            box-shadow:
              0 0 0 1px rgba(245,197,66,0.12),
              0 0 24px rgba(245,197,66,0.08);
          }

          .shine::after {
            display: none;
          }

          .pulse-gold {
            animation: none;
            opacity: 0.55;
          }

          * {
            -webkit-tap-highlight-color: transparent;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <Intro done={introDone} />
      <Header setPage={setPage} />

      {page === "home" ? (
        <HomePage data={data} setData={setData} setPage={setPage} isMobile={isMobile} />
      ) : (
        <AdminPage data={data} setData={setData} setPage={setPage} />
      )}

      <Footer setPage={setPage} />
    </div>
  );
}

export default App;