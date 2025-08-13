import { motion } from 'framer-motion'
import { ChevronDown, Code, Smartphone, Globe, Github, Linkedin, Mail, ExternalLink, Download, Play, Star, Users, Calendar, MapPin, Award, Zap, Target, Layers, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSection, setCurrentSection] = useState('hero')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')
    
    try {
      // EmailJS configuration - these should be set in Vercel environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      
      // Debug: Log environment variables (remove in production)
      console.log('EmailJS Environment Variables:', {
        serviceId: serviceId ? 'Present' : 'Missing',
        templateId: templateId ? 'Present' : 'Missing', 
        publicKey: publicKey ? 'Present' : 'Missing'
      })
      
      // Check if all required environment variables are present
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(`EmailJS configuration missing. Service: ${serviceId ? '✓' : '✗'}, Template: ${templateId ? '✓' : '✗'}, Public Key: ${publicKey ? '✓' : '✗'}`)
      }
      
      // Send email using EmailJS service
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject || 'Portfolio Contact',
            message: formData.message,
            to_email: 'arahulmalik25@gmail.com'
          }
        })
      })
      
      if (response.ok) {
        // Reset form after successful submission
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSubmitStatus('success')
      } else {
        const errorText = await response.text()
        console.error('EmailJS API Error:', errorText)
        throw new Error(`Failed to send email: ${response.status}`)
      }
      
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000)
      
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(''), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Rahul.dev
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
                <motion.button
                  key={item}
                  whileHover={{ scale: 1.1, color: '#a855f7' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-purple-400 transition-colors font-medium"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex  items-center justify-center">
        <div className="text-center px-4 max-w-6xl pt-24 mx-auto z-10">
          {/* Floating Elements */}
          <motion.div
            animate={{ 
              y: [-10, 10, -10],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ 
              y: [10, -10, 10],
              rotate: [0, -5, 5, 0]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-40 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"
          />

          {/* Profile Image with Glassmorphism */}
          <motion.div 
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.3 }}
            className="mb-8 relative"
          >
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 p-1">
              <div className="w-full h-full rounded-full bg-black/80 backdrop-blur-xl border border-white/20 flex items-center justify-center text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                R
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400/30"
            />
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                React Native
              </span>
              <br />
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-white"
              >
                Developer
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Crafting extraordinary mobile experiences with cutting-edge technology. 
            Specialized in building high-performance cross-platform applications.
          </motion.p>

          {/* Stats */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="flex justify-center space-x-12 mb-12"
          >
            {[
              { icon: Users, value: '14', label: 'Live Projects' },
              { icon: Star, value: '4+', label: 'Years Exp' },
              { icon: Calendar, value: '2017-2020', label: 'BCA Graduate' }
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

          {/* CTA Buttons */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                View My Work
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.button>
            
            <motion.a
              href="mailto:arahulmalik25@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-purple-400/50 rounded-full font-semibold text-lg backdrop-blur-xl bg-white/5 hover:bg-purple-400/10 transition-all flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </motion.a>
          </motion.div>

        
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                <div className="relative backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold mb-6 text-white"
                  >
                    Passionate Mobile Developer
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-lg text-gray-300 mb-6 leading-relaxed"
                  >
                    Hi! I'm Rahul Malik, a passionate MERN & React Native Developer with expertise in building 
                    scalable cross-platform mobile applications. I specialize in creating high-performance apps 
                    with smooth UIs and native-like experiences across both iOS and Android platforms.
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-lg text-gray-300 mb-8 leading-relaxed"
                  >
                    With 4+ years of professional experience, I've successfully delivered multiple production apps 
                    available on Play Store and App Store. My expertise includes React Native, MERN stack, 
                    performance optimization, API integration, and complete app deployment lifecycle.
                  </motion.p>

                  {/* Achievement Badges */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap gap-3"
                  >
                    {[
                      { icon: Award, label: '4+ Years Experience', color: 'from-purple-500 to-purple-600' },
                      { icon: Target, label: '14 Live Projects', color: 'from-pink-500 to-pink-600' },
                      { icon: Star, label: 'BCA Graduate (2017-2020)', color: 'from-orange-500 to-orange-600' }
                    ].map((badge, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`bg-gradient-to-r ${badge.color} px-4 py-2 rounded-full text-sm font-semibold text-white flex items-center shadow-lg`}
                      >
                        <badge.icon className="w-4 h-4 mr-2" />
                        {badge.label}
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Skills Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold mb-8 text-center">Core Competencies</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  { 
                    icon: Smartphone, 
                    title: 'React Native Expert', 
                    desc: 'Cross-platform mobile development with native performance',
                    skills: ['iOS Development', 'Android Development', 'Native Modules', 'Expo']
                  },
                  { 
                    icon: Code, 
                    title: 'Modern Tech Stack', 
                    desc: 'Cutting-edge technologies for scalable applications',
                    skills: ['TypeScript', 'JavaScript ES6+', 'Redux Toolkit', 'GraphQL']
                  },
                  { 
                    icon: Zap, 
                    title: 'Performance Optimization', 
                    desc: 'Building lightning-fast, efficient mobile applications',
                    skills: ['Code Splitting', 'Memory Management', 'Bundle Optimization', 'Animations']
                  },
                  { 
                    icon: Layers, 
                    title: 'Full-Stack Integration', 
                    desc: 'Seamless backend integration and API development',
                    skills: ['REST APIs', 'Firebase', 'AWS', 'Node.js']
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative group"
                  >
                    <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center border border-white/10">
                          <item.icon className="w-6 h-6 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-white mb-2">{item.title}</h4>
                          <p className="text-gray-300 text-sm mb-3">{item.desc}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-purple-500/10 text-purple-300 text-xs rounded-full border border-purple-500/20"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Technical Arsenal
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Mastering cutting-edge technologies to build exceptional mobile experiences
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: 'Mobile Development',
                gradient: 'from-blue-500 to-cyan-500',
                skills: [
                  { name: 'React Native', level: 95 },
                  { name: 'Expo', level: 90 },
                  { name: 'Native Modules', level: 85 },
                  { name: 'React Navigation', level: 92 }
                ]
              },
              {
                icon: Code,
                title: 'Frontend Technologies',
                gradient: 'from-purple-500 to-pink-500',
                skills: [
                  { name: 'TypeScript', level: 92 },
                  { name: 'JavaScript ES6+', level: 95 },
                  { name: 'React.js', level: 90 },
                  { name: 'Next.js', level: 88 }
                ]
              },
              {
                icon: Globe,
                title: 'Backend & Services',
                gradient: 'from-green-500 to-emerald-500',
                skills: [
                  { name: 'Node.js', level: 85 },
                  { name: 'Firebase', level: 90 },
                  { name: 'GraphQL', level: 80 },
                  { name: 'REST APIs', level: 92 }
                ]
              }
            ].map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                
                <div className="relative backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className={`w-20 h-20 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                    <category.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-center text-white mb-8">{category.title}</h3>
                  
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                        className="relative"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-300 font-medium">{skill.name}</span>
                          <span className="text-purple-400 font-bold">{skill.level}%</span>
                        </div>
                        
                        <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                            className={`h-full bg-gradient-to-r ${category.gradient} rounded-full relative`}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <h3 className="text-3xl font-bold text-center mb-12 text-white">Additional Technologies</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                'Redux Toolkit', 'Zustand', 'React Navigation', 'Express.js', 'MongoDB',
                'Socket.io', 'WebRTC', 'Payment Gateway', 'CS-Cart', 'AWS EC2',
                'Apache', 'PM2', 'Nginx', 'Ubuntu', 'GitHub', 'Android Studio',
                'Xcode', 'Git', 'RESTful APIs', 'GraphQL', 'Performance Optimization'
              ].map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-sm text-gray-300 hover:text-white hover:border-purple-400/40 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Preview Section */}
      <section id="projects" className="relative py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Showcase of mobile applications that have made a real impact
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {[
              {
                title: 'Duocortex - Medical Study App',
                description: 'Ultimate app designed by medicos, for medicos. Features real-time peer matching, verified medical network, competitive quizzes, and study buddy system.',
                image: '🏥',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-500/20 to-cyan-500/20',
                technologies: ['React Native', 'Node.js', 'MongoDB', 'Socket.io', 'Firebase', 'Real-time APIs'],
                features: ['Real-Time Peer Matching', 'Verified Medical Network', 'Competitive Quizzes', 'Study Buddy System'],
                metrics: { users: 'Live', rating: '4.8', downloads: 'Play Store' },
                link: 'https://play.google.com/store/apps/details?id=com.duocortex'
              },
              {
                title: 'Aurom - Mental Health Support',
                description: 'Professional listener app providing 24x7 anonymous support for mental health. Users can talk to verified, trained professional listeners for stress relief and emotional support.',
                image: '🧠',
                gradient: 'from-green-500 to-teal-500',
                bgGradient: 'from-green-500/20 to-teal-500/20',
                technologies: ['React Native', 'MERN Stack', 'Real-time Audio', 'WebRTC', 'Payment Gateway'],
                features: ['Anonymous Support', '24x7 Availability', 'Professional Listeners', 'Privacy Focused'],
                metrics: { users: 'Live', rating: '4.6', downloads: 'Play Store' },
                link: 'https://play.google.com/store/apps/details?id=com.aurom.listener'
              },
              {
                title: 'Pandsecure Health',
                description: 'Pandemic preparedness application designed to empower individuals with tools and information for health assessment and epidemic readiness.',
                image: '🛡️',
                gradient: 'from-purple-500 to-indigo-500',
                bgGradient: 'from-purple-500/20 to-indigo-500/20',
                technologies: ['React Native', 'MERN Stack', 'Health APIs', 'Data Analytics', 'Firebase'],
                features: ['Health Assessment', 'Pandemic Preparedness', 'Resource Access', 'Guidance System'],
                metrics: { users: 'Live', rating: '4.7', downloads: 'App Store' },
                link: 'https://apps.apple.com/in/app/pandsecure-health/id6746241303'
              },
              {
                title: 'Experts4u - Beauty Services',
                description: 'Professional beauty services app providing salon and spa services at home in Gurugram. Complete booking system with CS-Cart integration.',
                image: '💄',
                gradient: 'from-pink-500 to-rose-500',
                bgGradient: 'from-pink-500/20 to-rose-500/20',
                technologies: ['React Native', 'MERN Stack', 'CS-Cart', 'Payment Gateway', 'Booking System'],
                features: ['Home Services', 'Online Booking', 'Payment Integration', 'Service Management'],
                metrics: { users: 'Live', rating: '4.5', downloads: 'Play Store' },
                link: 'https://play.google.com/store/apps/details?id=com.expert4u'
              }
            ].map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${project.bgGradient} rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100`}></div>
                
                <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 min-h-[700px] flex flex-col">
                  {/* Project Header */}
                  <div className={`h-64 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-8xl opacity-20 absolute">{project.image}</div>
                    <div className="text-6xl z-10">{project.image}</div>
                    
                    {/* Floating Animation Elements */}
                    <motion.div
                      animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute top-4 right-4 w-4 h-4 bg-white/20 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-4 left-4 w-6 h-6 bg-white/10 rounded-full"
                    />
                  </div>

                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                    {/* Metrics */}
                    <div className="flex justify-between items-center mb-6 p-4 bg-black/20 rounded-2xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{project.metrics.users}</div>
                        <div className="text-xs text-gray-400">Users</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{project.metrics.rating}</div>
                        <div className="text-xs text-gray-400">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{project.metrics.downloads}</div>
                        <div className="text-xs text-gray-400">Downloads</div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-xs font-medium rounded-full shadow-lg`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-300">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 mt-auto">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 py-3 px-6 bg-gradient-to-r ${project.gradient} rounded-full text-white font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300`}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live App
                      </motion.a>
                      <motion.a
                        href="https://github.com/Rahulmalik123"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="py-3 px-6 border border-white/20 rounded-full text-gray-300 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </motion.a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Projects CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg flex items-center mx-auto shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View All Projects
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Professional Journey
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              My career progression in mobile development and key achievements
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 via-pink-400 to-orange-400 rounded-full"></div>

            <div className="space-y-8 md:space-y-16">
              {[
                {
                  period: 'Sep 2024 - Present',
                  role: 'Senior React Native Developer',
                  company: 'Freelance',
                  location: 'Remote',
                  type: 'Full-time',
                  gradient: 'from-purple-500 to-pink-500',
                  achievements: [
                    'Built multiple production apps including Duocortex (medical study app) and Pandsecure Health',
                    'Optimized app performance by diagnosing and fixing bugs, memory leaks, and performance bottlenecks',
                    'Worked with RESTful APIs and GraphQL to fetch and manage data efficiently',
                    'Collaborated with UI/UX designers, backend developers, and product managers',
                    'Deployed and managed apps on App Store and Google Play Store'
                  ],
                  technologies: ['React Native', 'MERN Stack', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io']
                },
                {
                  period: 'Aug 2023 - Sep 2024',
                  role: 'Senior React Native Developer',
                  company: 'Experts4u',
                  location: 'India',
                  type: 'Full-time',
                  gradient: 'from-blue-500 to-cyan-500',
                  achievements: [
                    'Built pixel-perfect, buttery smooth UIs across both mobile platforms',
                    'Diagnosed and fixed bugs and performance bottlenecks for native-like performance',
                    'Maintained code and wrote automated tests to ensure highest quality',
                    'Successfully launched Experts4u beauty services app on Play Store'
                  ],
                  technologies: ['React Native', 'MERN Stack', 'Redux', 'CS-Cart', 'Payment Gateway', 'Testing']
                },
                {
                  period: 'May 2022 - Aug 2023',
                  role: 'React Native Developer',
                  company: 'Dignitech Media Works Private Limited',
                  location: 'India',
                  type: 'Full-time',
                  gradient: 'from-green-500 to-emerald-500',
                  achievements: [
                    'Worked on numerous projects across various domains as a service-based company developer',
                    'Developed multiple apps including Retina World Congress, CoastalMed, QuickCar Taxi, and Baychr',
                    'Built cross-platform mobile applications with React Native and web applications using MERN stack',
                    'Collaborated with diverse teams on projects spanning healthcare, transportation, and e-commerce domains'
                  ],
                  technologies: ['React Native', 'React.js', 'Node.js', 'MongoDB', 'Express.js', 'Redux']
                }
              ].map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative flex items-center justify-start md:${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-4 h-4 md:w-6 md:h-6 bg-gradient-to-r ${job.gradient} rounded-full border-2 md:border-4 border-black shadow-lg`}></div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full pl-12 md:w-5/12 md:pl-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="relative group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${job.gradient} opacity-10 rounded-3xl blur-xl group-hover:opacity-20 transition-all duration-300`}></div>
                      
                      <div className="relative backdrop-blur-xl bg-white/5 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                          <div className={`px-3 py-1 md:px-4 md:py-2 bg-gradient-to-r ${job.gradient} rounded-full text-white text-xs md:text-sm font-semibold w-fit`}>
                            {job.period}
                          </div>
                          <div className="flex items-center text-gray-400 text-xs md:text-sm">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                            {job.location}
                          </div>
                        </div>

                        <h3 className="text-lg md:text-2xl font-bold text-white mb-2">{job.role}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6 space-y-1 sm:space-y-0">
                          <span className="text-purple-400 font-semibold text-sm md:text-base">{job.company}</span>
                          <span className="hidden sm:inline mx-2 text-gray-500">•</span>
                          <span className="text-gray-400 text-xs md:text-sm">{job.type}</span>
                        </div>

                        {/* Achievements */}
                        <div className="mb-4 md:mb-6">
                          <h4 className="text-base md:text-lg font-semibold text-white mb-2 md:mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {job.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start text-gray-300 text-xs md:text-sm">
                                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-purple-400 rounded-full mr-2 md:mr-3 mt-1.5 md:mt-2 flex-shrink-0"></div>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-gray-400 mb-2 md:mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-1 md:gap-2">
                            {job.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-2 py-1 md:px-3 bg-black/20 text-gray-300 text-xs rounded-full border border-gray-600"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 md:py-32 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Let's Build Something Amazing
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Ready to bring your mobile app vision to life? Let's collaborate and create extraordinary experiences together.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start lg:items-center">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 md:space-y-8"
            >
              <div className="relative">
                <motion.div 
                  className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 8, repeat: Infinity }}
                />
                
                <div className="relative backdrop-blur-xl bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 md:mb-6 text-white">Get In Touch</h3>
                  <p className="text-sm md:text-base lg:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed">
                    I'm always excited to work on new projects and collaborate with amazing people. 
                    Whether you have a mobile app idea, need technical consultation, or want to discuss opportunities, 
                    I'd love to hear from you!
                  </p>

                  {/* Contact Methods */}
                  <div className="space-y-4 md:space-y-6">
                    {[
                      { icon: Phone, label: 'Phone', value: '+91 8168830056', href: 'tel:+918168830056' },
                      { icon: Mail, label: 'Email', value: 'arahulmalik25@gmail.com', href: 'mailto:arahulmalik25@gmail.com' },
                      { icon: Linkedin, label: 'LinkedIn', value: '/in/rahul-malik-14a005238', href: 'https://www.linkedin.com/in/rahul-malik-14a005238/' },
                      { icon: Github, label: 'GitHub', value: '@Rahulmalik123', href: 'https://github.com/Rahulmalik123' }
                    ].map((contact, index) => (
                      <motion.a
                        key={index}
                        href={contact.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, x: 10 }}
                        className="flex items-center p-3 md:p-4 bg-black/20 rounded-xl md:rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg md:rounded-xl flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                          <contact.icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-purple-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs md:text-sm text-gray-400">{contact.label}</div>
                          <div className="text-sm md:text-base text-white font-medium group-hover:text-purple-400 transition-colors truncate">
                            {contact.value}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="backdrop-blur-xl bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white">Send a Message</h3>
                <p className="text-xs md:text-sm text-gray-400 mb-4 md:mb-6">Send me a message and I'll get back to you within 24 hours!</p>
                
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 md:px-4 md:py-3 bg-black/20 border border-white/10 rounded-lg md:rounded-xl text-white text-sm md:text-base placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 md:px-4 md:py-3 bg-black/20 border border-white/10 rounded-lg md:rounded-xl text-white text-sm md:text-base placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors"
                      placeholder="Project Discussion"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  </div>
                  
                  {submitStatus && (
                    <div className={`p-3 md:p-4 rounded-lg md:rounded-xl text-center text-sm md:text-base font-medium ${
                      submitStatus === 'success' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {submitStatus === 'success' 
                        ? '✓ Message sent successfully! I will get back to you soon.' 
                        : '✗ Failed to send message. Please try again or contact directly.'}
                    </div>
                  )}
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className={`w-full py-3 md:py-4 rounded-lg md:rounded-xl text-white text-sm md:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center ${
                      isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-b from-black to-gray-900 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Rahul.dev
              </div>
              <p className="text-gray-400 text-sm mt-2">React Native Developer</p>
            </div>
            
            <div className="flex items-center space-x-6">
              {[
                { icon: Phone, href: 'tel:+918168830056' },
                { icon: Github, href: 'https://github.com/Rahulmalik123' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/rahul-malik-14a005238/' },
                { icon: Mail, href: 'mailto:arahulmalik25@gmail.com' }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 hover:border-purple-400/30 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Rahul. Crafted with ❤️ using React & Framer Motion. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home