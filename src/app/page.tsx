'use client'

import { useState, useEffect, createContext, useContext } from 'react'

interface Project {
  name: string
  description: string
  longDescription: string
  demoUrl: string
}

interface Category {
  title: string
  projects: Project[]
}

// Context for tracking expanded card
const ExpandedContext = createContext<{
  expandedCard: string | null
  setExpandedCard: (id: string | null) => void
}>({ expandedCard: null, setExpandedCard: () => {} })

const categories: Category[] = [
  {
    title: "E-commerce & Analityka",
    projects: [
      {
        name: "Payment Matcher",
        description: "Dopasowywanie płatności IDS",
        longDescription: "Automatyczne dopasowywanie płatności do zamówień w IdoSell. Redukcja czasu weryfikacji.",
        demoUrl: "https://purles.github.io/IDoSell-Payment-Matcher"
      },
      {
        name: "Order Stats",
        description: "Statystyki zamówień",
        longDescription: "Dashboard ze statystykami zamówień IdoSell. Trendy i analiza sprzedaży.",
        demoUrl: "https://purles.github.io/order-stats"
      },
      {
        name: "Konwerter SKU",
        description: "SKU Purlés → ID IdoSell",
        longDescription: "Konwersja wewnętrznych kodów SKU na identyfikatory IdoSell dla wyszukiwania.",
        demoUrl: "https://purles.github.io/konwerterSKU"
      },
      {
        name: "Paczkomat Extractor",
        description: "Ekstrakcja danych InPost",
        longDescription: "Wyciąganie i przetwarzanie danych o wysyłkach przez paczkomaty.",
        demoUrl: "https://purles.github.io/paczkomat-extractor"
      },
      {
        name: "Generator Bonów",
        description: "PDF z bonami podarunkowymi",
        longDescription: "Generowanie bonów podarunkowych w PDF. Personalizacja wartości i dat ważności.",
        demoUrl: "https://purles.github.io/generator-bonow"
      }
    ]
  },
  {
    title: "QR",
    projects: [
      {
        name: "QR Generator",
        description: "Kody QR z brandingiem Purlés",
        longDescription: "Generator kodów QR do materiałów marketingowych i opakowań.",
        demoUrl: "https://purles.github.io/QR"
      },
      {
        name: "Simple QR",
        description: "Szybki generator QR",
        longDescription: "Minimalistyczny generator podstawowych kodów QR.",
        demoUrl: "https://purles.github.io/SimpleQR"
      }
    ]
  },
  {
    title: "Treści & Opisy",
    projects: [
      {
        name: "Description Generator",
        description: "Generator opisów produktowych",
        longDescription: "Automatyzacja tworzenia spójnych opisów dla katalogu produktów Purlés.",
        demoUrl: "https://purles.github.io/description"
      },
      {
        name: "Formatter",
        description: "Formatowanie tekstów",
        longDescription: "Standaryzacja formatowania tekstów - usuwanie niechcianych znaków, poprawianie interpunkcji.",
        demoUrl: "https://purles.github.io/formatter"
      },
      {
        name: "IDS Content Editor",
        description: "Edytor HTML opisów",
        longDescription: "Edytor HTML zoptymalizowany pod opisy w IdoSell. Podgląd na żywo i walidacja.",
        demoUrl: "https://purles.github.io/IDS-content-editor"
      },
      {
        name: "Description Translator",
        description: "Tłumaczenie opisów FR/ENG",
        longDescription: "Wspomaganie tłumaczenia opisów produktowych. Zachowuje formatowanie i strukturę tekstu.",
        demoUrl: "https://purles.github.io/Purles-description-translator"
      },
      {
        name: "Wpisy Blogowe",
        description: "Kreator wpisów dla purles.pl",
        longDescription: "Tworzenie i formatowanie wpisów blogowych dla nowej strony Purlés.",
        demoUrl: "https://purles.github.io/wpisy-blogowe"
      },
      {
        name: "Wpisy Blogowe Sklep",
        description: "Edytor wpisów dla sklep.purles.pl",
        longDescription: "Dedykowany edytor treści blogowych dla sklepu internetowego.",
        demoUrl: "https://purles.github.io/wpisy-blogowe-sklep"
      }
    ]
  },
  {
    title: "Obrazy",
    projects: [
      {
        name: "Image Cropper",
        description: "Przycinanie zdjęć produktowych 2x",
        longDescription: "Przycinanie i kadrowanie zdjęć produktowych. Output jest 2x większy niż wymiary przycięcia - idealne do zdjęć wysokiej jakości w IdoSell.",
        demoUrl: "https://purles.github.io/image-cropper2x"
      }
    ]
  }
]

