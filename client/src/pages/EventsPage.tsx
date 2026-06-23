"use client"

import { useEffect, useState, useRef } from "react"
type ApiEvent = {
  id: string
  title: string
  description: string
  posterUrl: string
  startDate: string | null
  isCurrent: boolean
  speakerName?: string
  speakerInfo?: string
  registrationLink?: string
  regLink?: string
  googleFormLink?: string
  galleryUrls?: string[]
  galleryImageUrls?: string[]
  venue?: string
  capacity?: number
}
import { gsap } from "gsap"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  User,
  Globe,
  FileText,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ImageIcon,
} from "lucide-react"

type Event = ApiEvent

const EventsPage = () => {
  const [currentEvents, setCurrentEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())
  const pageRef = useRef<HTMLDivElement>(null)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Auto-play slideshow
  useEffect(() => {
    if (!selectedEvent || !isAutoPlay) return
    const slideImages = getSlideImages(selectedEvent)
    if (slideImages.length <= 1) return

    autoPlayRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slideImages.length)
    }, 4000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [selectedEvent, isAutoPlay])

  useEffect(() => {
    const LOADING_TIMEOUT_MS= 5000;

    let timeoutId: NodeJS.Timeout | null = null;

    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`)
        }

        const data = (await response.json()) as {
          currentEvents: Event[]
          pastEvents: Event[]
        }

        setCurrentEvents(data.currentEvents || [])
        setPastEvents(data.pastEvents || [])
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setLoading(false)
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
      }
    }

    setLoading(true); 
    timeoutId = setTimeout(() => {
      setLoading(false); 
      console.warn("Event data loading timed out.");
    }, LOADING_TIMEOUT_MS);

    fetchEvents();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [])

  useEffect(() => {
    if (!loading && pageRef.current) {
      gsap.fromTo(pageRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      gsap.fromTo(
        ".page-title",
        { opacity: 0, y: 100, rotationX: -90 },
        { opacity: 1, y: 0, rotationX: 0, duration: 1.2, ease: isMobile ? "power2.out" : "elastic.out(1, 0.8)", delay: 0.3 },
      )
      gsap.fromTo(
        ".event-card",
        { opacity: 0, y: isMobile ? 30 : 60, scale: 0.9, rotationY: isMobile ? 0 : -15 },
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: isMobile ? 0.8 : 1, stagger: 0.15, ease: "power3.out", delay: 0.6 },
      )
      gsap.fromTo(
        ".events-circle",
        { scale: 0, rotation: isMobile ? 0 : -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: isMobile ? 1.5 : 2, stagger: 0.1, ease: "back.out(1.7)", delay: 0.5 },
      )
      if (!isMobile) {
        gsap.to(".events-circle", {
          y: "random(-15, 15)", rotation: "random(-3, 3)",
          duration: "random(4, 8)", repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.2, delay: 2,
        })
      }
    }
  }, [loading, isMobile])

  const formatDate = (dateIso: string | null) => dateIso ? new Date(dateIso).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) : ""
  const formatTime = (dateIso: string | null) => dateIso ? new Date(dateIso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : ""

  const openEventDetails = (event: Event) => {
    setSelectedEvent(event)
    setCurrentSlideIndex(0)
    setIsAutoPlay(true)
    document.body.style.overflow = "hidden"
  }

  const closeEventDetails = () => {
    setSelectedEvent(null)
    document.body.style.overflow = "unset"
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
  }

  const getSlideImages = (event: Event) => [event.posterUrl, ...(event.galleryUrls || []), ...(event.galleryImageUrls || [])].filter(Boolean)
  const getRegistrationLink = (event: Event) => event.googleFormLink || event.regLink || event.registrationLink

  const nextSlide = () => {
    if (!selectedEvent) return
    const slideImages = getSlideImages(selectedEvent)
    setCurrentSlideIndex((prev) => (prev + 1) % slideImages.length)
  }

  const prevSlide = () => {
    if (!selectedEvent) return
    const slideImages = getSlideImages(selectedEvent)
    setCurrentSlideIndex((prev) => (prev - 1 + slideImages.length) % slideImages.length)
  }

  const handleImageError = (imageUrl: string) => setImageLoadErrors((prev) => new Set(prev).add(imageUrl))
  const getImageSrc = (imageUrl: string) => imageLoadErrors.has(imageUrl) ? "/placeholder.svg" : imageUrl || "/placeholder.svg"

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-green flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-mindaro border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <motion.div ref={pageRef} className="relative min-h-screen w-full bg-dark-green pt-28 md:pt-36 lg:pt-40" style={{ perspective: 1000 }}>
      <motion.div className="absolute inset-0 pointer-events-none">
        <svg className="events-circle absolute -top-16 -right-16 w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[600px] lg:h-[600px] md:-top-24 md:-right-24 lg:-top-32 lg:-right-32 opacity-6 z-10" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="2" className="text-office-green animate-pulse" />
          <circle cx="300" cy="300" r="240" stroke="currentColor" strokeWidth="1.5" className="text-mindaro" />
        </svg>
        <svg className="events-circle absolute top-1/2 -left-20 w-[350px] h-[350px] md:w-[525px] md:h-[525px] lg:w-[700px] lg:h-[700px] md:-left-30 lg:-left-40 opacity-8 transform -translate-y-1/2 z-10" viewBox="0 0 700 700" fill="none">
          <circle cx="350" cy="350" r="320" stroke="currentColor" strokeWidth="2" className="text-mindaro animate-pulse" style={{ animationDelay: "2s" }} />
          <circle cx="350" cy="350" r="280" stroke="currentColor" strokeWidth="1.5" className="text-office-green" />
        </svg>
        <svg className="events-circle absolute -bottom-20 -right-12 w-[250px] h-[250px] md:w-[375px] md:h-[375px] lg:w-[500px] lg:h-[500px] md:-bottom-30 md:-right-18 lg:-bottom-40 lg:-right-24 opacity-10 z-10" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="230" stroke="currentColor" strokeWidth="2" className="text-office-green animate-pulse" style={{ animationDelay: "4s" }} />
          <circle cx="250" cy="250" r="195" stroke="currentColor" strokeWidth="1.5" className="text-mindaro" />
        </svg>
      </motion.div>

      <div className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-6 sm:pb-12 md:pt-8 md:pb-16 lg:pt-12 lg:pb-24">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.h1 className="page-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4" whileHover={!isMobile ? { scale: 1.02 } : {}} transition={{ type: "spring", stiffness: 300 }}>
              Our <span className="text-mindaro">Events</span>
            </motion.h1>
            <motion.p className="text-lg md:text-xl text-baby-powder/80 max-w-3xl mx-auto leading-relaxed" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              Discover our upcoming events and explore the impactful moments from our past gatherings
            </motion.p>
          </div>

          {currentEvents.length > 0 && (
            <motion.div className="mb-16 sm:mb-20 md:mb-24" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2"><span className="text-mindaro">Upcoming</span> Events</h2>
                <div className="h-1 bg-mindaro w-24 sm:w-32 md:w-40 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {currentEvents.map((event) => (
                  <motion.div key={event.id} layoutId={`card-${event.id}`} className="event-card group cursor-pointer" onClick={() => openEventDetails(event)}>
                    <motion.div className="relative bg-gradient-to-br from-battleship-gray/25 to-battleship-gray/10 backdrop-blur-md border border-mindaro/30 rounded-3xl overflow-hidden shadow-2xl hover:border-mindaro/60 transition-all duration-500" whileHover={!isMobile ? { scale: 1.02, y: -8, boxShadow: "0 25px 50px rgba(174, 219, 129, 0.3)" } : {}} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-mindaro/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative overflow-hidden h-56 sm:h-64 md:h-72">
                        <motion.img src={getImageSrc(event.posterUrl)} alt={event.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" onError={() => handleImageError(event.posterUrl)} />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-green/90 via-dark-green/20 to-transparent"></div>
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-mindaro to-mindaro/80 text-dark-green px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Current
                        </div>
                        <div className="absolute inset-0 bg-dark-green/0 group-hover:bg-dark-green/40 transition-all duration-500 flex flex-col items-center justify-center p-4 text-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                            <div className="bg-mindaro/95 text-dark-green px-6 py-3 rounded-full font-bold text-lg shadow-xl flex items-center gap-2">
                              View Details <ArrowRight className="w-5 h-5" />
                            </div>
                            {getRegistrationLink(event) && (
                              <motion.a href={getRegistrationLink(event)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-5 rounded-full text-sm" onClick={(e) => e.stopPropagation()} whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}>
                                Register Now
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="relative p-6 sm:p-8">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 group-hover:text-mindaro transition-colors duration-300">{event.title}</h3>
                        {event.speakerName && <div className="flex items-center gap-3 mb-4"><div className="w-8 h-8 bg-mindaro/20 rounded-full flex items-center justify-center"><Users className="w-4 h-4 text-mindaro" /></div><span className="text-baby-powder/90 font-medium">{event.speakerName}</span></div>}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-baby-powder/80"><div className="w-8 h-8 bg-office-green/20 rounded-full flex items-center justify-center"><Calendar className="w-4 h-4 text-office-green" /></div><span className="text-sm font-medium">{formatDate(event.startDate)}</span></div>
                          <div className="flex items-center gap-3 text-baby-powder/80"><div className="w-8 h-8 bg-office-green/20 rounded-full flex items-center justify-center"><Clock className="w-4 h-4 text-office-green" /></div><span className="text-sm font-medium">{formatTime(event.startDate)}</span></div>
                          {event.venue && <div className="flex items-center gap-3 text-baby-powder/80"><div className="w-8 h-8 bg-office-green/20 rounded-full flex items-center justify-center"><MapPin className="w-4 h-4 text-office-green" /></div><span className="text-sm font-medium">{event.venue}</span></div>}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {pastEvents.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2"><span className="text-mindaro">Past</span> Events</h2>
                <div className="h-1 bg-mindaro w-24 sm:w-32 md:w-40 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pastEvents.map((event) => {
                  const slideImages = getSlideImages(event)
                  const hasGallery = slideImages.length > 1
                  return (
                    <motion.div key={event.id} layoutId={`card-${event.id}`} className="event-card group cursor-pointer" onClick={() => openEventDetails(event)}>
                      <motion.div className="relative bg-gradient-to-br from-battleship-gray/20 to-battleship-gray/5 backdrop-blur-md border border-office-green/25 rounded-2xl overflow-hidden shadow-xl hover:border-office-green/50 transition-all duration-500" whileHover={!isMobile ? { scale: 1.05, y: -10, boxShadow: "0 25px 45px rgba(116, 182, 83, 0.25)" } : {}} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                        {hasGallery && <div className="absolute top-3 left-3 z-10 bg-office-green/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"><ImageIcon className="w-3 h-3" />{slideImages.length}</div>}
                        <div className="relative overflow-hidden h-44 sm:h-52">
                          <motion.img src={getImageSrc(slideImages[0])} alt={event.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" onError={() => handleImageError(slideImages[0])} />
                          <div className="absolute inset-0 bg-gradient-to-t from-dark-green/80 via-dark-green/20 to-transparent"></div>
                          <div className="absolute inset-0 bg-dark-green/0 group-hover:bg-dark-green/25 transition-all duration-500 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                              <div className="bg-office-green/95 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-xl flex items-center gap-2">{hasGallery ? "View Gallery" : "View Details"}<ArrowRight className="w-4 h-4" /></div>
                            </div>
                          </div>
                        </div>
                        <div className="relative p-5">
                          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-office-green transition-colors duration-300 line-clamp-2">{event.title}</h3>
                          <div className="flex items-center gap-2 text-baby-powder/70 mb-2"><div className="w-6 h-6 bg-office-green/20 rounded-full flex items-center justify-center"><Calendar className="w-3 h-3 text-office-green" /></div><span className="text-xs font-medium">{formatDate(event.startDate)}</span></div>
                          {hasGallery && <div className="flex items-center gap-2 text-mindaro/80 text-xs"><Sparkles className="w-3 h-3" /><span>{slideImages.length} images</span></div>}
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {currentEvents.length === 0 && pastEvents.length === 0 && (
            <motion.div className="text-center py-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <div className="w-24 h-24 bg-battleship-gray/20 rounded-full flex items-center justify-center mx-auto mb-6"><Calendar className="w-12 h-12 text-mindaro" /></div>
              <h3 className="text-2xl font-bold text-white mb-2">No Events Available</h3>
              <p className="text-baby-powder/70">Check back soon for upcoming events and activities!</p>
            </motion.div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-dark-green/90 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={closeEventDetails}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div layoutId={`card-${selectedEvent.id}`} className="relative bg-gradient-to-br from-battleship-gray/30 to-battleship-gray/10 backdrop-blur-xl border border-office-green/30 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex-shrink-0 bg-gradient-to-r from-battleship-gray/40 to-battleship-gray/20 backdrop-blur-xl border-b border-office-green/30 p-4 z-10">
                <div className="flex justify-between items-start gap-4">
                  <motion.div layout="position" className="flex-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">{selectedEvent.title}</h2>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 w-fit ${selectedEvent.isCurrent ? "bg-gradient-to-r from-mindaro to-mindaro/80 text-dark-green" : "bg-gradient-to-r from-office-green to-office-green/80 text-white"}`}>
                      <Sparkles className="w-3 h-3" />{selectedEvent.isCurrent ? "Current" : "Past"}
                    </div>
                  </motion.div>
                  <motion.button onClick={closeEventDetails} className="flex-shrink-0 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <X className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-office-green/50 scrollbar-track-transparent">
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {(() => {
                        const slideImages = getSlideImages(selectedEvent)
                        return (
                          <div className="relative">
                            <motion.div layout="position" className="relative aspect-video rounded-xl overflow-hidden bg-battleship-gray/20 shadow-xl">
                              <AnimatePresence initial={false}>
                                <motion.img key={currentSlideIndex} src={getImageSrc(slideImages[currentSlideIndex])} alt={`Slide ${currentSlideIndex + 1}`} className="absolute w-full h-full object-cover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onError={() => handleImageError(slideImages[currentSlideIndex])} />
                              </AnimatePresence>
                              {slideImages.length > 1 && (
                                <>
                                  <motion.button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark-green/80 hover:bg-dark-green rounded-full flex items-center justify-center transition-colors duration-200" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronLeft className="w-4 h-4 text-white" /></motion.button>
                                  <motion.button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-dark-green/80 hover:bg-dark-green rounded-full flex items-center justify-center transition-colors duration-200" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}><ChevronRight className="w-4 h-4 text-white" /></motion.button>
                                  <motion.button onClick={() => setIsAutoPlay(!isAutoPlay)} className="absolute bottom-2 right-2 w-7 h-7 bg-dark-green/80 hover:bg-dark-green rounded-full flex items-center justify-center transition-colors duration-200" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>{isAutoPlay ? <Pause className="w-3 h-3 text-white" /> : <Play className="w-3 h-3 text-white" />}</motion.button>
                                  <div className="absolute top-2 left-2 bg-dark-green/80 text-white px-2 py-1 rounded-full text-xs font-medium">{currentSlideIndex + 1} / {slideImages.length}</div>
                                </>
                              )}
                            </motion.div>
                            {slideImages.length > 1 && (
                              <div className="flex justify-center gap-1.5 mt-3">
                                {slideImages.map((_, index) => (<motion.button key={index} onClick={() => setCurrentSlideIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlideIndex ? "bg-mindaro scale-125" : "bg-white/30 hover:bg-white/50"}`} />))}
                              </div>
                            )}
                          </div>
                        )
                      })()}
                      {selectedEvent.description && (
                        <div className="bg-gradient-to-br from-battleship-gray/25 to-battleship-gray/10 backdrop-blur-md border border-office-green/20 rounded-xl p-4 shadow-xl">
                          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2"><div className="w-5 h-5 bg-mindaro/20 rounded-full flex items-center justify-center"><FileText className="w-3 h-3 text-mindaro" /></div>About This Event</h3>
                          <p className="text-baby-powder/80 leading-relaxed text-sm whitespace-pre-wrap">{selectedEvent.description}</p>
                        </div>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-battleship-gray/25 to-battleship-gray/10 backdrop-blur-md border border-office-green/20 rounded-xl p-4 shadow-xl">
                        <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2"><div className="w-5 h-5 bg-mindaro/20 rounded-full flex items-center justify-center"><Calendar className="w-3 h-3 text-mindaro" /></div>Event Details</h3>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2"><Calendar className="w-4 h-4 text-mindaro mt-0.5 shrink-0" /><div><div className="text-white font-medium text-sm">Date</div><div className="text-baby-powder/80 text-xs">{formatDate(selectedEvent.startDate)}</div></div></div>
                          <div className="flex items-start gap-2"><Clock className="w-4 h-4 text-mindaro mt-0.5 shrink-0" /><div><div className="text-white font-medium text-sm">Time</div><div className="text-baby-powder/80 text-xs">{formatTime(selectedEvent.startDate)}</div></div></div>
                          {selectedEvent.venue && <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-mindaro mt-0.5 shrink-0" /><div><div className="text-white font-medium text-sm">Venue</div><div className="text-baby-powder/80 text-xs">{selectedEvent.venue}</div></div></div>}
                          {selectedEvent.capacity && <div className="flex items-start gap-2"><Users className="w-4 h-4 text-mindaro mt-0.5 shrink-0" /><div><div className="text-white font-medium text-sm">Capacity</div><div className="text-baby-powder/80 text-xs">{selectedEvent.capacity} participants</div></div></div>}
                        </div>
                      </div>
                      {selectedEvent.speakerName && (
                        <div className="bg-gradient-to-br from-battleship-gray/25 to-battleship-gray/10 backdrop-blur-md border border-office-green/20 rounded-xl p-4 shadow-xl">
                          <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2"><div className="w-5 h-5 bg-mindaro/20 rounded-full flex items-center justify-center"><User className="w-3 h-3 text-mindaro" /></div>Speaker</h3>
                          <div>
                            <div className="text-white font-medium text-sm">{selectedEvent.speakerName}</div>
                            {selectedEvent.speakerInfo && <div className="text-baby-powder/80 text-xs mt-1 leading-relaxed">{selectedEvent.speakerInfo}</div>}
                          </div>
                        </div>
                      )}
                      {selectedEvent.isCurrent && getRegistrationLink(selectedEvent) && (
                        <div className="pt-2">
                          <motion.a href={getRegistrationLink(selectedEvent)} target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-mindaro to-mindaro/80 hover:from-mindaro/90 hover:to-mindaro/70 text-dark-green font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-xl" whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(174, 219, 129, 0.4)" }} whileTap={{ scale: 0.98 }}>
                            <Globe className="w-4 h-4" />Register Now<ExternalLink className="w-4 h-4" />
                          </motion.a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default EventsPage
