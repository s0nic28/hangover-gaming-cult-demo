import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlaystation,
  FaClock,
  FaMapMarkerAlt,
  FaInstagram,
  FaPhoneAlt,
  FaStar,
  FaCheckCircle,
  FaShieldAlt,
  FaTrophy,
  FaBars,
  FaTimes,
  FaCrown,
  FaPaperPlane,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaTableTennis,
  FaLock,
  FaUnlock,
  FaSearch,
  FaTimesCircle,
  FaSyncAlt,
  FaVolumeUp,
  FaEnvelope,
  FaEdit,
  FaSave,
  FaHourglassHalf,
  FaGlobe,
} from "react-icons/fa";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "owner123";

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const SAMURAI_WEBSITE_URL = "https://samurai-websites-mithun.vercel.app/";

const defaultPricing = [
  {
    service: "PS5 Session",
    price: "₹99",
    description: "Premium next-gen gaming session.",
    features: ["PS5 access", "Hourly slot", "Clean controller", "Premium screen"],
  },
  {
    service: "PS4 Session",
    price: "₹79",
    description: "Popular console gaming session.",
    features: ["PS4 access", "Hourly slot", "Multiplayer games", "Comfort setup"],
  },
  {
    service: "Snooker Hour",
    price: "₹149",
    description: "Luxury snooker table booking.",
    features: ["Snooker table", "Hourly booking", "Chill atmosphere", "Perfect for groups"],
  },
  {
    service: "Table Football",
    price: "₹79",
    description: "Quick and competitive fun.",
    features: ["Table football", "Fast sessions", "Friends battle", "Chill zone access"],
  },
];

