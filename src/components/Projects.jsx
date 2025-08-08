import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Github, Star, Users, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const allProjects = [
    {
      title: 'Duocortex - Medical Study App',
      description: 'Ultimate app designed by medicos, for medicos. Features real-time peer matching, verified medical network, competitive quizzes, and study buddy system for medical students.',
      image: '🏥',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Firebase', 'Real-time APIs'],
      features: ['Real-Time Peer Matching', 'Verified Medical Network', 'Competitive Quizzes', 'Study Buddy System'],
      metrics: { users: 'Live', rating: '4.8', downloads: 'Play Store' },
      link: 'https://play.google.com/store/apps/details?id=com.duocortex',
      category: 'Healthcare'
    },
    {
      title: 'Experts4u - Beauty Services',
      description: 'Beauty parlour services at home for Gurugram Women. Seamless online booking experience with service selection to payment management for convenient beauty treatments.',
      image: '💄',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-500/20 to-rose-500/20',
      technologies: ['React Native', 'MERN Stack', 'CS-Cart', 'Payment Gateway', 'Booking System'],
      features: ['Home Services', 'Online Booking', 'Payment Integration', 'Service Management'],
      metrics: { users: 'Live', rating: '4.5', downloads: 'Play Store' },
      link: 'https://play.google.com/store/apps/details?id=com.expert4u',
      category: 'Services'
    },
    {
      title: 'Aurom Partner - Listener App',
      description: 'Professional listener application for trained counselors. 24x7 anonymous support platform for providing stress relief and mental wellness services with complete privacy.',
      image: '🧠',
      gradient: 'from-purple-500 to-indigo-500',
      bgGradient: 'from-purple-500/20 to-indigo-500/20',
      technologies: ['React Native', 'WebRTC', 'Node.js', 'Socket.io', 'Call Integration', 'Privacy Features'],
      features: ['24x7 Support', 'Anonymous Calling', 'Trained Listeners', 'Privacy Protection'],
      metrics: { users: 'Live', rating: '4.7', downloads: 'Play Store' },
      link: 'https://play.google.com/store/apps/details?id=com.aurom.listener',
      category: 'Mental Health'
    },
    {
      title: 'Aurom - Mental Wellness',
      description: 'Main Aurom app for users seeking mental health support. Connect with professional listeners for stress relief and emotional support in a safe environment.',
      image: '💚',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-500/20 to-teal-500/20',
      technologies: ['React Native', 'WebRTC', 'MERN Stack', 'Real-time Communication', 'User Management'],
      features: ['User Interface', 'Listener Matching', 'Call Features', 'Support System'],
      metrics: { users: 'Live', rating: '4.6', downloads: 'Play Store' },
      link: 'https://play.google.com/store/apps/details?id=com.myhearspace',
      category: 'Mental Health'
    },
    {
      title: 'Pandsecure Health',
      description: 'Pandemic preparedness application for epidemic readiness assessment. Provides essential resources and personalized guidance for health threats and emergency preparedness.',
      image: '🏥',
      gradient: 'from-green-500 to-lime-500',
      bgGradient: 'from-green-500/20 to-lime-500/20',
      technologies: ['React Native', 'MERN Stack', 'Health APIs', 'Assessment Tools', 'Data Analytics'],
      features: ['Health Assessment', 'Preparedness Tools', 'Resource Access', 'Personal Guidance'],
      metrics: { users: 'Live', rating: '4.6', downloads: 'App Store' },
      link: 'https://apps.apple.com/in/app/pandsecure-health/id6746241303',
      category: 'Healthcare'
    },
    {
      title: 'Eduactory - Online Learning',
      description: 'Comprehensive online platform for institutes to conduct tuition and coaching classes. Features live classes, test series, and comprehensive student management system.',
      image: '🎓',
      gradient: 'from-indigo-500 to-purple-500',
      bgGradient: 'from-indigo-500/20 to-purple-500/20',
      technologies: ['React Native', 'MERN Stack', 'Video Streaming', 'Live Classes', 'Test Management'],
      features: ['Live Classes', 'Test Series', 'Student Management', 'Interactive Learning'],
      metrics: { users: 'Private', rating: '4.5', downloads: 'Enterprise' },
      link: 'https://github.com/Rahulmalik123',
      category: 'Education'
    },
    {
      title: 'Retina World Congress',
      description: 'Medical conference application for retina specialists and eye care professionals. Features event schedules, speaker profiles, and networking capabilities.',
      image: '👁️',
      gradient: 'from-orange-500 to-red-500',
      bgGradient: 'from-orange-500/20 to-red-500/20',
      technologies: ['React Native', 'Firebase', 'Push Notifications', 'Event Management', 'Networking'],
      features: ['Event Schedule', 'Speaker Profiles', 'Networking', 'Medical Content'],
      metrics: { users: 'Private', rating: '4.4', downloads: 'Conference' },
      link: 'https://play.google.com/store/apps/details?id=com.retinacongressapp&pcampaignid=web_share',
      category: 'Healthcare'
    },
    {
      title: 'CoastalMed - Medical Platform',
      description: 'Coastal medical services platform connecting patients with healthcare providers. Features appointment booking, telemedicine, and medical record management.',
      image: '🏖️',
      gradient: 'from-cyan-500 to-blue-500',
      bgGradient: 'from-cyan-500/20 to-blue-500/20',
      technologies: ['React Native', 'Telemedicine', 'Appointment System', 'Medical Records', 'Payment'],
      features: ['Telemedicine', 'Appointments', 'Medical Records', 'Provider Network'],
      metrics: { users: 'Private', rating: '4.3', downloads: 'Regional' },
      link: 'https://github.com/Rahulmalik123',
      category: 'Healthcare'
    },
    {
      title: 'QuickCar Taxi',
      description: 'On-demand taxi booking application with real-time tracking, fare calculation, and driver management system. Seamless ride booking experience.',
      image: '🚗',
      gradient: 'from-yellow-500 to-orange-500',
      bgGradient: 'from-yellow-500/20 to-orange-500/20',
      technologies: ['React Native', 'Google Maps', 'Real-time Tracking', 'Payment Gateway', 'GPS'],
      features: ['Real-time Tracking', 'Fare Calculator', 'Driver Management', 'Trip History'],
      metrics: { users: 'Private', rating: '4.2', downloads: 'Regional' },
      link: 'https://github.com/Rahulmalik123',
      category: 'Transportation'
    },
    {
      title: 'Errands Shop',
      description: 'Local errands and shopping assistance application. Users can request help with grocery shopping, delivery services, and personal task management.',
      image: '🛒',
      gradient: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      technologies: ['React Native', 'Location Services', 'Task Management', 'Payment System', 'Notifications'],
      features: ['Task Requests', 'Local Services', 'Payment Integration', 'Service Tracking'],
      metrics: { users: 'Private', rating: '4.1', downloads: 'Local' },
      link: 'https://github.com/Rahulmalik123',
      category: 'Services'
    },
    {
      title: 'Visto - Visa Assistance Platform',
      description: 'Private visa assistance platform that simplifies visa application process. Features structured questionnaires, document management, and profile tools for efficient visa preparation across multiple categories.',
      image: '🛂',
      gradient: 'from-blue-600 to-indigo-600',
      bgGradient: 'from-blue-600/20 to-indigo-600/20',
      technologies: ['React Native', 'Redux-Persist', 'Document Management', 'Biometric Auth', 'Secure Storage', 'Push Notifications'],
      features: ['Multiple Visa Types', 'Document Upload', 'Application Review', 'Biometric Login'],
      metrics: { users: 'Live', rating: '4.4', downloads: 'Play Store' },
      link: 'https://play.google.com/store/apps/details?id=com.focalpoint.visto',
      category: 'Services'
    }
  ]

  const categories = ['All', 'Healthcare', 'Mental Health', 'Services', 'Education', 'Transportation']
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
        <div 
          className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent)] animate-pulse"></div>
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                Rahul.dev
              </motion.div>
            </Link>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24">
        {/* Header */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                  All Projects
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Complete portfolio of mobile applications and web platforms built with cutting-edge technologies
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center space-x-12 mt-12"
            >
              {[
                { icon: Users, value: '11+', label: 'Total Projects' },
                { icon: Star, value: '5', label: 'Live Apps' },
                { icon: Calendar, value: '6', label: 'Categories' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-white/10 backdrop-blur-xl">
                    <stat.icon className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.bgGradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100`}></div>
                  
                  <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 min-h-[600px] flex flex-col">
                    {/* Project Header */}
                    <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                      <div className="text-6xl opacity-20 absolute">{project.image}</div>
                      <div className="text-4xl z-10">{project.image}</div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/20 backdrop-blur-xl text-white text-xs font-semibold rounded-full border border-white/20">
                          {project.category}
                        </span>
                      </div>

                      {/* Floating Animation Elements */}
                      <motion.div
                        animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-4 left-4 w-3 h-3 bg-white/20 rounded-full"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">{project.description}</p>

                      {/* Metrics */}
                      <div className="flex justify-between items-center mb-4 p-3 bg-black/20 rounded-xl">
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{project.metrics.users}</div>
                          <div className="text-xs text-gray-400">Status</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{project.metrics.rating}</div>
                          <div className="text-xs text-gray-400">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{project.metrics.downloads}</div>
                          <div className="text-xs text-gray-400">Platform</div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-2 py-1 bg-gradient-to-r ${project.gradient} text-white text-xs font-medium rounded-full`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded-full">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 mt-auto">
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 py-2 px-4 bg-gradient-to-r ${project.gradient} rounded-full text-white font-semibold text-sm flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </motion.a>
                        <motion.a
                          href="https://github.com/Rahulmalik123"
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="py-2 px-4 border border-white/20 rounded-full text-gray-300 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center text-sm"
                        >
                          <Github className="w-3 h-3 mr-1" />
                          Code
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Let's Build Your Next Project
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Ready to bring your mobile app idea to life? Let's discuss your project.
              </p>
              <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                <motion.a
                  href="mailto:arahulmalik25@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start a Project
                </motion.a>
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-purple-400/50 rounded-full font-semibold text-lg backdrop-blur-xl bg-white/5 hover:bg-purple-400/10 transition-all"
                  >
                    Back to Portfolio
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Projects