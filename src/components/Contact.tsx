import React, { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Send, Linkedin, Github, Instagram, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import emailjs from '@emailjs/browser';

// Déclaration pour reCAPTCHA
declare global {
  interface Window {
    grecaptcha: any;
  }
}


interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Icône Behance personnalisée
const BehanceIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </svg>
);

export default function Contact() {
  const { t, theme } = useApp();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  // Charger le script reCAPTCHA
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => setRecaptchaLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Nettoyer le script lors du démontage
      const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  // Debug logs pour vérifier les traductions
  console.log('Debug: contact.locationValue =', t('contact.locationValue'));
  console.log('Debug: contact.locationDesc =', t('contact.locationDesc'));
  console.log('Debug: current language =', useApp().language);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    console.log('🔍 validateForm called with formData:', formData);
    const errors: FormErrors = {};

   // Name validation
if (!formData.name.trim()) {
  errors.name = 'Name is required';
  console.log('❌ Name error: empty');
} else if (formData.name.trim().length < 2) {
  errors.name = 'Name must be at least 2 characters';
  console.log('❌ Name error: too short, length:', formData.name.trim().length);
} else {
  console.log('✅ Name is valid:', formData.name.trim());
}

// Email validation
if (!formData.email.trim()) {
  errors.email = 'Email is required';
  console.log('❌ Email error: empty');
} else if (!validateEmail(formData.email)) {
  errors.email = 'Please enter a valid email address';
  console.log('❌ Email error: invalid format:', formData.email);
} else {
  console.log('✅ Email is valid:', formData.email);
}

// Subject validation
if (!formData.subject.trim()) {
  errors.subject = 'Subject is required';
  console.log('❌ Subject error: empty');
} else if (formData.subject.trim().length < 5) {
  errors.subject = 'Subject must be at least 5 characters';
  console.log('❌ Subject error: too short, length:', formData.subject.trim().length);
} else {
  console.log('✅ Subject is valid:', formData.subject.trim());
}

// Message validation
if (!formData.message.trim()) {
  errors.message = 'Message is required';
  console.log('❌ Message error: empty');
} else if (formData.message.trim().length < 10) {
  errors.message = 'Message must be at least 10 characters';
  console.log('❌ Message error: too short, length:', formData.message.trim().length);
} else {
  console.log('✅ Message is valid:', formData.message.trim().length, 'characters');
}


    console.log('📋 Validation errors found:', errors);
    console.log('📊 Errors count:', Object.keys(errors).length);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🚀 handleSubmit called');
    console.log('📝 Current formData:', formData);
    console.log('⚠️ Current formErrors before validation:', formErrors);
    console.log('🔄 Current loading state:', loading);

    if (!validateForm()) {
      console.log('❌ Form validation failed, stopping submission');
      return;
    }

    // Vérifier le token reCAPTCHA
    const token = window.grecaptcha?.getResponse();
    console.log('🔐 reCAPTCHA token:', token ? 'Present' : 'Missing');
    if (!token) {
      setFormErrors({ general: 'Please complete the reCAPTCHA.' });
      console.log('❌ reCAPTCHA validation failed');
      return;
    }

    if (!formRef.current) {
      setFormErrors({ general: 'Formulaire non disponible.' });
      console.log('❌ Form ref not available');
      return;
    }

    console.log('✅ All validations passed, starting email send...');
    setLoading(true);
    setFormErrors({});

    try {
      console.log('📧 Sending email via EmailJS...');
      await emailjs.sendForm(
      'service_sln9hdp',
      'template_3lk9a23',
      formRef.current,
      'yLQ2WOWfSMYwmdGDE'
    );

      console.log('✅ Email sent successfully');
      setSubmissionSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      window.grecaptcha?.reset();
      console.log('🔄 Form reset and reCAPTCHA cleared');
    } catch (error) {
      console.error('❌ EmailJS error:', error);
      setFormErrors({ general: 'An error occurred while sending. Please try again.' });
    } finally {
      console.log('🏁 handleSubmit finished, setting loading to false');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`📝 Field changed: ${name} = "${value}"`);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Effacer l'erreur du champ modifié
    if (formErrors[name as keyof FormErrors]) {
      console.log(`🧹 Clearing error for field: ${name}`);
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof FormErrors];
        console.log('🔄 Updated formErrors:', newErrors);
        return newErrors;
      });
    }
  };

  const hasErrors = Object.keys(formErrors).length > 0;
  const isFormValid = formData.name && formData.email && formData.subject && formData.message && !hasErrors;
  
  // Debug logs pour le bouton de soumission
  console.log('🎯 Button state debug:');
  console.log('  - formData.name:', !!formData.name, `"${formData.name}"`);
  console.log('  - formData.email:', !!formData.email, `"${formData.email}"`);
  console.log('  - formData.subject:', !!formData.subject, `"${formData.subject}"`);
  console.log('  - formData.message:', !!formData.message, `"${formData.message}"`);
  console.log('  - hasErrors:', hasErrors, formErrors);
  console.log('  - isFormValid:', isFormValid);
  console.log('  - loading:', loading);

  return (
    <section id="contact" className="py-24 sm:py-32 lg:py-40 bg-white dark:bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-black dark:bg-white"
            />
            <span className="text-gray-600 dark:text-gray-400 font-medium tracking-wider uppercase text-sm">{t('contact.subtitle')}</span>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-1 bg-black dark:bg-white"
            />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white mb-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="block"
            >
              {t('contact.title1')}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="block font-light italic"
            >
              {t('contact.title2')}
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-balance"
          >
            {t('contact.description')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info with enhanced interactions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">{t('contact.getInTouch')}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-8 text-base sm:text-lg text-balance">
                {t('contact.getInTouchDesc')}
              </p>
            </div>

            <div className="space-y-6">
              {[
                { 
                  icon: Mail, 
                  label: t('contact.email'), 
                  value: 'hello@theoblondel.ch', 
                  href: 'mailto:hello@theoblondel.ch',
                  description: t('contact.emailDesc')
                },
                { 
                  icon: MapPin, 
                  label: t('contact.location'), 
                  value: t('contact.locationValue'), 
                  href: '#',
                  description: t('contact.locationDesc')
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02, transition: { duration: 0.3 } }}
                  className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg transition-all group cursor-pointer border border-gray-100 dark:border-gray-800"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center group-hover:bg-gray-800 dark:group-hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    <contact.icon className="w-5 h-5 sm:w-8 sm:h-8" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mb-1 uppercase tracking-wider font-medium">
                      {contact.label}
                    </div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                      className="font-bold text-gray-900 dark:text-white text-base sm:text-lg group-hover:text-black dark:group-hover:text-gray-100 transition-colors"
                    >
                      {contact.value}
                    </motion.div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{contact.description}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links with enhanced animations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="pt-8"
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-6 text-lg sm:text-xl">{t('contact.followMe')}</h4>
              <div className="flex gap-3 sm:gap-4">
                {[
                  { 
                    icon: Linkedin, 
                    href: 'https://www.linkedin.com/in/theo-blondel-6952432aa/', 
                    label: 'LinkedIn',
                    color: 'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'
                  },
                  { 
                    icon: Instagram, 
                    href: 'https://www.instagram.com/theoblondel.ch/', 
                    label: 'Instagram',
                    color: 'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'
                  },
                  { 
                    icon: BehanceIcon, 
                    href: 'https://www.behance.net/JusteTheo', 
                    label: 'Behance',
                    color: 'hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black'
                  }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-2xl flex items-center justify-center hover:text-white transition-all shadow-md hover:shadow-lg ${social.color}`}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">{t('contact.sendMessage')}</h3>
            
            {/* Success Message */}
            <AnimatePresence>
              {submissionSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 dark:text-green-200 font-medium">Votre client email s'est ouvert !</p>
                    <p className="text-green-600 dark:text-green-400 text-sm">Envoyez le message depuis votre client email pour me contacter.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>


<form
  ref={formRef}
  onSubmit={handleSubmit}
  className="space-y-6"
  id="contact-form"
>
  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
    {/* Nom */}
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
        {t('contact.name')} *
      </label>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
          formErrors.name 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white'
        }`}
        placeholder={t('contact.namePlaceholder')}
      />
      <AnimatePresence>
        {formErrors.name && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle size={14} />
            {formErrors.name}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>

    {/* Email */}
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
        Email *
      </label>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
          formErrors.email 
            ? 'border-red-500 focus:border-red-500' 
            : 'border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white'
        }`}
        placeholder={t('contact.emailPlaceholder')}
      />
      <AnimatePresence>
        {formErrors.email && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle size={14} />
            {formErrors.email}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  </div>

  {/* Sujet */}
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
      {t('contact.subject')} *
    </label>
    <motion.input
      whileFocus={{ scale: 1.02 }}
      type="text"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
        formErrors.subject 
          ? 'border-red-500 focus:border-red-500' 
          : 'border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white'
      }`}
      placeholder={t('contact.subjectPlaceholder')}
    />
    <AnimatePresence>
      {formErrors.subject && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle size={14} />
          {formErrors.subject}
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>

  {/* Message */}
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
      {t('contact.message')} *
    </label>
    <motion.textarea
      whileFocus={{ scale: 1.02 }}
      name="message"
      value={formData.message}
      onChange={handleChange}
      rows={6}
      className={`w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-xl focus:outline-none transition-all resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
        formErrors.message 
          ? 'border-red-500 focus:border-red-500' 
          : 'border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white'
      }`}
      placeholder={t('contact.messagePlaceholder')}
    />
    <AnimatePresence>
              {formErrors.message && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-2 flex items-center gap-2 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle size={14} />
                  {formErrors.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* reCAPTCHA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="flex justify-start mb-6"
          >
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Vérification de sécurité *
              </label>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 inline-block shadow-sm">
                {recaptchaLoaded ? (
                  <div
                    className="g-recaptcha"
                    data-sitekey="6Lfdh4krAAAAAMRPPaco3f5H2JZ7PzNToawtodX2"
                    data-theme={theme === 'dark' ? 'dark' : 'light'}
                  />
                ) : (
                  <div className="flex items-center justify-center w-[304px] h-[78px] bg-gray-100 dark:bg-gray-700 rounded border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-gray-400 border-t-gray-600 dark:border-gray-500 dark:border-t-gray-300 rounded-full"
                    />
                    <span className="ml-3 text-gray-500 dark:text-gray-400 text-sm">Chargement du reCAPTCHA...</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: isFormValid && !loading ? 1.02 : 1, y: isFormValid && !loading ? -2 : 0 }}
            whileTap={{ scale: isFormValid && !loading ? 0.98 : 1 }}
            disabled={!isFormValid || loading}
            className={`w-full py-3 sm:py-4 rounded-xl font-medium flex items-center justify-center gap-3 transition-all ${
              isFormValid && !loading
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 shadow-lg hover:shadow-xl'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Envoi...' : t('contact.sendBtn')}
            <motion.div whileHover={{ x: 5, rotate: 15 }} transition={{ duration: 0.2 }}>
              <Send className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </form>



            {/* Form validation summary */}
            <AnimatePresence>
              {hasErrors && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                >
                  <div className="flex items-center gap-2 text-red-800 dark:text-red-200 text-sm">
                    <AlertCircle size={16} />
                    <span className="font-medium">Veuillez corriger les erreurs ci-dessus</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}