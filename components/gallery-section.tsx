"use client"

import Image from "next/image"
import { useState, useEffect, useCallback, useRef } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const PROJECTS = [
  { src: "/images/gallery-1.jpg", alt: "Custom dark aluminum lattice pergola over patio" },
  { src: "/images/gallery-2.jpg", alt: "White solid-roof patio cover with outdoor dining" },
  { src: "/images/gallery-3.jpg", alt: "Louvered pergola over outdoor kitchen" },
  { src: "/images/gallery-4.jpg", alt: "White lattice patio cover over pool area" },
  { src: "/images/gallery-5.jpg", alt: "Modern solid-roof patio cover at golden hour" },
  { src: "/images/gallery-6.jpg", alt: "Two-tone freestanding patio cover with furniture" },
  { src: "/images/gallery-7.jpg", alt: "Brown lattice pergola with wicker daybed and desert landscaping" },
  { src: "/images/gallery-8.jpg", alt: "Brown lattice sun cover viewed from underneath" },
  { src: "/images/gallery-9.jpg", alt: "Dark lattice sun cover with shadow patterns on turf" },
  { src: "/images/gallery-10.jpg", alt: "Dark gray freestanding lattice pergola on pavers" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_b94rkeb94rkeb94r.png-Zcka3T16GI0MfBqDoyJoh71KIJCVJM.jpeg", alt: "Solid-roof patio cover with ceiling fans and outdoor dining" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_9lju049lju049lju.png-iYjVTTF4OyBN0ZlnnqPHNlzmRvqSdm.jpeg", alt: "Modern louvered pergola over outdoor bar area" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_g1sgstg1sgstg1sg.png-fTN2Pe2Tr9gry5nJAdMvC68dDr8urv.jpeg", alt: "Dark freestanding pergola on green turf with stepping stones" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_6dxzay6dxzay6dxz.png-O12q2IiI23NE5wQ12jbFSA4Rlyr1Aq.jpeg", alt: "Solid-roof attached patio cover with dual ceiling fans" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_jj27vyjj27vyjj27.png-ajDW7tWgHf3nOih5KAs8jbpocCymaJ.jpeg", alt: "White lattice pergola with mountain views" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_44ltur44ltur44lt.png-4fG4ARgBdl2T9da5ufGehOGPNJnIDG.jpeg", alt: "Dark louvered pergola by pool with privacy slats" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_i58c1ui58c1ui58c.png-riLe0fIW2aBQhsPzlfNkwHHNYu80pt.jpeg", alt: "Solid-roof pergola over outdoor kitchen with grill" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_1zi2sq1zi2sq1zi2.png-1pLeNJNOiZfc0uLv4Nsu9FyBtZho6g.jpeg", alt: "Luxury pool pergola with waterfall feature at dusk" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_5y6ya25y6ya25y6y.png-MpjvCer6VHRPBGWwkBeLE3QzjW5ty2.jpeg", alt: "Evening pergola with string lights in Mesa AZ" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_4aq3o24aq3o24aq3.png-w1y89GRQ73EWPdu66avlaRhnqDawUa.jpeg", alt: "Freestanding solid-roof pergola on paver patio" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_s3187gs3187gs318.png-H7wygoMjPVYyiMplzxMusvp7zlJD9G.jpeg", alt: "Dark louvered pergola with privacy wall by pool" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_6sb5ia6sb5ia6sb5.png-C8Bd4arsldd0g0jfgPZIvGUriDZe4s.jpeg", alt: "Modern pergola with horizontal slat walls on turf" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_s8h5lus8h5lus8h5.png-FNTURxspApBF2KbzrCgK1EubPeh5qO.jpeg", alt: "Solid-roof pergola over outdoor kitchen by spa" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_ga9atiga9atiga9a.png-ojFVDM2ljL46RaydNwF9ormLf9DxXf.jpeg", alt: "Freestanding dark pergola on paver patio with turf" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_n99aq3n99aq3n99a.png-mDMlrSHuJ7ppwAPJPD5HLCawAFiLsv.jpeg", alt: "Solid-roof pergola with outdoor kitchen and desert landscaping" },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_w268uiw268uiw268.png-MsHAYKrD1uTprgFVh3J68dvDG8hNiT.jpeg", alt: "Bronze pergola with ceiling fan over stone outdoor kitchen" },
]

const poppinsStyle = { fontFamily: "var(--font-poppins), Poppins, sans-serif" }

export function GallerySection() {
  const [current, setCurrent] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % PROJECTS.length)
    }, 10000)
  }, [])

  useEffect(() => {
    if (lightboxIndex !== null) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [lightboxIndex, startTimer])

  const goToSlide = (index: number) => {
    setCurrent(index)
    startTimer()
  }

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = "hidden"
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ""
  }, [])

  const lightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % PROJECTS.length : null))
  }, [])

  const lightboxPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + PROJECTS.length) % PROJECTS.length : null))
  }, [])

  return (
    <section className="bg-background py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-amber-600">
            See Our Stunning Results
          </p>
          <h2
            className="text-3xl font-bold text-foreground sm:text-4xl text-balance"
            style={poppinsStyle}
          >
            Explore Our Recent Patio Projects
          </h2>
        </div>

        <div className="mx-auto max-w-4xl">
          <div
            onClick={() => openLightbox(current)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(current) } }}
            role="button"
            tabIndex={0}
            className="group relative isolate w-full overflow-hidden rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-600"
            aria-label={`View ${PROJECTS[current].alt}`}
          >
            {PROJECTS.map((project, i) => (
              <Image
                key={project.src}
                src={project.src}
                alt={project.alt}
                width={896}
                height={560}
                className={`w-full h-auto object-cover transition-opacity duration-700 ease-in-out ${
                  i === current ? "relative opacity-100" : "absolute inset-0 opacity-0"
                }`}
                sizes="(max-width: 896px) 100vw, 896px"
                priority={i === 0}
              />
            ))}
            <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10 pointer-events-none" />
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? "w-6 bg-amber-600" : "w-2 bg-foreground/20"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X className="size-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); lightboxPrev() }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PROJECTS[lightboxIndex].src}
              alt={PROJECTS[lightboxIndex].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); lightboxNext() }}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  )
}
