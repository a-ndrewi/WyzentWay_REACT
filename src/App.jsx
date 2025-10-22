import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Users, Eye, Calendar, Gift, Trophy, Check, ShoppingCart, Shield, ChevronLeft, ChevronRight, ArrowUp, MessageCircle, Instagram, CheckCircle } from 'lucide-react';

// Custom Hook for Intersection Observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// Custom Hook for Counter Animation
const useCounterAnimation = (target, duration = 2000, isVisible) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target, duration]); // Added all dependencies

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M+';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'K+';
    return num.toString();
  };

  return formatNumber(count);
};

// Navigation Component
const Navigation = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '#home', label: 'Home' },
    { href: '#stats', label: 'Our Impact' },
    { href: '#starter', label: 'Free Starter Pack' },
    { href: '#ebook', label: "Athlete's Ebook Pack" },
    { href: '#reels', label: 'Featured Content' },
    { href: '#growth', label: 'Growth Plans' },
    { href: '#testimonials', label: 'People Thoughts' }
  ];

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    setIsSidebarOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: scrolled ? 'rgba(10, 10, 15, 0.98)' : 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 0',
        zIndex: 1000,
        borderBottom: '1px solid rgba(0, 240, 255, 0.1)',
        boxShadow: scrolled ? '0 5px 20px rgba(0, 240, 255, 0.1)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <img
    src="/logo.jpeg"
    alt="Wyzent Logo"
    style={{
      width: '50px',
      height: '50px',
      objectFit: 'contain',
      borderRadius: '8px'
    }}
  />
  <span
    style={{
      fontSize: '1.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    }}
  >
    Wyzent™
  </span>
</div>

          <button onClick={() => setIsSidebarOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '5px' }}>
            <Menu size={28} color="#00f0ff" />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isSidebarOpen ? 0 : '-300px',
        width: '300px',
        height: '100vh',
        background: 'rgba(10, 10, 15, 0.98)',
        backdropFilter: 'blur(20px)',
        zIndex: 1002,
        padding: '80px 40px',
        transition: 'right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        borderLeft: '1px solid rgba(0, 240, 255, 0.2)'
      }}>
        <button onClick={() => setIsSidebarOpen(false)} style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          fontSize: '2rem',
          background: 'transparent',
          border: 'none',
          color: '#00f0ff',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          <X size={32} />
        </button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {menuItems.map((item) => (
            <li key={item.href} style={{ margin: '30px 0' }}>
              <a href={item.href} onClick={(e) => handleMenuClick(e, item.href)} className="sidebar-link" style={{
                textDecoration: 'none',
                color: '#ffffff',
                fontSize: '1.2rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                display: 'block',
                padding: '10px 0',
                position: 'relative'
              }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 999
        }} />
      )}
    </>
  );
};

// Hero Component
const Hero = () => {
  const particles = Array.from({ length: 30 });

  return (
    <section id="home" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px 50px',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(112, 0, 255, 0.1) 0%, transparent 50%)'
      }} />
      
      {/* Particles */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 1 }}>
        {particles.map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: Math.random() > 0.5 ? '#00f0ff' : '#7000ff',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.3,
            animation: `float ${Math.random() * 10 + 5}s linear infinite`
          }} />
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 800,
          marginBottom: '20px',
          animation: 'glitch 3s infinite'
        }}>
          Transform Your Mindset
        </h1>
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.3rem)',
          color: '#b0b0b0',
          marginBottom: '40px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Unlock your potential with daily motivation and self-growth strategies
        </p>
        <a href="#starter" style={{
          display: 'inline-block',
          padding: '15px 40px',
          background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
          color: '#ffffff',
          textDecoration: 'none',
          borderRadius: '50px',
          fontWeight: 600,
          fontSize: '1.1rem',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)'
        }}>
          Start Free Today
        </a>
      </div>

      <style>{`
        @keyframes glitch {
          0%, 90%, 100% { text-shadow: 0 0 20px #00f0ff; }
          91% { text-shadow: 3px 3px #00f0ff, -3px -3px #ff00ff; }
          93% { text-shadow: -3px 3px #ff00ff, 3px -3px #00f0ff; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, -10px) rotate(90deg); }
          50% { transform: translate(-10px, -20px) rotate(180deg); }
          75% { transform: translate(-10px, -10px) rotate(270deg); }
        }
      `}</style>
    </section>
  );
};

