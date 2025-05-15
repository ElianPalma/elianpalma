import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ContactSection = () => {
  useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);

  const codeLines = [
    "// Ready to connect?",
    "const contactForm = {",
    "  name: '',",
    "  email: '',",
    "  message: ''",
    "};",
    "function handleSubmit() {",
    "  // Send message logic here",
    "}"
  ];

  useEffect(() => {
    if (submitStatus === 'success') {
      const timer = setTimeout(() => setSubmitStatus(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null); // Reset previous status

    try {
      const response = await fetch('https://hook.eu2.make.com/wucgkxfx2s2edfi4wauy85nb6zs3bo9a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Error al enviar el formulario:', response.status);
        setSubmitStatus('error'); // Puedes añadir un estado de error para mostrar un mensaje al usuario
      }
    } catch (error) {
      console.error('Error de red:', error);
      setSubmitStatus('error'); // También en caso de error de red
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs text-blue-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
          >
            {i % 2 === 0 ? '//' : 'const'}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-blue-400">Contacto</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            ¿Tienes alguna pregunta o proyecto en mente? ¡Escríbeme!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 scroll-animate">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
              {codeLines.map((line, index) => (
                <div
                  key={index}
                  className={`font-mono mb-2 ${index === 0 ? 'text-blue-400' : 'text-gray-400'} ${index === 1 || index === 5 ? 'mt-4' : ''}`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full scroll-animate">
            {submitStatus === 'success' ? (
              <div className="bg-green-900/50 border border-green-400 text-green-100 p-8 rounded-xl text-center">
                <h3 className="text-2xl font-bold mb-2">¡Mensaje enviado!</h3>
                <p>Te responderé pronto. ¡Gracias por contactarme!</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-4 px-6 py-2 bg-green-800 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Enviar otro
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
                <div className="mb-6">
                  <label className="block text-gray-400 mb-2 font-mono">
                    $ Nombre
                  </label>
                  <div className={`relative border-b-2 ${activeField === 'name' ? 'border-blue-500' : 'border-gray-700'} transition-colors`}>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      required
                      className="w-full bg-transparent py-2 px-1 text-white focus:outline-none"
                      placeholder="Introduce tu nombre"
                    />
                    {activeField === 'name' && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 animate-input-focus"></div>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-400 mb-2 font-mono">
                    $ Email
                  </label>
                  <div className={`relative border-b-2 ${activeField === 'email' ? 'border-blue-500' : 'border-gray-700'} transition-colors`}>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      required
                      className="w-full bg-transparent py-2 px-1 text-white focus:outline-none"
                      placeholder="tu@email.com"
                    />
                    {activeField === 'email' && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 animate-input-focus"></div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-gray-400 mb-2 font-mono">
                    $ Mensaje
                  </label>
                  <div className={`relative border-b-2 ${activeField === 'message' ? 'border-blue-500' : 'border-gray-700'} transition-colors`}>
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      required
                      className="w-full bg-transparent py-2 px-1 text-white focus:outline-none resize-none"
                      placeholder="Escriba su mensaje aquí..."
                    ></textarea>
                    {activeField === 'message' && (
                      <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 animate-input-focus"></div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">Enviando</span>
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    </span>
                  ) : (
                    "Enviar"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;