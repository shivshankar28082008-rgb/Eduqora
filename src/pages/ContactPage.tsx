import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle, Sparkles, MapPin, Phone } from 'lucide-react';
import { useToast } from '../components/Toast';
import { storageService } from '../services/storageService';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast('Please fill out all fields', undefined, 'error');
      return;
    }

    storageService.addActivity({
      type: 'streak_maintained',
      title: `Sent ${topic} message`,
      detail: `Your message: "${message.slice(0, 45)}..." was recorded.`,
      xpGained: 10,
    });

    setSubmitted(true);
    toast('Thank you! Your message has been sent successfully.', undefined, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5" /> Support & Community
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Get in Touch with Eduqora
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
          Have a question about a coding track, need help with Code Lab, or want to suggest new lessons? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Info Column */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              Direct Channels
            </h3>
            
            <div className="flex items-start gap-3 text-xs">
              <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Email Support</p>
                <p className="text-slate-500">support@eduqora.dev</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <MessageSquare className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Community Discussion</p>
                <p className="text-slate-500">Student Discord & GitHub discussions</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs">
              <HelpCircle className="w-4 h-4 text-slate-400 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-700 dark:text-slate-300">Office Hours</p>
                <p className="text-slate-500">Monday - Friday, 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/60 text-xs">
            <h4 className="font-bold text-indigo-900 dark:text-indigo-200 mb-1">Quick Tip</h4>
            <p className="text-indigo-800/80 dark:text-indigo-300/80 leading-relaxed">
              If you run into an issue inside the Code Lab sandbox, you can export your project via the Download button in the editor toolbar.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Message Received!
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you for your feedback! Our team reviews every suggestion to make Eduqora even better.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Topic
                </label>
                <select
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition"
                >
                  <option value="Feedback">General Feedback & Suggestion</option>
                  <option value="Curriculum">New Lesson / Language Request</option>
                  <option value="Bug">Report a Bug in Code Lab</option>
                  <option value="Partnership">Educational Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us what you think or what feature you'd like to see..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Message (+10 XP)
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