function ProjectCard({ project }: { project: Project }) {
  const { expandedCard, setExpandedCard } = useContext(ExpandedContext)
  const cardId = project.name
  const isExpanded = expandedCard === cardId

  const handleClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('a')) {
      setExpandedCard(isExpanded ? null : cardId)
    }
  }

  return (
    <div
      className={`card p-5 cursor-pointer ${isExpanded ? 'expanded' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-100 mb-1">
            {project.name}
          </h3>
          <p className="text-slate-400 text-sm">
            {project.description}
          </p>
        </div>

        <svg
          className={`w-5 h-5 text-slate-500 flex-shrink-0 chevron ${isExpanded ? 'rotated' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className={`expanded-content ${isExpanded ? 'open' : ''}`}>
        <p className="text-slate-400 text-sm">
          {project.longDescription}
        </p>
      </div>

      <div className="mt-4">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Otwórz
        </a>
      </div>
    </div>
  )
}

function CategorySection({ category }: { category: Category }) {
  const { expandedCard } = useContext(ExpandedContext)
  const sectionId = category.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')
  const hasExpanded = category.projects.some(p => p.name === expandedCard)

  return (
    <section id={sectionId} className="mb-16">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <div className="category-bar" />
        <span className="text-slate-100">{category.title}</span>
      </h2>

      <div className={`cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${hasExpanded ? 'has-expanded' : ''}`}>
        {category.projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}

function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="https://www.purles.pl" target="_blank" rel="noopener noreferrer">
          <img
            src="https://sklep.purles.pl/data/gfx/mask/pol/logo_1_big.svg"
            alt="Purlés"
            className="h-7 w-auto opacity-70 hover:opacity-100 transition-opacity"
          />
        </a>

        <div className="flex items-center gap-1">
          {/* Desktop links */}
          {categories.map((cat) => (
            <a
              key={cat.title}
              href={`#${cat.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
              className="nav-link text-sm hidden sm:block"
            >
              {cat.title}
            </a>
          ))}

          {/* Mobile menu */}
          <div className="relative sm:hidden">
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Menu
            </button>
            <div className={`mobile-dropdown ${menuOpen ? 'open' : ''}`}>
              {categories.map((cat) => (
                <a
                  key={cat.title}
                  href={`#${cat.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.title}
                </a>
              ))}
              <a href="#kontakt" onClick={() => setMenuOpen(false)}>
                Kontakt
              </a>
            </div>
          </div>

          <a href="#kontakt" className="nav-link text-sm hidden sm:block">
            Kontakt
          </a>
        </div>
      </div>
    </nav>
  )
}

function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('kontakt')
      if (!footer) return

      const footerRect = footer.getBoundingClientRect()
      const isFooterVisible = footerRect.top < window.innerHeight
      setIsVisible(!isFooterVisible)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToContact = () => {
    document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToContact}
      className={`float-cta ${!isVisible ? 'hidden' : ''}`}
    >
      <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <span>Masz pomysł?</span>
    </button>
  )
}

function Footer() {
  return (
    <footer id="kontakt" className="mt-20 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-2xl mx-auto text-center px-6">
        <h3 className="text-xl font-bold text-slate-100 mb-3">
          Masz pomysł na nowe narzędzie?
        </h3>

        <p className="text-slate-400 mb-6 text-sm">
          Szukasz automatyzacji dla powtarzalnych zadań? Masz pytania dotyczące AI?
          Zgłoś pomysł lub umów się na rozmowę.
        </p>

        <a
          href="#PLACEHOLDER_ASANA_FORM_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Zgłoś pomysł
        </a>

        <div className="mt-12 pt-6 border-t border-slate-800/50">
          <p className="text-slate-600 text-xs">
            Created by <span className="text-violet-400">Kornel Skąpski</span> for{' '}
            <a
              href="https://www.purles.pl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors"
            >
              Purlés
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
    <ExpandedContext.Provider value={{ expandedCard, setExpandedCard }}>
      <div className="bg-gradient min-h-screen">
        <Navigation />
        <FloatingCTA />

        <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">
          {/* Hero */}
          <header className="text-center mb-16">
            <h1 className="hero-title text-4xl md:text-5xl font-bold mb-4">
              Purlés Tools
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Biblioteka narzędzi automatyzacji i produktywności
            </p>
          </header>

          {/* Categories */}
          {categories.map((category) => (
            <CategorySection key={category.title} category={category} />
          ))}

          <Footer />
        </main>
      </div>
    </ExpandedContext.Provider>
  )
}