function makeDateOptions() {
  const dates = [];
  const today = new Date();
  const endDate = new Date();
  endDate.setFullYear(today.getFullYear() + 1);

  const currentDate = new Date(today);

  while (currentDate <= endDate) {
    const value = currentDate.toISOString().slice(0, 10);

    const day = currentDate.toLocaleDateString("en-IN", {
      weekday: "short",
    });

    const date = currentDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const diffTime = currentDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    dates.push({
      value,
      day: diffDays === 0 ? "Today" : diffDays === 1 ? "Tomorrow" : day,
      date,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function makeTimeSlots() {
  const slots = [];

  for (let hour = 10; hour <= 23; hour++) {
    for (const min of [0, 30]) {
      const d = new Date();
      d.setHours(hour, min, 0, 0);

      slots.push(
        d.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    }
  }

  return slots;
}

export default function App() {
  const dateOptions = useMemo(() => makeDateOptions(), []);
  const slots = useMemo(() => makeTimeSlots(), []);

  const [page, setPage] = useState(() =>
    window.location.hash === "#admin" ? "admin" : "home"
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState("07:00 PM");
  const [selectedZone, setSelectedZone] = useState("PS5 Arena");
  const [bookingDate, setBookingDate] = useState(dateOptions[0]?.value || "");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [latestBooking, setLatestBooking] = useState(null);
  const [bookingError, setBookingError] = useState("");

  const [trackPhone, setTrackPhone] = useState("");
  const [trackResults, setTrackResults] = useState([]);
  const [trackLoading, setTrackLoading] = useState(false);
  const [trackError, setTrackError] = useState("");

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSaving, setContactSaving] = useState(false);
  const [contactSuccess, setContactSuccess] = useState("");
  const [contactError, setContactError] = useState("");

  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [adminError, setAdminError] = useState("");
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [pricing, setPricing] = useState(defaultPricing);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const experiences = [
    {
      icon: <FaPlaystation />,
      title: "PS5 Arena",
      desc: "Next-gen console gaming with premium screens, luxury seating, and smooth competitive energy.",
      tag: "Next Gen",
      image: "/images/ps5.jpg",
    },
    {
      icon: <FaPlaystation />,
      title: "PS4 Arena",
      desc: "Fan-favorite console gaming zone for FIFA, racing, fighting games, and squad battles.",
      tag: "Popular",
      image: "/images/ps4.jpg",
    },
    {
      icon: <FaTrophy />,
      title: "Snooker Zone",
      desc: "A calm premium snooker space for serious frames, friendly matches, and weekend chill sessions.",
      tag: "Chill",
      image: "/images/snooker.jpg",
    },
    {
      icon: <FaTableTennis />,
      title: "Table Football",
      desc: "Fast, loud, competitive table football made for quick battles between gaming sessions.",
      tag: "Fun",
      image: "/images/table-football.jpg",
    },
  ];

  const zones = ["PS5 Arena", "PS4 Arena", "Snooker Zone", "Table Football"];

  const navLinks = [
    { label: "Home", type: "home", target: "home" },
    { label: "Experience", type: "home", target: "experience" },
    { label: "Booking", type: "home", target: "booking" },
    { label: "Track", type: "home", target: "track" },
    { label: "Pricing", type: "home", target: "pricing" },
    { label: "Gallery", type: "home", target: "gallery" },
    { label: "Admin", type: "admin", target: "admin" },
    { label: "Contact", type: "home", target: "contact" },
  ];

  const loadPricing = async () => {
    if (!supabase) return;

    const { data, error } = await supabase
      .from("pricing")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data?.length) setPricing(data);
  };

  const loadAdminData = async () => {
    if (!supabase) return;

    setLoadingAdmin(true);

    const [bookingsRes, messagesRes, pricingRes] = await Promise.all([
      supabase.from("bookings").select("*").order("created_at", { ascending: false }),
      supabase.from("messages").select("*").order("created_at", { ascending: false }),
      supabase.from("pricing").select("*").order("id", { ascending: true }),
    ]);

    if (!bookingsRes.error) setBookings(bookingsRes.data || []);
    if (!messagesRes.error) setMessages(messagesRes.data || []);
    if (!pricingRes.error && pricingRes.data?.length) setPricing(pricingRes.data);

    setLoadingAdmin(false);
  };

  useEffect(() => {
    loadPricing();
  }, []);

  useEffect(() => {
    if (adminUnlocked) loadAdminData();
  }, [adminUnlocked]);

  const goToHomeSection = (id) => {
    setPage("home");
    window.location.hash = "";

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const goToAdmin = () => {
    setPage("admin");
    window.location.hash = "admin";
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 60);
  };

  const handleConfirmBooking = async () => {
    setBookingError("");
    setSubmitted(false);
    setLatestBooking(null);

    if (!supabase) {
      setBookingError("Booking is not available right now. Please call the shop directly.");
      return;
    }

    if (!customerName.trim() || !phone.trim() || !bookingDate.trim()) {
      setBookingError("Please enter name, phone number, and booking date.");
      return;
    }

    setSaving(true);

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          customer_name: customerName.trim(),
          phone: phone.trim(),
          booking_date: bookingDate,
          booking_time: selectedSlot,
          zone: selectedZone,
          notes: notes.trim(),
          status: "Pending",
        },
      ])
      .select()
      .single();

    setSaving(false);

    if (error) {
      console.error("Booking error:", error);
      setBookingError(error.message || "Your booking request could not be sent. Please try again.");
      return;
    }

    setSubmitted(true);
    setLatestBooking(data);
    setTrackPhone(phone.trim());
    setCustomerName("");
    setPhone("");
    setNotes("");

    if (adminUnlocked) loadAdminData();
  };

  const trackBooking = async () => {
    setTrackError("");
    setTrackResults([]);

    if (!supabase) {
      setTrackError("Tracking is not available right now. Please call the shop directly.");
      return;
    }

    if (!trackPhone.trim()) {
      setTrackError("Enter the phone number used for booking.");
      return;
    }

    setTrackLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("phone", trackPhone.trim())
      .order("created_at", { ascending: false });

    setTrackLoading(false);

    if (error) {
      console.error("Track error:", error);
      setTrackError(error.message || "Could not find booking status right now. Please try again.");
      return;
    }

    if (!data || data.length === 0) {
      setTrackError("No booking found for this phone number.");
      return;
    }

    setTrackResults(data);
  };

  const sendMessage = async () => {
    setContactError("");
    setContactSuccess("");

    if (!supabase) {
      setContactError("Message service is not available right now. Please call the shop directly.");
      return;
    }

    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      setContactError("Please enter name, phone number, and message.");
      return;
    }

    setContactSaving(true);

    const { error } = await supabase.from("messages").insert([
      {
        name: contactName.trim(),
        phone: contactPhone.trim(),
        message: contactMessage.trim(),
        status: "Unread",
      },
    ]);

    setContactSaving(false);

    if (error) {
      console.error("Message error:", error);
      setContactError(error.message || "Message could not be sent. Please try again.");
      return;
    }

    setContactSuccess("Message sent! The shop owner will see it.");
    setContactName("");
    setContactPhone("");
    setContactMessage("");

    if (adminUnlocked) loadAdminData();
  };

  const updateBookingStatus = async (id, status) => {
    if (!supabase) return;

    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);

    if (error) {
      console.error("Status update error:", error);
      return;
    }

    loadAdminData();
  };

  const markMessageRead = async (id) => {
    if (!supabase) return;

    const { error } = await supabase.from("messages").update({ status: "Read" }).eq("id", id);

    if (error) {
      console.error("Message update error:", error);
      return;
    }

    loadAdminData();
  };

  const updatePrice = (id, field, value) => {
    setPricing((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const savePrice = async (item) => {
    if (!supabase || !item.id) return;

    const { error } = await supabase
      .from("pricing")
      .update({
        price: item.price,
        description: item.description,
        features: Array.isArray(item.features)
          ? item.features
          : String(item.features || "")
              .split(",")
              .map((x) => x.trim())
              .filter(Boolean),
      })
      .eq("id", item.id);

    if (error) {
      console.error("Pricing update error:", error);
      return;
    }

    loadAdminData();
  };

  const unlockAdmin = () => {
    if (adminInput === adminPassword) {
      setAdminUnlocked(true);
      setAdminError("");
      setAdminInput("");
    } else {
      setAdminError("Wrong password. This panel is only for the shop owner.");
    }
  };

  const totalRevenue = bookings.filter((b) => b.status === "Confirmed").length * 99;
  const todayBookings = bookings.filter(
    (b) => b.booking_date === new Date().toISOString().slice(0, 10)
  ).length;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <CinematicIntro />

      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(180,83,9,0.18),transparent_30%),linear-gradient(180deg,#020202,#090604,#000)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] bg-[linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] bg-[size:54px_54px]" />

      <Navbar
        navLinks={navLinks}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        goToHomeSection={goToHomeSection}
        goToAdmin={goToAdmin}
      />

      {page === "admin" ? (
        <AdminPage
          adminUnlocked={adminUnlocked}
          adminInput={adminInput}
          setAdminInput={setAdminInput}
          adminError={adminError}
          unlockAdmin={unlockAdmin}
          bookings={bookings}
          messages={messages}
          pricing={pricing}
          loadingAdmin={loadingAdmin}
          loadAdminData={loadAdminData}
          totalRevenue={totalRevenue}
          todayBookings={todayBookings}
          setAdminUnlocked={setAdminUnlocked}
          updateBookingStatus={updateBookingStatus}
          markMessageRead={markMessageRead}
          updatePrice={updatePrice}
          savePrice={savePrice}
          goToHomeSection={goToHomeSection}
        />
      ) : (
        <main>
          <section id="home" className="relative min-h-screen px-5 pt-32 sm:px-8 lg:px-16">
            <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-yellow-200 shadow-[0_0_35px_rgba(234,179,8,.25)]">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
                  Gold Class Gaming Lounge
                </div>

                <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
                  <span className="block bg-gradient-to-r from-white via-yellow-100 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(234,179,8,.35)]">
                    Hangover
                  </span>
                  <span className="block bg-gradient-to-r from-yellow-500 via-white to-yellow-700 bg-clip-text text-transparent">
                    Gaming Cult
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">
                  Gold class lounge experience for PS5, PS4, snooker sessions,
                  table football battles, and premium hangout nights.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <button
                    onClick={() => goToHomeSection("booking")}
                    className="rounded-full bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-black shadow-[0_0_45px_rgba(234,179,8,.45)] transition hover:scale-[1.03] hover:shadow-[0_0_75px_rgba(234,179,8,.8)]"
                  >
                    Book Your Slot
                  </button>

                  <button
                    onClick={() => goToHomeSection("track")}
                    className="rounded-full border border-yellow-400/25 bg-white/5 px-7 py-4 text-center text-sm font-black uppercase tracking-[0.2em] text-yellow-100 backdrop-blur-xl transition hover:border-yellow-400/60 hover:bg-yellow-500/10"
                  >
                    Track Booking
                  </button>
                </div>

                <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                  {[
                    ["4", "Zones"],
                    ["Full Year", "Dates"],
                    ["Admin", "Approval"],
                  ].map(([a, b]) => (
                    <div
                      key={a}
                      className="rounded-3xl border border-yellow-400/15 bg-white/[0.04] p-4 text-center backdrop-blur-xl"
                    >
                      <div className="text-2xl font-black text-yellow-300">{a}</div>
                      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/45">
                        {b}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <HeroImageCard />
            </div>
          </section>

          <section id="experience" className="px-5 py-24 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Experience"
                title="Choose your premium zone"
                desc="PS5, PS4, snooker, and table football zones with a polished lounge vibe."
              />

              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {experiences.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group relative overflow-hidden rounded-[2rem] border border-yellow-400/15 bg-white/[0.04] shadow-[0_0_45px_rgba(234,179,8,.08)] backdrop-blur-xl transition hover:-translate-y-2 hover:border-yellow-400/50"
                  >
                    <div className="relative h-72 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          e.currentTarget.src = "/images/ps5.jpg";
                        }}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-yellow-400/30 bg-black/55 text-2xl text-yellow-300 backdrop-blur-xl">
                        {item.icon}
                      </div>
                      <span className="absolute right-5 top-5 rounded-full border border-yellow-400/30 bg-black/55 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-yellow-200 backdrop-blur-xl">
                        {item.tag}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-black">{item.title}</h3>
                      <p className="mt-3 leading-7 text-white/55">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="booking" className="px-5 py-24 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Book now"
                title="Request your premium slot"
                desc="Choose your zone, select a date and time, then send your request for owner approval."
              />

              <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_.8fr]">
                <motion.div
                  initial={{ opacity: 0, x: -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[2rem] border border-yellow-400/15 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
                >
                  <h3 className="text-2xl font-black">Select Date</h3>

                  <div className="mt-6 max-h-96 overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                      {dateOptions.map((date) => (
                        <button
                          key={date.value}
                          onClick={() => {
                            setBookingDate(date.value);
                            setSubmitted(false);
                          }}
                          className={`rounded-2xl border px-4 py-4 text-left transition ${
                            bookingDate === date.value
                              ? "border-yellow-400 bg-yellow-500/20 text-yellow-100 shadow-[0_0_35px_rgba(234,179,8,.35)]"
                              : "border-white/10 bg-white/[0.04] text-white/55 hover:border-yellow-400/50 hover:bg-yellow-500/10"
                          }`}
                        >
                          <div className="text-xs font-black uppercase tracking-[0.2em] text-white/45">
                            {date.day}
                          </div>
                          <div className="mt-1 text-lg font-black">{date.date}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-9 text-2xl font-black">Select Time</h3>

                  <div className="mt-6 max-h-80 overflow-y-auto pr-2">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                      {slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => {
                            setSelectedSlot(slot);
                            setSubmitted(false);
                          }}
                          className={`rounded-2xl border px-4 py-4 text-sm font-black transition ${
                            selectedSlot === slot
                              ? "border-yellow-400 bg-yellow-500/20 text-yellow-100 shadow-[0_0_35px_rgba(234,179,8,.35)]"
                              : "border-white/10 bg-white/[0.04] text-white/55 hover:border-yellow-400/50 hover:bg-yellow-500/10"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-9 text-2xl font-black">Choose Zone</h3>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {zones.map((zone) => (
                      <button
                        key={zone}
                        onClick={() => {
                          setSelectedZone(zone);
                          setSubmitted(false);
                        }}
                        className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left font-bold transition ${
                          selectedZone === zone
                            ? "border-yellow-400 bg-yellow-500/20 text-white shadow-[0_0_35px_rgba(234,179,8,.22)]"
                            : "border-white/10 bg-white/[0.04] text-white/55 hover:border-yellow-400/50 hover:bg-yellow-500/10"
                        }`}
                      >
                        <span>{zone}</span>
                        {selectedZone === zone && <FaCheckCircle className="text-yellow-300" />}
                      </button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-[2rem] border border-yellow-400/20 bg-gradient-to-br from-yellow-950/30 via-white/[0.05] to-black p-6 backdrop-blur-xl sm:p-8"
                >
                  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-yellow-500/20 blur-3xl" />

                  <div className="relative z-10">
                    <div className="mb-6 inline-flex rounded-full border border-yellow-400/30 bg-yellow-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-200">
                      Booking Request
                    </div>

                    <div className="space-y-4">
                      <InfoRow icon={<FaMapMarkerAlt />} label="Zone" value={selectedZone} />
                      <InfoRow icon={<FaCalendarCheck />} label="Date" value={bookingDate} />
                      <InfoRow icon={<FaClock />} label="Time" value={selectedSlot} />
                      <InfoRow icon={<FaHourglassHalf />} label="Status" value="Waiting for Admin Approval" />
                    </div>

                    <div className="mt-7 grid gap-3">
                      <input
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
                        placeholder="Customer name"
                      />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
                        placeholder="Phone number"
                      />
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-28 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
                        placeholder="Notes, game request, or special request"
                      />
                    </div>

                    {bookingError && (
                      <div className="mt-5 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200">
                        {bookingError}
                      </div>
                    )}

                    <button
                      onClick={handleConfirmBooking}
                      disabled={saving}
                      className="mt-6 w-full rounded-2xl bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-black shadow-[0_0_50px_rgba(234,179,8,.35)] transition hover:scale-[1.02] hover:shadow-[0_0_80px_rgba(234,179,8,.65)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {saving ? "Sending Request..." : "Request Booking"}
                    </button>

                    <AnimatePresence>
                      {submitted && latestBooking && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="mt-6 rounded-3xl border border-yellow-400/30 bg-yellow-500/10 p-5 text-center"
                        >
                          <FaHourglassHalf className="mx-auto mb-3 text-3xl text-yellow-300" />
                          <h4 className="text-xl font-black text-yellow-100">Request sent!</h4>
                          <p className="mt-2 text-sm text-white/55">
                            Your booking is pending owner approval for {latestBooking.booking_time} at {latestBooking.zone}.
                          </p>
                          <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/35">
                            Track it with your phone number below.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <section id="track" className="px-5 py-24 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Track booking"
                title="Check your booking status"
                desc="Enter the same phone number used during booking to see whether your slot is pending, confirmed, or cancelled."
              />

              <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] border border-yellow-400/15 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={trackPhone}
                    onChange={(e) => setTrackPhone(e.target.value)}
                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
                    placeholder="Enter phone number"
                  />
                  <button
                    onClick={trackBooking}
                    disabled={trackLoading}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-black disabled:opacity-60"
                  >
                    {trackLoading ? "Checking..." : "Track"} <FaSearch />
                  </button>
                </div>

                {trackError && (
                  <div className="mt-5 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200">
                    {trackError}
                  </div>
                )}

                <div className="mt-6 grid gap-4">
                  {trackResults.map((booking) => (
                    <div key={booking.id} className="rounded-3xl border border-white/10 bg-black/35 p-5">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                          <h3 className="text-xl font-black">{booking.zone}</h3>
                          <p className="mt-1 text-white/45">
                            {booking.booking_date} • {booking.booking_time}
                          </p>
                        </div>

                        <StatusBadge status={booking.status} />
                      </div>

                      {booking.notes && (
                        <p className="mt-4 rounded-2xl bg-white/[0.04] p-4 text-sm text-white/50">
                          {booking.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="pricing" className="px-5 py-24 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Pricing"
                title="Premium gaming packages"
                desc="Clean pricing for PS5, PS4, snooker, and table football sessions."
              />

              <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {pricing.map((plan, i) => (
                  <motion.div
                    key={plan.service}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative overflow-hidden rounded-[2rem] border p-7 backdrop-blur-xl ${
                      i === 2
                        ? "border-yellow-400/40 bg-yellow-500/10 shadow-[0_0_60px_rgba(234,179,8,.18)]"
                        : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    {i === 2 && (
                      <div className="absolute right-5 top-5 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                        Popular
                      </div>
                    )}

                    <h3 className="text-2xl font-black">{plan.service}</h3>

                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-5xl font-black text-yellow-300">{plan.price}</span>
                      <span className="mb-2 text-white/40">/ hour</span>
                    </div>

                    <p className="mt-4 leading-7 text-white/55">{plan.description}</p>

                    <div className="mt-7 space-y-3">
                      {(plan.features || []).map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-white/65">
                          <FaCheckCircle className="text-yellow-300" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="gallery" className="px-5 py-24 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Gallery"
                title="Premium lounge visuals"
                desc="A rich black-and-gold visual showcase for the gaming club."
              />

              <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {experiences.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="group relative h-96 overflow-hidden rounded-[2rem] border border-yellow-400/15"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      onError={(e) => {
                        e.currentTarget.src = "/images/ps5.jpg";
                      }}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-2xl font-black">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/55">
                        Premium black and gold lounge experience
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <section id="contact" className="px-5 py-24 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-yellow-400/20 bg-gradient-to-br from-yellow-950/30 via-white/[0.04] to-black p-6 backdrop-blur-xl sm:p-10">
              <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
                <div>
                  <div className="mb-6 inline-flex rounded-full border border-yellow-400/30 bg-yellow-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-200">
                    Contact
                  </div>

                  <h2 className="text-4xl font-black uppercase sm:text-6xl">
                    Ready to enter the cult?
                  </h2>

                  <p className="mt-5 leading-8 text-white/60">
                    Visit the lounge, book a slot, or message for PS5, PS4, snooker, and table football sessions.
                  </p>

                  <div className="mt-8 space-y-4">
                    <InfoRow icon={<FaPhoneAlt />} label="Phone" value="+91 XXXXX XXXXX" />
                    <InfoRow icon={<FaInstagram />} label="Instagram" value="@hangovergamingcult" />
                    <InfoRow icon={<FaMapMarkerAlt />} label="Location" value="Tamil Nadu, India" />
                  </div>
                </div>

                <div className="grid gap-4">
                  <input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-yellow-400/50"
                    placeholder="Name"
                  />
                  <input
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-yellow-400/50"
                    placeholder="Phone"
                  />
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="min-h-36 rounded-2xl border border-white/10 bg-black/35 px-5 py-4 text-white outline-none placeholder:text-white/30 focus:border-yellow-400/50"
                    placeholder="Message"
                  />

                  {contactSuccess && (
                    <div className="rounded-2xl border border-green-400/25 bg-green-500/10 p-4 text-sm text-green-200">
                      {contactSuccess}
                    </div>
                  )}

                  {contactError && (
                    <div className="rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200">
                      {contactError}
                    </div>
                  )}

                  <button
                    onClick={sendMessage}
                    disabled={contactSaving}
                    className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-black shadow-[0_0_50px_rgba(234,179,8,.35)] disabled:opacity-60"
                  >
                    {contactSaving ? "Sending..." : "Send Message"} <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </section>

          <SiteFooter />
        </main>
      )}
    </div>
  );
}

function AdminPage(props) {
  const {
    adminUnlocked,
    adminInput,
    setAdminInput,
    adminError,
    unlockAdmin,
    bookings,
    messages,
    pricing,
    loadingAdmin,
    loadAdminData,
    totalRevenue,
    todayBookings,
    setAdminUnlocked,
    updateBookingStatus,
    markMessageRead,
    updatePrice,
    savePrice,
    goToHomeSection,
  } = props;

  return (
    <main className="min-h-screen px-5 pt-32 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <button
          onClick={() => goToHomeSection("home")}
          className="mb-8 rounded-full border border-yellow-400/20 bg-white/[0.04] px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-100"
        >
          Back to website
        </button>

        <SectionTitle
          eyebrow="Shop owner only"
          title="Private admin dashboard"
          desc="Owner access for bookings, messages, pricing, and session status control."
        />

        {!adminUnlocked ? (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-12 max-w-xl rounded-[2rem] border border-yellow-400/20 bg-white/[0.04] p-7 text-center backdrop-blur-xl"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-yellow-500/15 text-3xl text-yellow-300">
              <FaLock />
            </div>

            <h3 className="text-3xl font-black">Owner Login</h3>
            <p className="mt-3 text-white/50">
              Enter the shop owner password to open the private dashboard.
            </p>

            <input
              type="password"
              value={adminInput}
              onChange={(e) => setAdminInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") unlockAdmin();
              }}
              className="mt-7 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-center text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400/50"
              placeholder="Admin password"
            />

            {adminError && (
              <div className="mt-4 rounded-2xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-200">
                {adminError}
              </div>
            )}

            <button
              onClick={unlockAdmin}
              className="mt-5 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 px-7 py-4 text-sm font-black uppercase tracking-[0.2em] text-black shadow-[0_0_50px_rgba(234,179,8,.35)]"
            >
              Unlock Admin <FaUnlock />
            </button>
          </motion.div>
        ) : (
          <AdminDashboard
            bookings={bookings}
            messages={messages}
            pricing={pricing}
            loadingAdmin={loadingAdmin}
            loadAdminData={loadAdminData}
            totalRevenue={totalRevenue}
            todayBookings={todayBookings}
            setAdminUnlocked={setAdminUnlocked}
            updateBookingStatus={updateBookingStatus}
            markMessageRead={markMessageRead}
            updatePrice={updatePrice}
            savePrice={savePrice}
          />
        )}
      </div>
    </main>
  );
}

function AdminDashboard({
  bookings,
  messages,
  pricing,
  loadingAdmin,
  loadAdminData,
  totalRevenue,
  todayBookings,
  setAdminUnlocked,
  updateBookingStatus,
  markMessageRead,
  updatePrice,
  savePrice,
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} className="mt-12 pb-24">
      <div className="mb-8 flex flex-col justify-between gap-4 rounded-[2rem] border border-green-400/20 bg-green-500/10 p-5 backdrop-blur-xl sm:flex-row sm:items-center">
        <div>
          <h3 className="text-2xl font-black text-green-100">Owner dashboard unlocked</h3>
          <p className="mt-1 text-sm text-white/50">Private control panel for shop owners only.</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={loadAdminData}
            className="flex items-center gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-500/10 px-5 py-3 text-sm font-black uppercase tracking-[0.15em] text-yellow-100"
          >
            {loadingAdmin ? "Loading..." : "Refresh"} <FaSyncAlt />
          </button>

          <button
            onClick={() => setAdminUnlocked(false)}
            className="rounded-2xl border border-red-400/20 bg-red-500/10 px-5 py-3 text-sm font-black uppercase tracking-[0.15em] text-red-100"
          >
            Lock
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-4">
        {[
          ["Total Bookings", bookings.length, <FaCalendarCheck />],
          ["Messages", messages.length, <FaEnvelope />],
          ["Today Bookings", todayBookings, <FaClock />],
          ["Confirmed Revenue", `₹${totalRevenue}`, <FaMoneyBillWave />],
        ].map(([label, value, icon], i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-[2rem] border border-yellow-400/15 bg-white/[0.04] p-6 backdrop-blur-xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/15 text-2xl text-yellow-300">
              {icon}
            </div>
            <div className="text-3xl font-black text-yellow-200">{value}</div>
            <div className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
              {label}
            </div>
          </motion.div>
        ))}
      </div>

      <AdminBookings bookings={bookings} updateBookingStatus={updateBookingStatus} />
      <AdminMessages messages={messages} markMessageRead={markMessageRead} />
      <AdminPricing pricing={pricing} updatePrice={updatePrice} savePrice={savePrice} />
    </motion.div>
  );
}

function AdminBookings({ bookings, updateBookingStatus }) {
  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-yellow-400/15 bg-white/[0.04] backdrop-blur-xl">
      <div className="border-b border-white/10 p-6">
        <h3 className="text-2xl font-black">Booking Requests</h3>
        <p className="mt-2 text-sm text-white/45">
          Confirm or cancel customer booking requests.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="p-8 text-center text-white/45">No bookings yet.</div>
      ) : (
        <div className="divide-y divide-white/10">
          {bookings.map((booking) => (
            <div key={booking.id} className="grid gap-4 p-5 xl:grid-cols-8 xl:items-center">
              <MiniInfo label="Name" value={booking.customer_name} />
              <MiniInfo label="Phone" value={booking.phone} />
              <MiniInfo label="Zone" value={booking.zone} />
              <MiniInfo label="Date" value={booking.booking_date} />
              <MiniInfo label="Time" value={booking.booking_time} />
              <MiniInfo label="Notes" value={booking.notes || "—"} />

              <div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                  className="rounded-xl border border-green-400/20 bg-green-500/10 px-3 py-2 text-xs font-black text-green-200"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                  className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-xs font-black text-red-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminMessages({ messages, markMessageRead }) {
  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-yellow-400/15 bg-white/[0.04] backdrop-blur-xl">
      <div className="border-b border-white/10 p-6">
        <h3 className="text-2xl font-black">Customer Messages</h3>
        <p className="mt-2 text-sm text-white/45">Messages sent from the contact section.</p>
      </div>

      {messages.length === 0 ? (
        <div className="p-8 text-center text-white/45">No messages yet.</div>
      ) : (
        <div className="divide-y divide-white/10">
          {messages.map((msg) => (
            <div key={msg.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_1fr_2fr_auto] lg:items-center">
              <MiniInfo label="Name" value={msg.name} />
              <MiniInfo label="Phone" value={msg.phone} />
              <MiniInfo label="Message" value={msg.message} />

              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.15em] ${
                    msg.status === "Read"
                      ? "bg-green-500/15 text-green-300"
                      : "bg-yellow-500/15 text-yellow-300"
                  }`}
                >
                  {msg.status}
                </span>

                <button
                  onClick={() => markMessageRead(msg.id)}
                  className="rounded-xl border border-yellow-400/20 bg-yellow-500/10 px-3 py-2 text-xs font-black text-yellow-100"
                >
                  Mark Read
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminPricing({ pricing, updatePrice, savePrice }) {
  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-yellow-400/15 bg-white/[0.04] backdrop-blur-xl">
      <div className="border-b border-white/10 p-6">
        <h3 className="text-2xl font-black">Change Pricing</h3>
        <p className="mt-2 text-sm text-white/45">Edit prices and descriptions shown on the website.</p>
      </div>

      <div className="grid gap-5 p-5 md:grid-cols-2">
        {pricing.map((item) => (
          <div key={item.service} className="rounded-3xl border border-white/10 bg-black/35 p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h4 className="text-xl font-black">{item.service}</h4>
              <FaEdit className="text-yellow-300" />
            </div>

            <label className="text-xs uppercase tracking-[0.2em] text-white/35">Price</label>
            <input
              value={item.price}
              onChange={(e) => updatePrice(item.id, "price", e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
            />

            <label className="mt-4 block text-xs uppercase tracking-[0.2em] text-white/35">Description</label>
            <textarea
              value={item.description || ""}
              onChange={(e) => updatePrice(item.id, "description", e.target.value)}
              className="mt-2 min-h-24 w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none focus:border-yellow-400/50"
            />

            <button
              onClick={() => savePrice(item)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300 px-5 py-3 text-sm font-black uppercase tracking-[0.15em] text-black"
            >
              Save Price <FaSave />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniInfo({ label, value }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-white/35">{label}</div>
      <div className="line-clamp-2 font-bold text-white/75">{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const normalized = status || "Pending";

  const styles = {
    Pending: "bg-yellow-500/15 text-yellow-300",
    Confirmed: "bg-green-500/15 text-green-300",
    Cancelled: "bg-red-500/15 text-red-300",
  };

  const Icon =
    normalized === "Confirmed"
      ? FaCheckCircle
      : normalized === "Cancelled"
      ? FaTimesCircle
      : FaHourglassHalf;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.15em] ${
        styles[normalized] || styles.Pending
      }`}
    >
      <Icon />
      {normalized}
    </span>
  );
}

function CinematicIntro() {
  const [showIntro, setShowIntro] = useState(true);
  const [started, setStarted] = useState(false);

  const bars = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: `${8 + i * 7}%`,
        left: `${(i * 17) % 100}%`,
        width: `${70 + ((i * 43) % 150)}px`,
        delay: 0.7 + i * 0.12,
      })),
    []
  );

  const playSFX = () => {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    const audioCtx = new AudioContextClass();
    const master = audioCtx.createGain();
    const compressor = audioCtx.createDynamicsCompressor();

    master.gain.setValueAtTime(0.9, audioCtx.currentTime);
    compressor.threshold.setValueAtTime(-18, audioCtx.currentTime);
    compressor.knee.setValueAtTime(18, audioCtx.currentTime);
    compressor.ratio.setValueAtTime(8, audioCtx.currentTime);
    compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
    compressor.release.setValueAtTime(0.18, audioCtx.currentTime);

    master.connect(compressor);
    compressor.connect(audioCtx.destination);

    const tone = (freq, start, duration, type = "sine", gain = 0.18) => {
      const osc = audioCtx.createOscillator();
      const vol = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);

      vol.gain.setValueAtTime(0.0001, audioCtx.currentTime + start);
      vol.gain.exponentialRampToValueAtTime(gain, audioCtx.currentTime + start + 0.025);
      vol.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + start + duration);

      osc.connect(vol);
      vol.connect(master);

      osc.start(audioCtx.currentTime + start);
      osc.stop(audioCtx.currentTime + start + duration);
    };

    const noise = (start, duration, gain = 0.42) => {
      const bufferSize = Math.floor(audioCtx.sampleRate * duration);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2.3);
      }

      const source = audioCtx.createBufferSource();
      const vol = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1200, audioCtx.currentTime + start);

      source.buffer = buffer;
      vol.gain.setValueAtTime(gain, audioCtx.currentTime + start);
      vol.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + start + duration);

      source.connect(filter);
      filter.connect(vol);
      vol.connect(master);

      source.start(audioCtx.currentTime + start);
      source.stop(audioCtx.currentTime + start + duration);
    };

    tone(32, 0, 2.5, "sine", 0.5);
    tone(48, 0.07, 2.1, "triangle", 0.34);
    tone(96, 0.22, 1.5, "sawtooth", 0.14);
    tone(210, 0.5, 1.0, "sawtooth", 0.11);
    tone(420, 0.82, 0.55, "square", 0.07);
    noise(0.03, 0.48, 0.55);
    noise(1.05, 0.8, 0.7);
    tone(760, 1.12, 0.25, "sawtooth", 0.16);
    tone(1250, 1.18, 0.16, "square", 0.1);
    tone(55, 1.35, 1.35, "sine", 0.48);
  };

  const startIntro = () => {
    setStarted(true);
    playSFX();
    setTimeout(() => setShowIntro(false), 4300);
  };

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-[9999] overflow-hidden bg-black text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(22px)" }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.22),transparent_34%),linear-gradient(135deg,#030303,#171005,#020202)]" />

          <motion.div
            className="absolute inset-0 opacity-25"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          {!started ? (
            <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="mb-8 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-5 py-2 text-xs font-black uppercase tracking-[0.45em] text-yellow-300 shadow-[0_0_35px_rgba(234,179,8,0.4)]"
              >
                Premium Lounge Experience
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-3xl border border-yellow-400/30 bg-white/[0.04]"
              >
                <img src="/images/logo.png" alt="Logo" className="h-full w-full object-cover" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="max-w-5xl text-4xl font-black uppercase tracking-tight sm:text-6xl md:text-8xl"
              >
                <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(234,179,8,0.7)]">
                  Hangover Gaming
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "min(560px, 80vw)" }}
                transition={{ duration: 1, delay: 0.7 }}
                className="my-6 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent shadow-[0_0_25px_gold]"
              />

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="text-lg font-black uppercase tracking-[0.35em] text-white/80 sm:text-2xl"
              >
                X Samurai Websites
              </motion.h2>

              <motion.button
                onClick={startIntro}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="mt-12 flex items-center gap-3 rounded-full border border-yellow-400/60 bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-300 px-9 py-4 text-sm font-black uppercase tracking-[0.25em] text-black shadow-[0_0_55px_rgba(234,179,8,0.65)] transition hover:shadow-[0_0_85px_rgba(234,179,8,0.9)]"
              >
                Enter The Cult <FaVolumeUp />
              </motion.button>

              <p className="mt-5 text-xs uppercase tracking-[0.25em] text-white/40">
                Tap to enable cinematic audio
              </p>
            </div>
          ) : (
            <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
              <motion.div
                initial={{ scale: 0.72, opacity: 0, rotateX: 25 }}
                animate={{ scale: [0.72, 1.08, 1], opacity: 1, rotateX: 0 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="relative"
              >
                <motion.div
                  className="absolute -inset-20 rounded-full bg-yellow-600/20 blur-3xl"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-5 text-xs font-black uppercase tracking-[0.5em] text-yellow-300"
                >
                  Samurai Websites Presents
                </motion.p>

                <motion.h1
                  className="text-5xl font-black uppercase leading-none tracking-tight sm:text-7xl md:text-9xl"
                  animate={{
                    textShadow: [
                      "0 0 20px rgba(234,179,8,.8)",
                      "0 0 70px rgba(234,179,8,1)",
                      "0 0 25px rgba(234,179,8,.8)",
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <span className="block bg-gradient-to-b from-white via-yellow-100 to-yellow-700 bg-clip-text text-transparent">
                    Hangover
                  </span>
                  <span className="block bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-950 bg-clip-text text-transparent">
                    Gaming Cult
                  </span>
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 0.35, 1] }}
                  transition={{ duration: 1.3, delay: 1.1 }}
                  className="mx-auto mt-8 h-[3px] max-w-3xl origin-center bg-gradient-to-r from-transparent via-yellow-500 to-transparent shadow-[0_0_35px_gold]"
                />
              </motion.div>

              <motion.div
                initial={{ x: "-120vw", rotate: -18, opacity: 0 }}
                animate={{ x: "120vw", opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, delay: 1.15, ease: "easeInOut" }}
                className="absolute top-1/2 h-2 w-[160vw] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_50px_gold]"
              />

              {bars.map((bar) => (
                <motion.div
                  key={bar.id}
                  className="absolute h-2 bg-yellow-500/50"
                  style={{ width: bar.width, top: bar.top, left: bar.left }}
                  animate={{ opacity: [0, 1, 0], x: [0, bar.id % 2 === 0 ? 35 : -35] }}
                  transition={{ duration: 0.24, delay: bar.delay, repeat: 4 }}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Navbar({ navLinks, menuOpen, setMenuOpen, goToHomeSection, goToAdmin }) {
  const handleClick = (link) => {
    setMenuOpen(false);
    if (link.type === "admin") goToAdmin();
    else goToHomeSection(link.target);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-yellow-400/10 bg-black/60 px-5 py-4 backdrop-blur-2xl sm:px-8 lg:px-16">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">
        <button onClick={() => goToHomeSection("home")} className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-xl border border-yellow-400/25">
            <img src="/images/logo.png" alt="Logo" className="h-full w-full object-cover" />
          </div>

          <div className="text-lg font-black uppercase tracking-[0.2em]">
            <span className="text-white">Hangover</span>
            <span className="text-yellow-400"> Cult</span>
          </div>
        </button>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleClick(link)}
              className="text-xs font-black uppercase tracking-[0.2em] text-white/55 transition hover:text-yellow-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl border border-white/10 bg-white/5 p-3 md:hidden"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-4 grid gap-3 rounded-3xl border border-yellow-400/15 bg-black/90 p-4 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link)}
                className="rounded-2xl bg-white/[0.04] px-4 py-3 text-left text-sm font-black uppercase tracking-[0.2em] text-white/65"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroImageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative mx-auto w-full max-w-xl"
    >
      <motion.div
        className="absolute -inset-10 rounded-full bg-yellow-600/20 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative overflow-hidden rounded-[2.5rem] border border-yellow-400/20 bg-white/[0.04] p-4 shadow-[0_0_70px_rgba(234,179,8,.18)] backdrop-blur-xl">
        <div className="relative h-[520px] overflow-hidden rounded-[2rem]">
          <img
            src="/images/ps5.jpg"
            alt="PS5 Arena"
            onError={(e) => {
              e.currentTarget.src = "/images/logo.png";
            }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-yellow-400/20 bg-black/60 p-5 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-green-300">
                Open Now
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/35">
                Premium Lounge
              </span>
            </div>

            <h3 className="text-2xl font-black">Gold Class Gaming Lounge</h3>
            <p className="mt-2 text-sm text-white/55">
              PS5, PS4, snooker, table football, and owner approval booking.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-4 inline-flex rounded-full border border-yellow-400/30 bg-yellow-500/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-yellow-200">
        {eyebrow}
      </div>
      <h2 className="text-4xl font-black uppercase leading-tight sm:text-5xl">{title}</h2>
      <p className="mt-5 leading-8 text-white/55">{desc}</p>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/15 text-yellow-300">
        {icon}
      </div>
      <div>
        <div className="text-xs uppercase tracking-[0.2em] text-white/35">{label}</div>
        <div className="font-black text-white/85">{value}</div>
      </div>
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 text-center sm:px-8 lg:px-16">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-yellow-400/25 bg-white/[0.04]">
        <img src="/images/logo.png" alt="Hangover Gaming Cult Logo" className="h-full w-full object-cover" />
      </div>

      <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-yellow-200">
        Hangover Gaming Cult
      </h3>

      <p className="mt-3 text-sm text-white/40">
        Premium booking website crafted by Samurai Websites.
      </p>

      <a
        href={SAMURAI_WEBSITE_URL}
        target="_blank"
        rel="noreferrer"
        className="mx-auto mt-5 inline-flex items-center gap-3 rounded-full border border-yellow-400/20 bg-yellow-500/10 px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-yellow-100 transition hover:bg-yellow-500/20"
      >
        <FaGlobe />
        Visit Samurai Websites
      </a>
    </footer>
  );
}