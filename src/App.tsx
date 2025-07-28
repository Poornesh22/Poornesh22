import React, { useState, useEffect } from 'react';
import { Heart, Clock, Users, Globe, Star, ChevronLeft, ChevronRight, Phone, Mail, MapPin, Send, Menu, X } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  treatment: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

const SmartCareWebsite: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Outstanding care and professionalism. The doctors and staff made me feel comfortable throughout my treatment.",
      treatment: "Cardiac Surgery"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      comment: "World-class facilities and expert medical team. I'm grateful for the exceptional care I received.",
      treatment: "Orthopedic Treatment"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 5,
      comment: "The emergency department saved my life. Quick response and excellent medical expertise.",
      treatment: "Emergency Care"
    },
    {
      id: 4,
      name: "David Williams",
      rating: 5,
      comment: "International patient services were amazing. They handled everything smoothly from abroad.",
      treatment: "Neurology"
    }
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24x7 Emergency",
      description: "Round-the-clock emergency services with immediate response and expert care."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Doctors",
      description: "World-renowned specialists and experienced medical professionals at your service."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "International Patients",
      description: "Comprehensive support for international patients with multilingual staff."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Advanced Care",
      description: "State-of-the-art medical technology and innovative treatment approaches."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              SmartCare
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
            <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Services</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Testimonials</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="hidden md:block bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Book Appointment
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <nav className="px-6 py-4 space-y-4">
              <a 
                href="#home" 
                onClick={closeMobileMenu}
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Home
              </a>
              <a 
                href="#services" 
                onClick={closeMobileMenu}
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Services
              </a>
              <a 
                href="#testimonials" 
                onClick={closeMobileMenu}
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                onClick={closeMobileMenu}
                className="block text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Contact
              </a>
              <button 
                onClick={closeMobileMenu}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium mt-4"
              >
                Book Appointment
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Health,
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent block">
                  Our Priority
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience world-class healthcare with compassionate care, cutting-edge technology, 
                and expert medical professionals dedicated to your well-being.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold">
                <Heart className="w-5 h-5" />
                <span>Book Consultation</span>
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 font-semibold">
                Emergency: +1 (555) 911-CARE
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-white rounded-2xl p-6 shadow-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">24/7</div>
                    <div className="text-sm text-gray-600">Emergency Care</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-500">500+</div>
                    <div className="text-sm text-gray-600">Expert Doctors</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">50k+</div>
                    <div className="text-sm text-gray-600">Happy Patients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-500">15+</div>
                    <div className="text-sm text-gray-600">Specializations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SmartCare?</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine advanced medical technology with compassionate care to provide 
              exceptional healthcare services for you and your family.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-100 hover:to-cyan-100"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-xl mb-6 w-fit group-hover:shadow-lg transition-shadow">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h3>
            <p className="text-xl text-gray-600">Real stories from people who trust us with their health</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonials[currentTestimonial].comment}"
                </blockquote>
                <div className="space-y-2">
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-blue-600 font-medium">
                    {testimonials[currentTestimonial].treatment}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
            >
              <ChevronLeft className="w-6 h-6 text-blue-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all duration-300 hover:bg-blue-50"
            >
              <ChevronRight className="w-6 h-6 text-blue-600" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h3>
            <p className="text-xl text-gray-600">Ready to start your healthcare journey? Contact us today.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h4>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Emergency: +1 (555) 911-CARE</p>
                      <p className="text-gray-600">General: +1 (555) 123-SMART</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">info@smartcare.com</p>
                      <p className="text-gray-600">appointments@smartcare.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">123 Healthcare Avenue</p>
                      <p className="text-gray-600">Medical District, MD 12345</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h4>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="bg-green-100 text-green-800 p-6 rounded-xl">
                    <div className="text-2xl mb-2">✓</div>
                    <p className="font-semibold">Thank you for your message!</p>
                    <p className="text-sm mt-2">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold">SmartCare</h1>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Providing exceptional healthcare services with compassion, innovation, 
                and dedication to improving lives in our community.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Emergency</h5>
              <p className="text-red-400 font-bold text-lg">+1 (555) 911-CARE</p>
              <p className="text-gray-400 text-sm mt-2">Available 24/7</p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 SmartCare Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartCareWebsite;