import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MapPin, Calendar, DollarSign, Users, Play, Pause, Volume2, VolumeX, Sun, Moon, ChevronRight, ChevronDown, Globe, Camera, Heart, Navigation } from 'lucide-react';

const ExploreAssam = () => {
  const [isDark, setIsDark] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [videoPlaying, setVideoPlaying] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [tripPlan, setTripPlan] = useState(null);
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const videoRef = useRef(null);

  const destinations = [
    {
      id: 1,
      name: "Kaziranga",
      tagline: "Where the last unicorns roam",
      story: "Kaziranga isn't just a national park. It's the last stronghold of one-horned rhinos, where morning mists carry the whispers of prehistoric giants.",
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80",
      highlights: ["One-horned Rhinos", "Elephant Safari", "Wild Tigers", "Bird Paradise"]
    },
    {
      id: 2,
      name: "Majuli",
      tagline: "An island where culture breathes",
      story: "Majuli isn't just the world's largest river island. It's where silence speaks culture, where monks dance in prayer, and where time moves differently.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      highlights: ["Satras", "Mask Making", "Pottery", "River Life"]
    },
    {
      id: 3,
      name: "Haflong",
      tagline: "The Scotland of the East",
      story: "Mountains that touch clouds, valleys that hold secrets, and a silence so profound it becomes music. Haflong is poetry written in mist.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      highlights: ["Hill Station", "Tribal Culture", "Trekking", "Lakes"]
    },
    {
      id: 4,
      name: "Sivasagar",
      tagline: "Where empires left their heartbeat",
      story: "The Ahom dynasty ruled for 600 years from these grounds. Every stone here has witnessed history, every temple echoes with ancient prayers.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      highlights: ["Ahom Monuments", "Temples", "Heritage", "Architecture"]
    },
    {
      id: 5,
      name: "Manas",
      tagline: "Where wilderness meets wonder",
      story: "A UNESCO World Heritage site where tigers hunt, elephants roam, and nature conducts its ancient symphony without interruption.",
      image: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=800&q=80",
      highlights: ["Wildlife", "Rafting", "Tigers", "Pristine Nature"]
    },
    {
      id: 6,
      name: "Guwahati",
      tagline: "The gateway to the Northeast",
      story: "Where the Brahmaputra flows like liquid silver, where temples crown hills, and where tradition dances with modernity in perfect rhythm.",
      image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&q=80",
      highlights: ["Kamakhya Temple", "River Cruises", "Gateway", "Urban Culture"]
    }
  ];

  const foods = [
    { name: "Khar", story: "An alkaline dish that cleanses both body and soul", color: "from-amber-600 to-yellow-700" },
    { name: "Masor Tenga", story: "Sour fish curry that tells tales of the Brahmaputra", color: "from-orange-600 to-red-700" },
    { name: "Pitha", story: "Rice cakes that carry the warmth of Assamese homes", color: "from-green-600 to-teal-700" },
    { name: "Duck Curry", story: "A tribal delicacy passed down through generations", color: "from-purple-600 to-pink-700" }
  ];

  const tribes = [
    { name: "Bodo", culture: "Masters of silk weaving and vibrant festivals" },
    { name: "Mising", culture: "River children who build homes on stilts" },
    { name: "Karbi", culture: "Hill dwellers with rich musical traditions" },
    { name: "Rabha", culture: "Guardians of ancient dance forms" }
  ];

  const heritage = [
    { year: "1228 AD", event: "Ahom Dynasty Begins", detail: "600 years of unbroken rule starts" },
    { year: "15th Century", event: "Satra Culture", detail: "Vaishnavite monasteries flourish" },
    { year: "Medieval Era", event: "Silk & Weaving", detail: "Muga silk becomes legendary" },
    { year: "Today", event: "Bihu Festival", detail: "Spring celebrations unite all" }
  ];

  const generateTripPlan = (budget, days, type) => {
    const plans = {
      nature: {
        places: ["Kaziranga", "Manas", "Haflong"],
        activities: ["Safari", "Trekking", "Bird Watching"],
        budget: budget * 0.7
      },
      culture: {
        places: ["Majuli", "Sivasagar", "Guwahati"],
        activities: ["Temple Visits", "Satra Tour", "Heritage Walk"],
        budget: budget * 0.6
      },
      adventure: {
        places: ["Haflong", "Manas", "Kaziranga"],
        activities: ["River Rafting", "Trekking", "Wildlife Safari"],
        budget: budget * 0.75
      }
    };

    const selectedPlan = plans[type];
    const dayPlan = [];
    
    for (let i = 0; i < days; i++) {
      dayPlan.push({
        day: i + 1,
        place: selectedPlan.places[i % selectedPlan.places.length],
        activity: selectedPlan.activities[i % selectedPlan.activities.length],
        cost: Math.round(selectedPlan.budget / days)
      });
    }

    setTripPlan({ days: dayPlan, totalBudget: budget, type });
  };

  const speakNarration = () => {
    if ('speechSynthesis' in window) {
      const text = "Welcome to Assam, a land where nature whispers ancient secrets. From the misty tea gardens of the Brahmaputra valley to the wild beauty of Kaziranga, this is a place that touches your soul.";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
      setAudioPlaying(true);
      utterance.onend = () => setAudioPlaying(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'map', 'destinations', 'heritage', 'food', 'tribes'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} transition-colors duration-500`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-lg border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Globe className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Explore Assam
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#destinations" className="hover:text-green-600 transition-colors">Destinations</a>
              <a href="#heritage" className="hover:text-green-600 transition-colors">Heritage</a>
              <a href="#food" className="hover:text-green-600 transition-colors">Food</a>
              <a href="#tribes" className="hover:text-green-600 transition-colors">Tribes</a>
              <button
                onClick={() => setShowTripPlanner(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Plan Trip
              </button>
              <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <button onClick={() => setShowMenu(!showMenu)} className="md:hidden p-2">
              {showMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {showMenu && (
        <div className={`fixed inset-0 z-40 ${isDark ? 'bg-gray-900' : 'bg-white'} pt-16`}>
          <div className="flex flex-col items-center space-y-6 p-8">
            <a href="#destinations" onClick={() => setShowMenu(false)} className="text-2xl hover:text-green-600">Destinations</a>
            <a href="#heritage" onClick={() => setShowMenu(false)} className="text-2xl hover:text-green-600">Heritage</a>
            <a href="#food" onClick={() => setShowMenu(false)} className="text-2xl hover:text-green-600">Food</a>
            <a href="#tribes" onClick={() => setShowMenu(false)} className="text-2xl hover:text-green-600">Tribes</a>
            <button onClick={() => { setShowTripPlanner(true); setShowMenu(false); }} className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full text-lg">
              Plan Trip
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/80 z-10" />
        <div className="absolute inset-0 bg-black">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Assam Landscape"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="relative z-20 text-center px-4 space-y-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 animate-slide-up">
            Assam is not a place.
          </h1>
          <h2 className="text-4xl md:text-6xl font-serif italic bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-slide-up animation-delay-200">
            It's a feeling.
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
            <a href="#destinations" className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:shadow-2xl transform hover:scale-105 transition-all flex items-center space-x-2">
              <span>Explore Destinations</span>
              <ChevronRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => setShowTripPlanner(true)}
              className="px-8 py-4 border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Plan My Trip</span>
            </button>
          </div>

          <button
            onClick={speakNarration}
            className="mt-8 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all flex items-center space-x-2 mx-auto"
          >
            {audioPlaying ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            <span>Voice Guide</span>
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Interactive Map Section */}
      <section id="map" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Discover Assam</h2>
          
          <div className="relative max-w-4xl mx-auto mb-12">
            <svg viewBox="0 0 800 400" className="w-full h-auto">
              {/* Assam outline */}
              <path
                d="M 150 200 L 200 150 L 300 140 L 400 160 L 500 150 L 600 170 L 650 200 L 640 250 L 580 280 L 500 290 L 400 280 L 300 270 L 200 250 Z"
                fill={isDark ? '#1f2937' : '#f3f4f6'}
                stroke={isDark ? '#4ade80' : '#16a34a'}
                strokeWidth="2"
                className="transition-all"
              />
              
              {/* Kaziranga */}
              <g onClick={() => setSelectedDestination(destinations[0])} className="cursor-pointer">
                <circle cx="450" cy="200" r="30" fill="#10b981" opacity="0.7" className="hover:opacity-100 transition-all">
                  <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="450" y="205" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Kaziranga
                </text>
              </g>
              
              {/* Majuli */}
              <g onClick={() => setSelectedDestination(destinations[1])} className="cursor-pointer">
                <circle cx="550" cy="190" r="30" fill="#3b82f6" opacity="0.7" className="hover:opacity-100 transition-all">
                  <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" begin="0.3s" />
                </circle>
                <text x="550" y="195" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Majuli
                </text>
              </g>
              
              {/* Haflong */}
              <g onClick={() => setSelectedDestination(destinations[2])} className="cursor-pointer">
                <circle cx="280" cy="260" r="30" fill="#8b5cf6" opacity="0.7" className="hover:opacity-100 transition-all">
                  <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" begin="0.6s" />
                </circle>
                <text x="280" y="265" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Haflong
                </text>
              </g>
              
              {/* Sivasagar */}
              <g onClick={() => setSelectedDestination(destinations[3])} className="cursor-pointer">
                <circle cx="600" cy="220" r="30" fill="#f59e0b" opacity="0.7" className="hover:opacity-100 transition-all">
                  <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" begin="0.9s" />
                </circle>
                <text x="600" y="225" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Sivasagar
                </text>
              </g>
              
              {/* Manas */}
              <g onClick={() => setSelectedDestination(destinations[4])} className="cursor-pointer">
                <circle cx="220" cy="180" r="30" fill="#ef4444" opacity="0.7" className="hover:opacity-100 transition-all">
                  <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" begin="1.2s" />
                </circle>
                <text x="220" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Manas
                </text>
              </g>
              
              {/* Guwahati */}
              <g onClick={() => setSelectedDestination(destinations[5])} className="cursor-pointer">
                <circle cx="320" cy="210" r="30" fill="#ec4899" opacity="0.7" className="hover:opacity-100 transition-all">
                  <animate attributeName="r" values="30;35;30" dur="2s" repeatCount="indefinite" begin="1.5s" />
                </circle>
                <text x="320" y="215" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                  Guwahati
                </text>
              </g>
              
              {/* Brahmaputra River */}
              <path
                d="M 200 180 Q 350 190 500 185 Q 600 180 640 200"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="4"
                opacity="0.5"
                strokeDasharray="5,5"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
              </path>
            </svg>
            
            <div className="text-center mt-4">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center justify-center space-x-2`}>
                <Navigation className="w-4 h-4" />
                <span>Click on any location to explore</span>
              </p>
            </div>
          </div>

          {/* Selected Destination Details */}
          {selectedDestination && (
            <div className={`max-w-4xl mx-auto p-8 rounded-3xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} transform transition-all`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-bold mb-2">{selectedDestination.name}</h3>
                  <p className="text-green-600 italic">{selectedDestination.tagline}</p>
                </div>
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="p-2 rounded-full hover:bg-gray-600 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-full h-64 object-cover rounded-2xl"
                />
                <div>
                  <p className="text-lg leading-relaxed mb-4">{selectedDestination.story}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold mb-3">Highlights:</h4>
                    {selectedDestination.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-green-600" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => {
                    setShowTripPlanner(true);
                    setSelectedDestination(null);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Plan Visit
                </button>
                <a
                  href={`#destinations`}
                  onClick={() => setSelectedDestination(null)}
                  className="px-6 py-3 border-2 border-green-600 rounded-full hover:bg-green-600 transition-all"
                >
                  View All Destinations
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Destinations Cards */}
      <section id="destinations" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Sacred Landscapes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, idx) => (
              <div
                key={dest.id}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                    <p className="text-sm text-green-400 italic">{dest.tagline}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed mb-4">{dest.story}</p>
                  <div className="flex flex-wrap gap-2">
                    {dest.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-green-600/20 text-green-600 border border-green-600/30"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage Timeline */}
      <section id="heritage" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'} overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Echoes of Time</h2>
          <div className="relative">
            <div className="flex overflow-x-auto pb-8 space-x-8 scrollbar-hide">
              {heritage.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-80 p-6 rounded-2xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} transform hover:scale-105 transition-all`}
                >
                  <div className="text-3xl font-bold text-green-600 mb-2">{item.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{item.event}</h3>
                  <p className="text-sm opacity-70">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section id="food" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Taste of Tradition</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {foods.map((food, idx) => (
              <div
                key={idx}
                className={`group relative h-64 rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${food.color} opacity-80 group-hover:opacity-90 transition-opacity`} />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{food.name}</h3>
                  <p className="text-sm opacity-90">{food.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tribes Section */}
      <section id="tribes" className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">Guardians of Culture</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tribes.map((tribe, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transform hover:scale-105 transition-all cursor-pointer`}
              >
                <Users className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{tribe.name}</h3>
                <p className="text-sm opacity-70">{tribe.culture}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip Planner Modal */}
      {showTripPlanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className={`relative max-w-2xl w-full rounded-3xl ${isDark ? 'bg-gray-800' : 'bg-white'} p-8 max-h-[90vh] overflow-y-auto`}>
            <button
              onClick={() => setShowTripPlanner(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-3xl font-serif mb-6">Smart Trip Planner</h2>
            
            {!tripPlan ? (
              <div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget (₹)</label>
                    <input
                      type="number"
                      id="budget"
                      className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-600`}
                      placeholder="50000"
                      defaultValue="50000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Number of Days</label>
                    <input
                      type="number"
                      id="days"
                      min="1"
                      max="14"
                      className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-600`}
                      placeholder="5"
                      defaultValue="5"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Travel Type</label>
                    <select
                      id="type"
                      className={`w-full px-4 py-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-green-600`}
                    >
                      <option value="nature">Nature & Wildlife</option>
                      <option value="culture">Culture & Heritage</option>
                      <option value="adventure">Adventure</option>
                    </select>
                  </div>

                  <button
                    onClick={() => {
                      const budget = parseInt(document.getElementById('budget').value);
                      const days = parseInt(document.getElementById('days').value);
                      const type = document.getElementById('type').value;
                      generateTripPlan(budget, days, type);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Generate My Plan
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="text-xl font-semibold mb-4">Your Personalized Itinerary</h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm">Total Budget: ₹{tripPlan.totalBudget}</span>
                    <span className="text-sm capitalize">{tripPlan.type} Trip</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {tripPlan.days.map((day) => (
                    <div key={day.day} className={`p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold">Day {day.day}</h4>
                        <span className="text-sm text-green-600">₹{day.cost}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm mb-2">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <span>{day.place}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Camera className="w-4 h-4 text-blue-600" />
                        <span>{day.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setTripPlan(null)}
                  className="w-full py-3 border-2 border-green-600 rounded-xl hover:bg-green-600 transition-all"
                >
                  Plan Another Trip
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`py-16 ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-3xl md:text-4xl font-serif italic mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            "You don't visit Assam. Assam visits you."
          </p>
          <div className="flex justify-center items-center space-x-6 text-sm opacity-70">
            <span>Built with ❤️ for Assam</span>
            <span>•</span>
            <span>Experience the Magic</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ExploreAssam;