// Statistics Component
const Statistics = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.5 });
  const followers = useCounterAnimation(54000, 2000, isVisible);
  const views = useCounterAnimation(10200000, 2000, isVisible);

  const stats = [
    { icon: Users, value: followers, label: 'Followers', useCounter: true },
    { icon: Eye, value: views, label: 'Total Views', useCounter: true },
    { icon: Calendar, value: '2024', label: 'Established', useCounter: false }
  ];

  return (
    <section id="stats" ref={ref} style={{ padding: '100px 20px', background: '#050508' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '60px',
          background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Our Impact
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{
              background: 'rgba(15, 15, 25, 0.8)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}>
              <stat.icon size={48} color="#00f0ff" style={{ marginBottom: '20px' }} />
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#ffffff', marginBottom: '10px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1.1rem', color: '#b0b0b0' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Starter Pack Component
const StarterPack = () => {
  const features = [
    '3-Day Mindset Transformation Guide',
    'Daily Motivation Exercises',
    'Core Principles of Mental Strength',
    'Quick Win Strategies',
    'Foundation Building Techniques'
  ];

  return (
    <section id="starter" style={{ padding: '100px 20px', background: '#0a0a0f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Free Starter Pack
        </h2>
        <p style={{ textAlign: 'center', color: '#b0b0b0', fontSize: '1.2rem', marginBottom: '50px' }}>
          Begin your transformation journey with our complimentary 3-day mindset program
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              background: 'rgba(15, 15, 25, 0.8)',
              border: '2px solid #00ff88',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0, 255, 136, 0.3)'
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, #00ff88 0%, #00f0ff 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Gift size={80} color="white" />
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 15, 25, 0.8)',
            border: '1px solid rgba(0, 255, 136, 0.2)',
            borderRadius: '20px',
            padding: '40px'
          }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'linear-gradient(135deg, #00ff88 0%, #00f0ff 100%)',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '20px',
              color: '#0a0a0f'
            }}>
              100% FREE
            </span>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '15px', color: '#ffffff' }}>
              Wyzent Starter Journey
            </h3>
            <p style={{ color: '#b0b0b0', marginBottom: '25px', lineHeight: 1.8 }}>
              Experience the Wyzent way with our carefully crafted 3-day starter program.
              Get a taste of transformative mindset strategies and discover how we help you
              build unshakeable confidence and mental clarity.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              {features.map((feature, index) => (
                <li key={index} style={{ padding: '12px 0', color: '#b0b0b0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={20} color="#00ff88" />
                  {feature}
                </li>
              ))}
            </ul>

            <div style={{ fontSize: '1.3rem', color: '#00ff88', fontWeight: 700, marginBottom: '30px' }}>
              No Credit Card Required
            </div>

            <a href="https://wyzentway.gumroad.com/l/wyzent-starter?layout=profile" target="_blank" rel="noopener noreferrer" style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #00ff88 0%, #00f0ff 100%)',
              color: '#0a0a0f',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              textDecoration: 'none'
            }}>
              <Gift size={24} />
              Get Free Access Now
            </a>

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#b0b0b0', fontSize: '0.9rem' }}>
              <CheckCircle size={16} color="#00ff88" style={{ display: 'inline', marginRight: '5px' }} />
              Start your journey risk-free and see if Wyzent is right for you
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Ebook Shop Component
const EbookShop = () => {
  const features = [
    'Mental Toughness Training Guide',
    'Peak Performance Strategies',
    'Daily Motivation Rituals',
    'Goal Setting Mastery',
    'Overcoming Athletic Plateaus'
  ];

  return (
    <section id="ebook" style={{ padding: '100px 20px', background: '#050508' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Athlete's Motivation Pack
        </h2>
        <p style={{ textAlign: 'center', color: '#b0b0b0', fontSize: '1.2rem', marginBottom: '50px' }}>
          Transform your athletic performance with proven mindset strategies
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '400px',
              background: 'rgba(15, 15, 25, 0.8)',
              border: '2px solid #00f0ff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 20px 60px rgba(0, 240, 255, 0.3)'
            }}>
              <div style={{
                width: '100%',
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, #7000ff 0%, #ff00ff 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Trophy size={80} color="white" />
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(15, 15, 25, 0.8)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '20px',
            padding: '40px'
          }}>
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
              borderRadius: '20px',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '20px'
            }}>
              LIMITED OFFER
            </span>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '15px', color: '#ffffff' }}>
              Champion Mindset Pack
            </h3>
            <p style={{ color: '#b0b0b0', marginBottom: '25px', lineHeight: 1.8 }}>
              A comprehensive collection of 5 powerful ebooks designed specifically for athletes
              who want to unlock their full potential through mental strength and motivation.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '30px' }}>
              {features.map((feature, index) => (
                <li key={index} style={{ padding: '12px 0', color: '#b0b0b0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CheckCircle size={20} color="#00ff88" />
                  {feature}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.5rem', color: '#b0b0b0', textDecoration: 'line-through' }}>$50</span>
              <span style={{
                fontSize: '3rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                $14.99
              </span>
              <span style={{
                padding: '5px 12px',
                background: '#00ff88',
                color: '#0a0a0f',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700
              }}>
                70% OFF
              </span>
            </div>

            <a href="https://wyzentway.gumroad.com/l/mindmastery?_gl=1*1hlotly*_ga*MTA0NjI1MjUzMC4xNzYwMzc3MzU1*_ga_6LJN6D94N6*czE3NjAzODIwNTkkbzIkZzEkdDE3NjAzODQwODQkajI4JGwwJGgw" target="_blank" rel="noopener noreferrer" style={{
              width: '100%',
              padding: '18px',
              background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(0, 240, 255, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              textDecoration: 'none'
            }}>
              <ShoppingCart size={24} />
              Get Instant Access
            </a>

            <p style={{ textAlign: 'center', marginTop: '20px', color: '#b0b0b0', fontSize: '0.9rem' }}>
              <Shield size={16} color="#00ff88" style={{ display: 'inline', marginRight: '5px' }} />
              30-Day Money Back Guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Reels Carousel Component
const ReelsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const reels = [
    { url: 'https://www.instagram.com/p/DMAxJC9qys_/embed', title: 'Self-Worth Mastery', description: 'Discover your true value' },
    { url: 'https://www.instagram.com/p/DL5e0BJqpIv/embed', title: 'Morning Motivation', description: 'Start your day right' },
    { url: 'https://www.instagram.com/p/DLiTlcCqHxA/embed', title: 'Mindset Shift', description: 'Change your perspective' },
    { url: 'https://www.instagram.com/reel/DPZME_CjNcE/embed', title: 'Breakthrough Moments', description: 'Push past your limits' },
    { url: 'https://www.instagram.com/reel/DO1cxNvDXfz/embed', title: 'Daily Habits', description: 'Build your success routine' }
  ];

  const maxIndex = Math.max(0, reels.length - 1);

  const updateCarousel = () => {
    if (carouselRef.current) {
      const cardWidth = 320;
      const gap = 30;
      const offset = currentIndex * (cardWidth + gap);
      carouselRef.current.style.transform = `translateX(-${offset}px)`;
    }
  };

  useEffect(() => {
    updateCarousel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex(currentIndex + 1);
  };

  return (
    <section id="reels" style={{ padding: '100px 20px', background: '#0a0a0f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Featured Content
        </h2>
        <p style={{ textAlign: 'center', color: '#b0b0b0', fontSize: '1.2rem', marginBottom: '50px' }}>
          Explore our most impactful motivational reels
        </p>

        <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto', padding: '0 10px' }}>
          <button onClick={handlePrev} disabled={currentIndex === 0} style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            background: 'rgba(0, 240, 255, 0.2)',
            border: '1px solid #00f0ff',
            color: '#00f0ff',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: currentIndex === 0 ? 0.3 : 1
          }}>
            <ChevronLeft size={24} />
          </button>

          <div style={{ overflow: 'hidden', padding: '20px 0', margin: '0 60px' }}>
            <div ref={carouselRef} style={{
              display: 'flex',
              gap: '30px',
              transition: 'transform 0.5s ease',
              padding: '0 5px'
            }}>
              {reels.map((reel, index) => (
                <div key={index} style={{
                  minWidth: '320px',
                  maxWidth: '320px',
                  flexShrink: 0,
                  background: 'rgba(15, 15, 25, 0.8)',
                  border: '1px solid rgba(0, 240, 255, 0.2)',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}>
                  <div style={{ width: '100%', height: '500px', background: '#050508', position: 'relative', overflow: 'hidden' }}>
                    <iframe src={reel.url} frameBorder="0" allowFullScreen style={{ width: '100%', height: '100%', border: 'none' }} />
                  </div>
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#ffffff' }}>{reel.title}</h3>
                    <p style={{ color: '#b0b0b0' }}>{reel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleNext} disabled={currentIndex >= maxIndex} style={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            background: 'rgba(0, 240, 255, 0.2)',
            border: '1px solid #00f0ff',
            color: '#00f0ff',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: currentIndex >= maxIndex ? 0.3 : 1
          }}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

// Growth Plans Component
const GrowthPlans = () => {
  const benefits = [
    'Build unshakeable confidence',
    'Develop powerful daily habits',
    'Master your mindset',
    'Achieve your goals faster'
  ];

  return (
    <section id="growth" style={{ padding: '100px 20px', background: '#050508' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Personal Growth Plans
        </h2>
        <p style={{ textAlign: 'center', color: '#b0b0b0', fontSize: '1.2rem', marginBottom: '50px' }}>
          Take your self-development to the next level
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '20px', color: '#ffffff' }}>
              Customized Self-Growth Journey
            </h3>
            <p style={{ color: '#b0b0b0', marginBottom: '20px', fontSize: '1.1rem' }}>
              Our personalized growth plans are designed to help you:
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {benefits.map((benefit, index) => (
                <li key={index} style={{
                  padding: '15px 0',
                  color: '#b0b0b0',
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <Check size={20} color="#00f0ff" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'rgba(15, 15, 25, 0.8)',
            border: '1px solid rgba(0, 240, 255, 0.2)',
            borderRadius: '20px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <h4 style={{ fontSize: '1.8rem', marginBottom: '15px', color: '#ffffff' }}>
              Ready to Transform?
            </h4>
            <p style={{ color: '#b0b0b0', marginBottom: '30px' }}>
              Connect with us on WhatsApp to discuss your personalized growth plan
            </p>
            <a href="https://wa.me/40767435199?text=Hi%20Wyzent!%20I'm%20interested%20in%20your%20growth%20plans" target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '15px 35px',
              background: '#25D366',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: 600,
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}>
              <MessageCircle size={24} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  return (
    <section id="testimonials" style={{ padding: '100px 20px', background: '#0a0a0f' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          People Thoughts
        </h2>
        <p style={{ color: '#b0b0b0', fontSize: '1.2rem', marginBottom: '50px' }}>
          We create things from passion, so that people can enjoy every drop of our culture
        </p>

        <div style={{
          maxWidth: '500px',
          background: 'rgba(15, 15, 25, 0.8)',
          margin: 'auto',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '15px', lineHeight: 1.5, color: '#ffffff' }}>
              "Great content in this book, really inspired me to take life seriously and to change the way I view things because all the success starts from the mind! 10/10"
            </p>
          </div>
          <div style={{ fontWeight: 600, color: '#b0b0b0' }}>
            <p>
              David (Certified Buyer <CheckCircle size={16} color="#4CAF50" style={{ display: 'inline', marginLeft: '5px'}} />)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer style={{
      background: '#0a0a0f',
      borderTop: '1px solid rgba(0, 240, 255, 0.1)',
      padding: '30px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="https://www.instagram.com/wyzentway/" target="_blank" rel="noopener noreferrer" style={{
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}>
            <Instagram size={24} color="white" />
          </a>
        </div>
        <div style={{ color: '#b0b0b0' }}>
          <p>&copy; 2025 Wyzent™. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Scroll to Top Button Component
const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button onClick={scrollToTop} style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #00f0ff 0%, #7000ff 100%)',
      border: 'none',
      borderRadius: '50%',
      color: 'white',
      cursor: 'pointer',
      opacity: visible ? 1 : 0,
      visibility: visible ? 'visible' : 'hidden',
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
      zIndex: 999999, // ← boost it above mobile headers
      boxShadow: '0 5px 20px rgba(0, 240, 255, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      WebkitTapHighlightColor: 'transparent', // prevents blue highlight on tap
    }}
  >
      <ArrowUp size={24} />
    </button>
  );
};

// Main App Component
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: '#0a0a0f',
        color: '#ffffff',
        overflowX: 'hidden',
        lineHeight: 1.6,
        margin: 0,
        padding: 0
      }}>
        <title>Wyzent™ - Elevate Your Mindset</title>
        <Navigation isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <Hero />
        <Statistics />
        <StarterPack />
        <EbookShop />
        <ReelsCarousel />
        <GrowthPlans />
        <Testimonials />
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
}